import dayjs from 'dayjs';

const BusinessShortCode = process.env.MPESA_BUSINESS_SHORT_CODE;
const PassKey =
  process.env.MPESA_PASS_KEY ||
  'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
const Timestamp = dayjs().format('YYYYMMDDHHmmss');
const Password = Buffer.from(BusinessShortCode + PassKey + Timestamp).toString(
  'base64'
);
const CallBackURL = process.env.APP_URL
  ? `${process.env.APP_URL}/api/callback`
  : 'https://7f8e-105-163-156-12.eu.ngrok.io/api/callback';

const params = {
  BusinessShortCode,
  Password,
  TransactionType: 'CustomerPayBillOnline',
  CallBackURL,
  AccountReference: 'Art 360',
  TransactionDesc: 'Purchase Art',
  Timestamp,
};

export default params;
