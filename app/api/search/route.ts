import { sql } from "@/db";
import { getJWTPayload } from "@/app/util/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('q');

  if (!search) {
    return NextResponse.json({ error: 'Search Params Required' }, { status: 400 });
  }

  const res = await sql(`select if, username, avatar from public.users where username ilike $1 limit 10`,
    [`%${search}%`]);

  return NextResponse.json({ data: res.rows });
}