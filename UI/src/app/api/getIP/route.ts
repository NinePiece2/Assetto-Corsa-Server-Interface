import { NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;

export async function GET() {
  try {
    const response = await fetch(`${baseURL}/api/IP/GetPublicIP`);
    const data = await response.text();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Error fetching public IP: ${error}` },
      { status: 500 }
    );
  }
}
