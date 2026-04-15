using Microsoft.AspNetCore.Http;
using System.Text;

public class TrimMiddleware
{
    private readonly RequestDelegate _next;

    public TrimMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        context.Request.EnableBuffering();

        using var reader = new StreamReader(context.Request.Body, Encoding.UTF8, leaveOpen: true);
        var body = await reader.ReadToEndAsync();

        // remove extra spaces inside JSON
        body = body.Replace("   ", "").Replace("  ", "");

        var bytes = Encoding.UTF8.GetBytes(body);

        context.Request.Body = new MemoryStream(bytes);
        context.Request.Body.Position = 0;

        await _next(context);
    }
}