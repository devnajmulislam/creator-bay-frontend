"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRightIcon,
  BuildingIcon,
  DollarSignIcon,
  ImageIcon,
  MapPinIcon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Container, Section } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useSession, getAuthToken } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";

const PRESET_CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Creative Space",
  "Event Venue",
];

export default function AddStudioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Photo Studio");
  const [customCategory, setCustomCategory] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    pricePerHour: "",
    securityDeposit: "",
    capacity: "",
    image: "",
    reviewCount: "0",
    description: "",
  });



const {data: session, isPending} = useSession()

if(isPending){
  return (
    <div className="flex justify-center items-center h-[85vh]">
      <Spinner className="h-20 w-20"/>
    </div>
  )
}

const user = session?.user;

// console.log(user, "user")

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    if (val === "custom") {
      setIsCustom(true);
      setSelectedCategory("");
    } else {
      setIsCustom(false);
      setSelectedCategory(val);
    }
  }




  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to list a studio");
      router.push("/login?redirect=/add-studio");
      return;
    }

    setLoading(true);
    const finalCategory = isCustom ? customCategory : selectedCategory;

    const newStudioData = {
      ...formData,
      category: finalCategory,
    };

    const token = await getAuthToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({...newStudioData, creatorEmail: user.email}),
      },
    );

    const data = await result.json();
    // console.log(data)
    if (data.acknowledged) {
      setTimeout(() => {
        setLoading(false);
        toast.success(
          `Studio "${formData.name || "New Studio"}" listed successfully!`,
        );
        router.push("/my-listings")
        router.refresh();
      }, 700);
    }
  }

  return (
    <Section>
      <Container className="max-w-2xl">
        <div className="rounded-3xl border border-border/80 bg-card p-8 sm:p-12 shadow-sm">
          <div className="text-center">
            <p className="eyebrow text-primary">Host with CreatorBay</p>
            <h1 className="font-heading text-3xl sm:text-4xl mt-2">
              List your creative space
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Share your studio with independent creators, photographers, and
              filmmakers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Studio title</Label>
              <div className="relative">
                <BuildingIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="e.g. Lumen North Loft"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <div className="flex flex-col gap-2">
                  <NativeSelect
                    id="category"
                    className="w-full h-10"
                    value={isCustom ? "custom" : selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    {PRESET_CATEGORIES.map((cat) => (
                      <NativeSelectOption key={cat} value={cat}>
                        {cat}
                      </NativeSelectOption>
                    ))}
                    <NativeSelectOption value="custom">
                      Other / Custom category...
                    </NativeSelectOption>
                  </NativeSelect>
                  {isCustom && (
                    <Input
                      placeholder="Enter custom category"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      required
                    />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location / Address</Label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g. Brooklyn, NY"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Hourly rate ($)</Label>
                <div className="relative">
                  <DollarSignIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    placeholder="120"
                    value={formData.pricePerHour}
                    onChange={(e) =>
                      setFormData({ ...formData, pricePerHour: e.target.value })
                    }
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deposit">
                  Security deposit ($){" "}
                  <span className="text-xs text-muted-foreground">(Opt.)</span>
                </Label>
                <div className="relative">
                  <DollarSignIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="deposit"
                    type="number"
                    min="0"
                    placeholder="250"
                    value={formData.securityDeposit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        securityDeposit: e.target.value,
                      })
                    }
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Max capacity</Label>
                <div className="relative">
                  <UsersIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    placeholder="25"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: e.target.value })
                    }
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reviews">Initial Review Count</Label>
                <div className="relative">
                  <MessageSquareIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="reviews"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.reviewCount}
                    onChange={(e) =>
                      setFormData({ ...formData, reviewCount: e.target.value })
                    }
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your studio's lighting, acoustics, backdrop options, and amenities..."
                rows={5}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Publishing listing..." : "Publish studio listing"}
              <ArrowRightIcon className="ml-2 size-4" />
            </Button>
          </form>
        </div>
      </Container>
    </Section>
  );
}
