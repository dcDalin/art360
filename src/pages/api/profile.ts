/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const user = await fetch(
        `https://hqgvidhnlbykeqlgeglh.hasura.eu-central-1.nhost.run/api/rest/create-user-profile/${req.body.event.data.new.id}`,
        { method: 'POST' }
      );

      const data = await user.json();

      console.log('User is : ', data);
      res.status(200).json({ name: 'Bambang' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'something went wrong' });
  }
}
