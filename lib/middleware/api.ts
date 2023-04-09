import { NextRequest, NextResponse } from "next/server";

export default async function ApiMiddleware(req: NextRequest) {
  return NextResponse.next();
}
