const MAX_IMAGE_SIZE = 8 * 1024 * 1024

export async function uploadImageToImgbb(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY

  if (!apiKey) {
    throw new Error(
      "Image upload is not configured. Add NEXT_PUBLIC_IMGBB_API_KEY to your environment.",
    )
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.")
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image must be smaller than 8 MB.")
  }

  const body = new FormData()
  body.append("image", file)

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      body,
    },
  )

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.error?.message || "Image upload failed.")
  }

  const url = data?.data?.display_url || data?.data?.url

  if (typeof url !== "string" || !url) {
    throw new Error("Image upload did not return a valid URL.")
  }

  return url
}
