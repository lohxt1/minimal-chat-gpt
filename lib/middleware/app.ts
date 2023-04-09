import { NextRequest, NextResponse } from "next/server";

export default async function AppMiddleware(req: NextRequest) {
  return NextResponse.next();
}
