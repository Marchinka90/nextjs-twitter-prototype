import { sql } from "@/db";
import { getJWTPayload } from "@/app/util/auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const jwtPayload = await getJWTPayload();
  const res = await sql(`select from posts where id = $1 and user_id = $2`,
    [params.id, jwtPayload.sub]);

  if (res.rowCount == 0) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  return NextResponse.json({ data: res.rows[0] });
}