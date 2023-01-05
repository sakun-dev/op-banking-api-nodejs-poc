import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { randomUUID, createHash } from 'crypto';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getHello(): Promise<string> {
    const headers = {
      'x-api-key': process.env['x-api-key'],
      'x-session-id': process.env['x-session-id'],
      'x-authorization': process.env['token1'],
    };
    console.log(headers);

    const resp = await this.httpService.axiosRef.get(
      'https://sandbox.apis.op.fi/v1/accounts',
      {
        headers: {
          'x-authorization': process.env['token1'],
          // date
          // accept
          // content-type
          'x-session-id': process.env['x-session-id'],
          // request-id
          'x-api-key': process.env['x-api-key'],
        },
      },
    );
    console.log('resp:', resp);

    return Promise.resolve(JSON.stringify(resp, null, 2));
  }

  async initializePayment(): Promise<string> {
    const apiKey = '6c18c234b1b18b1d97c7043e2e41135c293d0da9'; // process.env['x-api-key'];
    const server = 'https://sandbox.apis.op.fi/paymentbutton';

    const privateKey = 'payment-button.private';

    // example: Wed, 04 Jan 2023 18:07:13 GMT
    const date = new Date().toUTCString();
    console.log('date:', date);

    // The value is taken from publich repo, so no need to hide.
    const merchantId = 'c3efaaee-a6bb-449f-9213-e45e23a462ef';

    const requestId = randomUUID();
    const sessionId = randomUUID();

    const requestBody = {
      amount: '1.00',
      cancel: { url: 'https://shop.example.com/cancel/path' },
      reject: { url: 'https://shop.example.com/reject/path' },
      return: { url: 'https://shop.example.com/return/path' },
      currency: 'EUR',
      accountId: '8a5d4aac-8f8f-47ed-ae2f-36ffeaf57c79',
      reference: 'RF3517834735',
    };

    const url = `${server}/v1/payments`;

    // No trailing newline at the end of the signature base!
    // Only single LF (\n) characters used as newline characters
    const signatureBase = [
      'POST',
      'application/json',
      date,
      merchantId,
      apiKey,
      sessionId,
      requestId,
      url,
      requestBody,
    ].join('\n');

    // DIGEST=$(openssl dgst -sha256 -sign $PRIVATE_KEY -hex signature-base.txt | cut -d' ' -f2)
    const digest = createHash('sha256').update(signatureBase).digest('hex');

    // TODO: is this right?
    const signature = `${merchantId}:1:0:${digest}`;

    const response = await this.httpService.axiosRef.post(url, requestBody, {
      headers: {
        Authorization: signature,
        Date: date,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-session-id': sessionId,
        'x-request-id': requestId,
        'x-api-key': apiKey,
      },
    });

    console.log('response:', response);

    return JSON.stringify(response.data, null, 2);
  }
}
