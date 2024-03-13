import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ msg: 'Username Filter is required' }, { status: 400 });
  }

  const statement = `SELECT id, username, avatar FROM public.users where username like $1`;

  const res = await sql(statement, [username]);

  return NextResponse.json({ data: res.rows });
}