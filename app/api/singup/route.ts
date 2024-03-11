import { sql } from "@/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { SignJWT } from "jose";

export async function POST(request: Request) {
  const json = await request.json();

  const res = await sql(
    'SELECT id, username, password FROM public.users WHERE username ILIKE $1',
    [json.username]
  );

  if (res.rowCount! > 0) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }
  const saltRounds = 10;
  const hash = await bcrypt.hash(json.password, saltRounds);

  await sql(
    'insert into public.users (username, password) values ($1, $2)',
    [json.username, hash]
  );

  const response = NextResponse.json({ msg: 'Registration Success' }, {status: 200});
  
  return response;
}