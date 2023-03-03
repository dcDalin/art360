/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';

export default function callback(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Callback fired: ', req.body);
    res.status(200).json({ name: 'Bambang' });
  }
}
