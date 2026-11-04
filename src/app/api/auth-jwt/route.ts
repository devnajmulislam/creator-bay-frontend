import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import { auth } from "@/lib/auth"

const COOKIE_NAME = "creatorbay_jwt"
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60

export async function GET(request: Request) {
  try {
    const result = await auth.api.getToken({ headers: request.headers })
    const token = result?.token

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      )
    }

    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "Unauthorized access" },
      { status: 401 },
    )
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  return NextResponse.json({ ok: true })
}
