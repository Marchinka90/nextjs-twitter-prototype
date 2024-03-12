import { sql } from "@/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { SignJWT } from "jose";

export async function POST(request: Request) {
  const json = await request.json();

  const res = await sql(
    'SELECT * FROM public.users WHERE username ILIKE $1',
    [json.username]
  );

  if (res.rowCount == 0) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const user = res.rows[0];
  const match = await bcrypt.compare(json.password, user.password);

  if (!match) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setExpirationTime('2w')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  const response = NextResponse.json({ msg: 'Login Success' });
  response.cookies.set('jwt-token', token, {
    sameSite: 'strict',
    httpOnly: true,
    secure: true
  });

  return response;
}