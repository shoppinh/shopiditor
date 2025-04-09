namespace Shopiditor.Api.Models
{
    /// <summary>
    /// Represents the response after executing code
    /// </summary>
    public class CodeExecutionResponse
    {
        /// <summary>
        /// The standard output of the execution
        /// </summary>
        public string Output { get; set; } = string.Empty;

        /// <summary>
        /// Any error output from the execution
        /// </summary>
        public string Error { get; set; } = string.Empty;

        /// <summary>
        /// Execution status
        /// </summary>
        public ExecutionStatus Status { get; set; } = ExecutionStatus.Success;

        /// <summary>
        /// Time taken in milliseconds
        /// </summary>
        public long ExecutionTime { get; set; }

        /// <summary>
        /// A unique identifier for this execution (useful for caching)
        /// </summary>
        public string ExecutionId { get; set; } = Guid.NewGuid().ToString();
    }

    /// <summary>
    /// Status of code execution
    /// </summary>
    public enum ExecutionStatus
    {
        Success,
        Error,
        Timeout
    }
} 