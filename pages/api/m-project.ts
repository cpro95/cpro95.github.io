import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Perform a redirection to the desired URL
  res.writeHead(302, { Location: 'http://132.226.227.91:3000' });
  res.end();
}