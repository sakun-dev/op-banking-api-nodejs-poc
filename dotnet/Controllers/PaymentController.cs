using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Security.Authentication;
using System.Security.Cryptography;
using dotnet.Services;

namespace dotnet.Controllers;

[ApiController]
[Route("[controller]")]
public class PaymentController : ControllerBase
{
    private readonly HttpClient client;
    private readonly CryptoService crypto;

    public PaymentController(
        HttpClient client,
        CryptoService crypto) 
    {
        this.client = client;
        this.crypto = crypto;
    }

    [HttpGet(Name = "/")]
    public async Task<IActionResult> Get()
    {
        var API_KEY="YOUR_API_KEY_GOES_HERE";
        var SERVER="https://sandbox.apis.op.fi/paymentbutton";

        // The SANDBOX will recognise signatures generated with the private
        // key used on the HMAC instructions page
        var PRIVATE_KEY="payment-button.private";

        Console.WriteLine("Downloading SANDBOX private key");
        var privateKeyResult = await this.client.GetAsync("https://op-developer.fi/assets/private-key.pem");
        PRIVATE_KEY = await privateKeyResult.Content.ReadAsStringAsync();
        Console.WriteLine("Found private key: " + PRIVATE_KEY);
        // wget -O $PRIVATE_KEY https://op-developer.fi/assets/private-key.pem
        

        // #DATE=$(date -u +"%a, %d %m %Y %T GMT")
        var DATE = DateTime.Now.ToUniversalTime();
        // DATE=$(date --universal +"%a, %d %b %Y %T GMT")
        Console.WriteLine("Working with DATE: " + DATE);

        var MERCHANT_ID="c3efaaee-a6bb-449f-9213-e45e23a462ef";
        Console.WriteLine("Using merchant id: " + MERCHANT_ID);

        Console.WriteLine("Using API key: " + API_KEY);

        var SESSION_ID=Guid.NewGuid();
        Console.WriteLine("Using session id: " + SESSION_ID);

        var REQUEST_ID=Guid.NewGuid();
        Console.WriteLine("Using request id: " + REQUEST_ID);

        var REQUEST_BODY="{\"amount\":\"1.00\",\"cancel\":{\"url\":\"https://shop.example.com/cancel/path\"},\"reject\":{\"url\":\"https://shop.example.com/reject/path\"},\"return\":{\"url\":\"https://shop.example.com/return/path\"},\"currency\":\"EUR\",\"accountId\":\"8a5d4aac-8f8f-47ed-ae2f-36ffeaf57c79\",\"reference\":\"RF3517834735\"}";
        Console.WriteLine("Using request body:");
        Console.WriteLine(REQUEST_BODY);

        var URL= $"{SERVER.TrimEnd('/')}/v1/payments";

        // No trailing newline at the end of the signature base!
        // Only single LF (\n) characters used as newline characters

        var SIGNATURE_BASE=@$"POST
application/json
{DATE}
{MERCHANT_ID}
{API_KEY}
{SESSION_ID}
{REQUEST_ID}
{URL}
{REQUEST_BODY}";

        Console.WriteLine("Using signature base:");
        Console.WriteLine(SIGNATURE_BASE);
        // Console.WriteLine(-n "$SIGNATURE_BASE" > signature-base.txt  # avoid a trailing \n character to the end of the file

        Console.WriteLine("Calculating signature");
       var DIGEST = crypto.CreateSha256Hash(SIGNATURE_BASE);
        //var DIGEST=$(openssl dgst -sha256 -sign $PRIVATE_KEY -hex signature-base.txt | cut -d' ' -f2)
        Console.WriteLine("Signature base's message digest: $DIGEST");

        Console.WriteLine($"{MERCHANT_ID}:1:0:{DIGEST}");
        var SIGNATURE=$"{MERCHANT_ID}:1:0:{DIGEST}";
        Console.WriteLine("Signature: $SIGNATURE");

        Console.WriteLine("Launching request");
        Console.WriteLine(@"curl -v -XPOST $URL \\
          -H ""Authorization: $SIGNATURE"" \\
          -H ""Date: $DATE"" \\
          -H 'Accept: application/json' \\
          -H 'Content-Type: application/json' \\
          -H ""x-session-id: $SESSION_ID"" \\
          -H ""x-request-id: $REQUEST_ID"" \\
          -H ""x-api-key: $API_KEY"" \\
          -d '$REQUEST_BODY'");
        /*
        curl -v -XPOST $URL \
          -H "Authorization: $SIGNATURE" \
          -H "Date: $DATE" \
          -H 'Accept: application/json' \
          -H 'Content-Type: application/json' \
          -H "x-session-id: $SESSION_ID" \
          -H "x-request-id: $REQUEST_ID" \
          -H "x-api-key: $API_KEY" \
          -d "$REQUEST_BODY");
        */


        using HttpClient httpClient = new (new HttpClientHandler
        {
            ClientCertificateOptions = ClientCertificateOption.Manual,
            SslProtocols = SslProtocols.Tls12,
            ClientCertificates = { new X509Certificate2() }
        });

        // https://github.com/saku-kaarakainen/WenLamboSerDotNetRestApi/blob/main/WenlamboSer.BinanceApi/BaseClient.cs
		var response = await this.client.GetAsync(URL);
		response.Certificate(PRIVATE_KEY);
        
        var result = await response.Content.ReadAsStringAsync();
		

        return Ok(result);
    }
}
