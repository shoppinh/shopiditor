using Microsoft.AspNetCore.Mvc;
using Shopiditor.Api.Models;
using Shopiditor.Api.Services;

namespace Shopiditor.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CodeExecutionController : ControllerBase
    {
        private readonly IEnumerable<ICodeExecutionService> _executionServices;
        private readonly ExecutionCacheService _cacheService;
        private readonly ILogger<CodeExecutionController> _logger;

        public CodeExecutionController(
            IEnumerable<ICodeExecutionService> executionServices,
            ExecutionCacheService cacheService,
            ILogger<CodeExecutionController> logger)
        {
            _executionServices = executionServices;
            _cacheService = cacheService;
            _logger = logger;
        }

        /// <summary>
        /// Executes code in the specified language
        /// </summary>
        [HttpPost("execute")]
        public async Task<ActionResult<CodeExecutionResponse>> ExecuteCode([FromBody] CodeExecutionRequest request)
        {
            if (string.IsNullOrEmpty(request.Code))
            {
                return BadRequest(new { error = "Code cannot be empty" });
            }

            if (string.IsNullOrEmpty(request.Language))
            {
                return BadRequest(new { error = "Language must be specified" });
            }

            // Find a service that supports the requested language
            var executionService = _executionServices.FirstOrDefault(s => s.SupportsLanguage(request.Language));
            if (executionService == null)
            {
                return BadRequest(new { error = $"Unsupported language: {request.Language}" });
            }

            try
            {
                // Execute the code
                var result = await executionService.ExecuteCodeAsync(request);
                
                // Cache the result
                _cacheService.CacheResult(result);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error executing code");
                return StatusCode(500, new CodeExecutionResponse
                {
                    Status = ExecutionStatus.Error,
                    Error = $"Internal server error: {ex.Message}"
                });
            }
        }

        /// <summary>
        /// Gets a cached execution result by ID
        /// </summary>
        [HttpGet("result/{executionId}")]
        public ActionResult<CodeExecutionResponse> GetExecutionResult(string executionId)
        {
            var result = _cacheService.GetResult(executionId);
            if (result == null)
            {
                return NotFound(new { error = "Execution result not found" });
            }

            return Ok(result);
        }

        /// <summary>
        /// Gets the supported languages
        /// </summary>
        [HttpGet("languages")]
        public ActionResult<IEnumerable<string>> GetSupportedLanguages()
        {
            var languages = new List<string>();
            
            foreach (var service in _executionServices)
            {
                if (service.SupportsLanguage("javascript") && !languages.Contains("javascript"))
                {
                    languages.Add("javascript");
                }
                else if (service.SupportsLanguage("csharp") && !languages.Contains("csharp"))
                {
                    languages.Add("csharp");
                }
            }

            return Ok(languages);
        }
    }
} 