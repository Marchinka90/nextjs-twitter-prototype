import { sql } from "@/db";
import { NextResponse } from "next/server";
import { getJWTPayload } from "@/app/util/auth";

export async function GET(request: Request) {
  // get currnetly logged in user
  const jwtPayload = await getJWTPayload();

  // fetch user data
  const res = await sql(
    'SELECT id, username, avatar FROM public.users WHERE id=$1',
    [jwtPayload.sub]
  );

  const user = res.rows[0];

  // return user data
  return NextResponse.json({ data: user });
}