import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { cookies } from "next/headers"

import { auth } from "@/lib/auth"

const COOKIE_NAME = "creatorbay_jwt"
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60
const SERVER_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000"

async function getJwt(request: NextRequest): Promise<string | null> {
  const cookieStore = await cookies()

  try {
    const result = await auth.api.getToken({ headers: request.headers })
    const token = result?.token

    if (token) {
      cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: COOKIE_MAX_AGE,
      })

      return token
    }
  } catch {
    // Fall back to the current cookie below.
  }

  return cookieStore.get(COOKIE_NAME)?.value ?? null
}

async function handleProxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const token = await getJwt(request)

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized access" },
      { status: 401 },
    )
  }

  const { path } = await context.params
  const target = new URL(`${SERVER_BASE_URL}/${path.join("/")}`)
  target.search = request.nextUrl.search

  const hasBody = !["GET", "HEAD"].includes(request.method)
  const body = hasBody ? await request.text() : undefined

  try {
    const response = await fetch(target, {
      method: request.method,
      headers: {
        "Content-Type":
          request.headers.get("content-type") || "application/json",
        Authorization: `Bearer ${token}`,
        Cookie: `${COOKIE_NAME}=${token}`,
      },
      body,
      cache: "no-store",
    })

    const responseBody = await response.text()

    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Could not reach the API server" },
      { status: 502 },
    )
  }
}

export {
  handleProxy as GET,
  handleProxy as POST,
  handleProxy as PATCH,
  handleProxy as PUT,
  handleProxy as DELETE,
}
