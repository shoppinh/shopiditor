using System.Diagnostics;
using System.Text;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;
using Shopiditor.Api.Models;

namespace Shopiditor.Api.Services
{
    /// <summary>
    /// Service for executing C# code using Roslyn
    /// </summary>
    public class CSharpExecutionService : ICodeExecutionService
    {
        private readonly ILogger<CSharpExecutionService> _logger;

        public CSharpExecutionService(ILogger<CSharpExecutionService> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Executes C# code using Roslyn scripting
        /// </summary>
        public async Task<CodeExecutionResponse> ExecuteCodeAsync(CodeExecutionRequest request)
        {
            _logger.LogInformation("Executing C# code");
            var response = new CodeExecutionResponse();
            var stopwatch = Stopwatch.StartNew();

            try
            {
                // Create a new console output capture
                var consoleOut = new StringWriter();
                var consoleError = new StringWriter();
                var originalOut = Console.Out;
                var originalError = Console.Error;

                try
                {
                    // Redirect console output
                    Console.SetOut(consoleOut);
                    Console.SetError(consoleError);

                    // Create script options
                    var scriptOptions = ScriptOptions.Default
                        .AddReferences("System")
                        .AddReferences("System.Core")
                        .AddReferences("System.Linq")
                        .AddReferences("System.Collections")
                        .AddImports("System")
                        .AddImports("System.IO")
                        .AddImports("System.Linq")
                        .AddImports("System.Collections.Generic");

                    // Create a cancellation token source for timeout
                    using var cts = new CancellationTokenSource(request.Timeout);

                    // Execute the script
                    await CSharpScript.EvaluateAsync(request.Code, scriptOptions, cancellationToken: cts.Token);

                    // Get the output
                    response.Output = consoleOut.ToString();
                    response.Status = ExecutionStatus.Success;
                }
                catch (OperationCanceledException)
                {
                    response.Status = ExecutionStatus.Timeout;
                    response.Error = "Execution timed out";
                }
                catch (CompilationErrorException ex)
                {
                    response.Status = ExecutionStatus.Error;
                    response.Error = $"Compilation error: {ex.Message}";
                }
                catch (Exception ex)
                {
                    response.Status = ExecutionStatus.Error;
                    response.Error = $"Runtime error: {ex.Message}";
                    
                    // Also capture any error output
                    if (consoleError.ToString().Length > 0)
                    {
                        response.Error += Environment.NewLine + consoleError.ToString();
                    }
                }
                finally
                {
                    // Restore original console
                    Console.SetOut(originalOut);
                    Console.SetError(originalError);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error executing C# code");
                response.Status = ExecutionStatus.Error;
                response.Error = $"Execution error: {ex.Message}";
            }

            stopwatch.Stop();
            response.ExecutionTime = stopwatch.ElapsedMilliseconds;
            return response;
        }

        /// <summary>
        /// Checks if this service supports the specified language
        /// </summary>
        public bool SupportsLanguage(string language)
        {
            return language.Equals("csharp", StringComparison.OrdinalIgnoreCase) ||
                   language.Equals("c#", StringComparison.OrdinalIgnoreCase);
        }
    }
} 