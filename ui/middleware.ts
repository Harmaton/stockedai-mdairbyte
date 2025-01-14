import { parse } from "cookie"; 
import { NextRequest, NextResponse } from "next/server";
import { parseJwt } from "./lib/Constants";

export function middleware(req: NextRequest) {
  const cookies = parse(req.headers.get("Cookie") || "");
  const token = cookies.token;
  const tokenFromOauth = req.cookies.get("token");
  
  let tokenData;
  
  if (token) {
    tokenData = parseJwt(token.toString());
  }
  
  if (tokenFromOauth) {
    tokenData = parseJwt(tokenFromOauth.value.toString());
  }
  
  if (
    !token &&
    !tokenFromOauth &&
    req.nextUrl.pathname.startsWith("/dash")
  ) {
    console.log("cant enter recruiter ");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  if (req.nextUrl.pathname.startsWith("/oauth")) {
    const oAuthToken = req.nextUrl.searchParams.get("token") || "";
    
    if (oAuthToken.length > 0) {
      const response = NextResponse.next();
      response.cookies.set({
        name: "token",
        value: oAuthToken.toString(),
        maxAge: 60 * 60 * 24 * 7,
      });
      return NextResponse.redirect(new URL("/dash", req.url));
    }
  }
  
  return NextResponse.next();
}