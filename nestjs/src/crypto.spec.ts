import { hash } from './crypto';

describe('crypto', () => {
  it('hash', () => {
    const expectedSignature =
      '419f466e5de4abc34ba75d334fc09e6da6d3203a5c44a986de9554d0baf802b5234a3a336e32028e0fc39856943ebb83d567e718f068fd97f9353d01f715e7354390d2b6bdf3203e8e37478636ec3d91a4a0087dd85487c79f8f3060acb26765db0463f413055306bf1950e907ace51b538a1293f9fe199e5e40149b722db634fac4cc9f02a26580b7176cddd69202fb36b70a236c9984a588cc9b05c983ce028770d4b7c225bdfe8d04bab6ba966dc9dcc40daac2dc75559b4fda2549568002bd27708d5a1941dda2e0c910f88dd6b14582c6012529d4c243317ca3324cbe920807c2d488acf5a2667239bdaf3cc2316bb2eea2a5fd11a6b65b5581b035ccd4';
    const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCq4FH4inYm9rsb
PIIFb/tH1E/eYX3sXG2JEYFvvjSZIoYUCq8lzzKyfP+GrFjzzqNjpg5naQtyvUi6
7yCIFRP8rhpEi0zpBoSip989VeWxp6PJ3y+V6xYVI8a7dft/5jKnj6B/rtPkZL28
Sb1dIhq3DqAiddWCoqT6gcm+B/w2AUZ97v4XMYBh3P46+UHkNIVZxd2zh8HwIpkf
vySRFxSGj+tnFT8y6Z9GBNz/RaCmqAxfYt6JTPOmvX2Ep4l+LH8h8947epaI5ZdH
ktZO4br87KxU9Rnw56mAwfkPaWAINDnmogQdXndduSjCH696Ex7JgFfts8pSAkEM
WDQOWlC9AgMBAAECggEAToZZhRL0KwG1iFWtFpyYaDDsJzC8MnNjLtsplVVeTIUu
AmXKiWCHVrjUoGnxUtFCCpgUBHekeCz+EFG1rHOrRLIphhhR1sBVEX59u20O6i40
uZ9j+cwX0M0pFZqpYeRCoPgC9Mo9u7aD7tQgPn1es4L4Gf32iVr+39PnBvoacCIz
nxAUdY4MW/PgdDZRwtO/AR+KEA9bUBro0TOCvTMpeR9EJ9spD0/SfuCDfI+WdofY
2hW7TZbboRt1dszoHcdQelZkFdOM/oAE2MYMzlBAbygJJUkjyAoI9Bez1997DhJk
01sDbNZTpGJP59aP379R1uoW3rTHmUANxmRcpyZrrQKBgQDWJE8hkvISNCXROgMZ
ea5IGGuseK5o2HDuVAwmGbSf5NfzH5AmET7laYZNx2oniSv1LHm24rucNttc/6RA
5qz/nvEbG07AW2DFal7EXYbBZLcQPe9chVUExeWbBs88rhKH4CQ1t6c6y1CzYhSV
wRRXKddw4qXdPvD1GHp5Jsl0MwKBgQDMRv6d8ymPZbRIQ1mThGUFoZY15DHQk2DW
76tPczY7Xz/Z9UuCmQcH+Nenv8QfdnZF81DhGtt8nfzQECqJwcHdhthx2Fbbin5k
BJpFd8KAN4zCcKVbFH+ewNKGT6Kn6GDcc6+nNnch9dXG4dQkB93lZdeWXHawL/rJ
udwW1GW3TwKBgGqjUjSp9JpUFbEHbpu1GLEWWChfQJs9jZ9hg1tF2cj2MQQFZ8dN
N0EPN65r69UcXiONrl8AseSs/LhnJeib9vKkt/SDuMfZuWsV+XNYD88m1HLmJNiy
HRBvbFOzJGhXVysK131Yo5KHxPxPj2iz6ekuEPdKJsbynROwyOykABY5AoGAaxY8
nCjA/L9gRxGnf8HEA7O1vwKlaqYX+hUiRUAsietg2a3Rq+D04qT8yJ+q/KNpVTo8
iAVAUo+v3JLc+eJs8uihxuyWe/iaUWxoQ0qI2BZG4BeVV63jSSHkOyy8JDGZtXef
+ZR/13m8W8o/H7RQCtXcsqI+Rhag7edVDVLDD9kCgYEAzjrCOi45+wmaWib/yGKU
kCLNmC2NYfyxgHXHsTKfC06CWpuchQBJnW06NxXjnSoZ6kPl4JPJv17gvd+UcXaR
64nLLmZQl9ij4UW/F6giq2T2hZu2yu2FQdASSY7PYPtIZZX6BuSxAWR++tGEidEw
Gf4XybYqmS2/BrmS9Pvj164=
-----END PRIVATE KEY-----`;
    const message = `POST
application/json
Wed, 04 Jan 2023 18:07:13 GMT
c3efaaee-a6bb-449f-9213-e45e23a462ef
6c18c234b1b18b1d97c7043e2e41135c293d0da9
F64FEC49-82BD-496A-B337-ADAB97EE3B05
3B640BD5-E9C6-4A0A-AEAB-6B697B80F27F
https://sandbox.apis.op.fi/paymentbutton/v1/payments
{"amount":"1.00","cancel":{"url":"https://shop.example.com/cancel/path"},"reject":{"url":"https://shop.example.com/reject/path"},"return":{"url":"https://shop.example.com/return/path"},"currency":"EUR","accountId":"8a5d4aac-8f8f-47ed-ae2f-36ffeaf57c79","reference":"RF3517834735"}`;

    const result = hash(privateKey, message);
    expect(result).toBe(expectedSignature);
  });
});
