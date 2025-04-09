using Shopiditor.Api.Models;

namespace Shopiditor.Api.Services
{
    /// <summary>
    /// Interface for code execution services
    /// </summary>
    public interface ICodeExecutionService
    {
        /// <summary>
        /// Executes code in a specific language
        /// </summary>
        /// <param name="request">The code execution request</param>
        /// <returns>The execution response</returns>
        Task<CodeExecutionResponse> ExecuteCodeAsync(CodeExecutionRequest request);

        /// <summary>
        /// Checks if this service supports the specified language
        /// </summary>
        /// <param name="language">The language to check</param>
        /// <returns>True if supported, false otherwise</returns>
        bool SupportsLanguage(string language);
    }
} 