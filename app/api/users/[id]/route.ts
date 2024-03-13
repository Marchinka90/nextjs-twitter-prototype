import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const page = (searchParams.get('page') && parseInt(searchParams.get('page')!)) || 0;
  const limit = 3;
  const offset = page * 3;
  const id = params.id;

  const res = await sql(
    `SELECT u.id, u.username, u.avatar FROM public.users u
    inner join follows f on u.id = f.user_id
    where follower_id = $1 limit $2 offset $3`,
    [id, limit, offset]
  );

  return NextResponse.json({ data: res.rows });
}