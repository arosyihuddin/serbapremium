// pages/api/logout.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from 'cookies-next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  deleteCookie('serbapremiumId', { req, res });
  res.status(200).json({ message: 'Logout successful' });
}
