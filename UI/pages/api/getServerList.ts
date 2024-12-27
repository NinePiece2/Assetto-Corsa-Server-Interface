import { NextApiRequest, NextApiResponse } from "next";

const baseURL = process.env.BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(`${baseURL}/api/Server/GetServerList`);
  const data = await response.json();
  res.status(200).json(data);
}