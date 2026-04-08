import { NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;

export async function GET() {
  try {
    const response = await fetch(`${baseURL}/api/Server/GetServerList`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Error fetching server list: ${error}` },
      { status: 500 }
    );
  }
}
