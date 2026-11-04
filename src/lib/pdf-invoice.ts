import type { Booking } from "@/types/booking"

// Helper to convert image URL to base64 DataURL
async function loadImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

export async function generateBookingInvoice(booking: Booking) {
  const { jsPDF } = await import("jspdf")
  const doc = new jsPDF()

  // Theme Constants
  const bgColor: [number, number, number] = [253, 252, 240] // Cream Background (#FDFCF0)
  const textColor: [number, number, number] = [24, 18, 27] // Dark Foreground
  const primaryColor: [number, number, number] = [241, 62, 147] // Brand Pink

  // 1. Set Page Background
  doc.setFillColor(...bgColor)
  doc.rect(0, 0, 210, 297, "F")

  // 2. Render Background Watermark (Subtle)
  doc.setTextColor(245, 243, 230)
  doc.setFontSize(60)
  doc.setFont("helvetica", "bold")
  doc.text("@devnajmulislam", 105, 150, { angle: 45, align: "center" })

  // 3. Header
  doc.setTextColor(...textColor)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(48)
  doc.text("Invoice", 20, 40)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text(booking.date, 190, 35, { align: "right" })
  doc.text(`Invoice No. ${booking.id.slice(-5).toUpperCase()}`, 190, 42, { align: "right" })

  doc.setDrawColor(...primaryColor)
  doc.setLineWidth(0.5)
  doc.line(20, 50, 190, 50)

  // 4. Billed To
  doc.setFont("helvetica", "bold")
  doc.setFontSize(10)
  doc.text("Billed to:", 20, 65)
  doc.setFont("helvetica", "normal")
  doc.text(booking.userEmail || "Customer", 20, 72)
  doc.text(booking.location || "Online Booking", 20, 78)

  // 5. Table Header
  const tableY = 110
  doc.setFont("helvetica", "bold")
  doc.text("Description", 20, tableY)
  doc.text("Rate", 120, tableY, { align: "right" })
  doc.text("Hours", 150, tableY, { align: "right" })
  doc.text("Amount", 190, tableY, { align: "right" })
  
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.1)
  doc.line(20, tableY + 5, 190, tableY + 5)

  // 6. Table Row
  const rowY = tableY + 15
  doc.setFont("helvetica", "normal")
  doc.text(booking.studioName, 20, rowY)
  
  // Calculate approximate rate (Total - 50 deposit) / duration
  const deposit = 50 
  const rate = (booking.total - deposit) / booking.duration
  
  doc.text(`$${rate.toFixed(2)}/hr`, 120, rowY, { align: "right" })
  doc.text(`${booking.duration}`, 150, rowY, { align: "right" })
  doc.text(`$${(booking.total - deposit).toFixed(2)}`, 190, rowY, { align: "right" })

  doc.line(20, rowY + 5, 190, rowY + 5)

  // 7. Summary
  const summaryY = rowY + 25
  doc.text("Subtotal", 150, summaryY, { align: "right" })
  doc.text(`$${(booking.total - deposit).toFixed(2)}`, 190, summaryY, { align: "right" })
  
  doc.text("Deposit", 150, summaryY + 8, { align: "right" })
  doc.text(`$${deposit.toFixed(2)}`, 190, summaryY + 8, { align: "right" })

  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.text("Total", 150, summaryY + 20, { align: "right" })
  doc.text(`$${booking.total.toFixed(2)}`, 190, summaryY + 20, { align: "right" })

  // 8. Status Badge (Modern Minimalist)
  const statusColors: Record<string, [number, number, number]> = {
    pending: [241, 62, 147], // Brand Pink for Pending
    confirmed: [16, 185, 129], // Emerald
    cancelled: [107, 114, 128], // Gray
  }
  const statusColor = statusColors[booking.status.toLowerCase()] || [0, 0, 0]
  
  doc.setFillColor(...statusColor)
  doc.roundedRect(20, summaryY + 40, 40, 8, 1, 1, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.text(booking.status.toUpperCase(), 40, summaryY + 45.5, { align: "center" })

  // 9. Footer & Signature
  doc.setTextColor(...textColor)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(10)
  doc.text("Payment Information", 20, 250)
  doc.setFont("helvetica", "normal")
  doc.text("Studio Booking Reservation", 20, 258)
  doc.text("CreatorBay Marketplace", 20, 264)

  // Nahid Signature
  const sigX = 140
  const sigY = 240
  doc.setFont("helvetica", "bold")
  doc.text("Nahid", sigX, sigY + 15)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.text("Founder & CEO at CreatorBay", sigX, sigY + 21)

  // Try to load signature image
  const sigDataUrl = await loadImageAsBase64("/images/nahid-signature.png")
  if (sigDataUrl) {
    // Positioning signature slightly above the name
    doc.addImage(sigDataUrl, "PNG", sigX - 5, sigY - 15, 40, 25)
  }

  // Brand Logo at top right
  const logoDataUrl = await loadImageAsBase64("/images/brand-logo.png")
  if (logoDataUrl) {
    doc.addImage(logoDataUrl, "PNG", 170, 10, 20, 20)
  }

  doc.save(`Invoice-${booking.id.slice(-5).toUpperCase()}.pdf`)
}
