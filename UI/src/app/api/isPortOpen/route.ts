import { NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const port = searchParams.get('port');

    if (!port) {
      return NextResponse.json(
        { error: 'Port parameter is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${baseURL}/api/IP/IsPortOpen?port=${port}`);
    const data = await response.text();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Error fetching port status: ${error}` },
      { status: 500 }
    );
  }
}
