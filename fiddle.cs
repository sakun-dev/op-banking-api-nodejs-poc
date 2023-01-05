using System;
using System.Net.Http;
using System.				

namespace dotnet;


public class Program
{
	public async static Task Main()
	{
		Console.WriteLine("Hello World");

		// https://github.com/saku-kaarakainen/WenLamboSerDotNetRestApi/blob/main/WenlamboSer.BinanceApi/BaseClient.cs
		var client = new HttpClient();
		client.BaseAddress = new Uri("https://google.com");

		var response = await client.GetAsync("/");
		var result = await response.Content.ReadAsStringAsync();
		Console.WriteLine(result);
	}
}