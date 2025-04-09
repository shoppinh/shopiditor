namespace Shopiditor.Api.Models
{
    /// <summary>
    /// Represents a request to execute code in a specific language
    /// </summary>
    public class CodeExecutionRequest
    {
        /// <summary>
        /// The code content to be executed
        /// </summary>
        public string Code { get; set; } = string.Empty;

        /// <summary>
        /// The programming language of the code (e.g., "javascript", "csharp")
        /// </summary>
        public string Language { get; set; } = string.Empty;

        /// <summary>
        /// Optional timeout in milliseconds
        /// </summary>
        public int Timeout { get; set; } = 5000; // Default 5 seconds

        /// <summary>
        /// Optional command line arguments for the execution
        /// </summary>
        public string[] Arguments { get; set; } = Array.Empty<string>();
    }
} 