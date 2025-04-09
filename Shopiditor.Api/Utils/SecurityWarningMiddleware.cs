namespace Shopiditor.Api.Utils
{
    /// <summary>
    /// Middleware to add security warning headers to API responses
    /// </summary>
    public class SecurityWarningMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<SecurityWarningMiddleware> _logger;

        public SecurityWarningMiddleware(RequestDelegate next, IWebHostEnvironment environment, ILogger<SecurityWarningMiddleware> logger)
        {
            _next = next;
            _environment = environment;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Add security headers
            context.Response.Headers.Append("X-Shopiditor-Warning", "Development use only - Not for production");
            
            if (_environment.IsDevelopment())
            {
                context.Response.Headers.Append("X-Execution-Warning", "Code execution is unsandboxed and not secure");
                _logger.LogWarning("Executing code in development mode without proper sandboxing");
            }
            else
            {
                // In non-development environments, we should not allow code execution
                // This will be replaced by proper Docker sandboxing in Phase 3
                if (context.Request.Path.StartsWithSegments("/api/code"))
                {
                    context.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
                    await context.Response.WriteAsJsonAsync(new 
                    { 
                        error = "Code execution is disabled in production environments",
                        message = "This feature requires proper sandboxing which will be implemented in a future phase"
                    });
                    return;
                }
            }

            await _next(context);
        }
    }

    /// <summary>
    /// Extension method to add the security warning middleware to the request pipeline
    /// </summary>
    public static class SecurityWarningMiddlewareExtensions
    {
        public static IApplicationBuilder UseSecurityWarnings(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SecurityWarningMiddleware>();
        }
    }
} 