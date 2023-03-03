import axios from 'axios';
import { NextApiResponse } from 'next';

export default async function authorization(res: NextApiResponse) {
  try {
    const authToken = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString('base64');

    const { data } = await axios.get(
      `https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          authorization: `Basic ${authToken}`,
        },
      }
    );

    res.setHeader('authorization', `Bearer ${data.access_token}`);
  } catch (error) {
    return res.setHeader('authorization', 'error');
  }
}
