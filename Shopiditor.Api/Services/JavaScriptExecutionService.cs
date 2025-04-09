using System.Diagnostics;
using System.Text;
using Shopiditor.Api.Models;
using Shopiditor.Api.Utils;

namespace Shopiditor.Api.Services
{
    /// <summary>
    /// Service for executing JavaScript code using Node.js
    /// </summary>
    public class JavaScriptExecutionService : ICodeExecutionService
    {
        private readonly ILogger<JavaScriptExecutionService> _logger;

        public JavaScriptExecutionService(ILogger<JavaScriptExecutionService> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Executes JavaScript code using Node.js
        /// </summary>
        public async Task<CodeExecutionResponse> ExecuteCodeAsync(CodeExecutionRequest request)
        {
            _logger.LogInformation("Executing JavaScript code");
            var response = new CodeExecutionResponse();
            var stopwatch = Stopwatch.StartNew();

            try
            {
                // Create a temporary JavaScript file
                string tempFilePath = Path.Combine(Path.GetTempPath(), $"shopiditor_{Guid.NewGuid()}.js");
                await File.WriteAllTextAsync(tempFilePath, request.Code);

                // Set up the Node.js process
                using var process = new Process();
                process.StartInfo.FileName = "node";
                process.StartInfo.Arguments = tempFilePath;
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.RedirectStandardOutput = true;
                process.StartInfo.RedirectStandardError = true;
                process.StartInfo.CreateNoWindow = true;

                var outputBuilder = new StringBuilder();
                var errorBuilder = new StringBuilder();

                process.OutputDataReceived += (sender, args) =>
                {
                    if (args.Data != null)
                    {
                        outputBuilder.AppendLine(args.Data);
                    }
                };

                process.ErrorDataReceived += (sender, args) =>
                {
                    if (args.Data != null)
                    {
                        errorBuilder.AppendLine(args.Data);
                    }
                };

                // Start the process with timeout
                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();

                // Wait for the process to exit with timeout
                bool completed = process.WaitForExit(request.Timeout);

                if (!completed)
                {
                    // Process exceeded timeout
                    try
                    {
                        process.Kill();
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error killing Node.js process after timeout");
                    }

                    response.Status = ExecutionStatus.Timeout;
                    response.Error = "Execution timed out";
                }
                else
                {
                    // Process completed within timeout
                    response.Output = outputBuilder.ToString();
                    response.Error = errorBuilder.ToString();
                    response.Status = string.IsNullOrEmpty(response.Error)
                        ? ExecutionStatus.Success
                        : ExecutionStatus.Error;
                }

                // Clean up the temporary file
                try
                {
                    File.Delete(tempFilePath);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed to delete temporary JavaScript file");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error executing JavaScript code");
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
            return language.Equals("javascript", StringComparison.OrdinalIgnoreCase) ||
                   language.Equals("js", StringComparison.OrdinalIgnoreCase);
        }
    }
} 