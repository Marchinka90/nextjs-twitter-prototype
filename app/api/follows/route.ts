import { sql } from "@/db";
import { NextResponse } from "next/server";
import { getJWTPayload } from "@/app/util/auth";

export default async function GET(request: Request) {
  const jwtPayload = await getJWTPayload();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');

  const res = await sql(
    'SELECT * FROM public.follows WHERE user_i d =$1 AND follower_id = $2',
    [userId, jwtPayload.sub]
  );

  return NextResponse.json({ data: res.rows });
}