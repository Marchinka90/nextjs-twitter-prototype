import { sql } from "@/db";
import { NextResponse } from "next/server";
import { getJWTPayload } from "@/app/util/auth";

export async function GET(request: Request) {
  const jwtPayload = await getJWTPayload();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');

  const res = await sql(
    'SELECT * FROM public.follows WHERE user_id =$1 AND follower_id = $2',
    [userId, jwtPayload.sub]
  );

  return NextResponse.json({ data: res.rows });
}

export async function POST(request: Request) {
  const jwtPayload = await getJWTPayload();
  const json = await request.json()

  const res = await sql(
    'SELECT * FROM public.follows WHERE user_id =$1 AND follower_id = $2',
    [json.user_id, jwtPayload.sub]
  );

  if (res.rowCount! > 0) {
    return NextResponse.json({ error: 'User Already Following' }, { status: 409 });
  }

  await sql(
    'INSERT INTO public.follows (user_id, follower_id) values ($1, $2)',
    [json.user_id, jwtPayload.sub]
  );

  return NextResponse.json({ msg: 'Follow Success' }, { status: 200 });
}