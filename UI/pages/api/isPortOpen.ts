import { NextApiRequest, NextApiResponse } from "next";

const baseURL = process.env.BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { port } = req.query;

  if (!port) {
    return res.status(400).json({ error: 'Port parameter is required' });
  }

  try {
    const response = await fetch(`${baseURL}/api/IP/IsPortOpen?port=${port}`);
    const data = await response.text();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching port status' });
  }
}
