import { ConsoleLogger } from '@nestjs/common';
import { randomUUID, createHash } from 'crypto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const node_openssl = require('node-openssl-cert');

export function hash(privateKey: string, message: string): string {
  const openssl = new node_openssl();

  const digest = createHash('sha256').update(message).digest('hex');
  // this.encryptRSAPrivateKey = function(key, cipher, password, callback)
  // cipher: "sha-256"
  //   const digest = openssl.encryptRSAPrivateKey(
  //     privateKey,
  //     'sha-256',
  //     message,
  //     (data) => {
  //       console.log('callback from the ecryption. data:', data);
  //     },
  //   );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTimeout(() => {}, 100);

  return digest;
}
