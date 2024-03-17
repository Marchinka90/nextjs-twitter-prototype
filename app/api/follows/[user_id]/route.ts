import { sql } from "@/db";
import { NextResponse } from "next/server";
import { getJWTPayload } from "@/app/util/auth";

export async function DELETE(request: Request, {params } : { params: {user_id: number}}) {
  const jwtPayload = await getJWTPayload();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');

  const res = await sql(
    'DELETE FROM public.follows WHERE user_id = $1 AND follower_id = $2',
    [userId, jwtPayload.sub]
  );

  return NextResponse.json({ msg: 'Follow Deleted' }, { status: 200 });
}