// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import authorization from '@/utils/mpesa/authorization';
import params from '@/utils/mpesa/params';

export default async function stkPush(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // set auth bearer token
    await authorization(res);

    const {
      BusinessShortCode,
      Password,
      Timestamp,
      TransactionType,
      CallBackURL,
      AccountReference,
      TransactionDesc,
    } = params;

    // calculate the total from cart
    // send stk push
    // if stk successful - userid

    const { data } = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode,
        Password,
        Timestamp,
        TransactionType,
        Amount: 1,
        PartyA: 254707981956,
        PartyB: BusinessShortCode,
        PhoneNumber: 254707981956,
        CallBackURL,
        AccountReference,
        TransactionDesc,
      },
      {
        headers: {
          authorization: res.getHeader('authorization'),
        },
      }
    );
    res.status(200).json({ name: 'Bambang', data });
  } catch (error) {
    return res.status(400).json({ status: 'ERROR', error });
  }
}
