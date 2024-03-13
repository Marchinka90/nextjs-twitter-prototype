import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = NextResponse.json({ msg: 'Logout Success' });
  response.cookies.set('jwt-token', '');
  return response;
}