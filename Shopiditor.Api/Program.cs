using Shopiditor.Api.Services;
using Shopiditor.Api.Utils;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // React development server
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Register code execution services
builder.Services.AddScoped<ICodeExecutionService, JavaScriptExecutionService>();
builder.Services.AddScoped<ICodeExecutionService, CSharpExecutionService>();

// Register cache service
builder.Services.AddSingleton<ExecutionCacheService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Add security warnings middleware
app.UseSecurityWarnings();

// Use CORS
app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

// Add a security warning to the root endpoint
app.MapGet("/", () => 
{
    return "Shopiditor API - FOR DEVELOPMENT USE ONLY. This API provides code execution without proper sandboxing and should never be used in production environments. The Phase 3 implementation will include proper Docker-based sandboxing.";
});

app.Run();
