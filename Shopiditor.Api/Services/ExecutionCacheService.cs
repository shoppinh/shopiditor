using System.Collections.Concurrent;
using Shopiditor.Api.Models;

namespace Shopiditor.Api.Services
{
    /// <summary>
    /// Service to cache code execution results
    /// </summary>
    public class ExecutionCacheService
    {
        private readonly ConcurrentDictionary<string, CodeExecutionResponse> _cache = new();
        private readonly ILogger<ExecutionCacheService> _logger;

        public ExecutionCacheService(ILogger<ExecutionCacheService> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Adds or updates a result in the cache
        /// </summary>
        public void CacheResult(CodeExecutionResponse result)
        {
            _cache[result.ExecutionId] = result;
            _logger.LogInformation("Cached execution result with ID: {ExecutionId}", result.ExecutionId);
            
            // Clean up if cache gets too large
            if (_cache.Count > 100)
            {
                CleanupCache();
            }
        }

        /// <summary>
        /// Gets a result from the cache by ID
        /// </summary>
        public CodeExecutionResponse? GetResult(string executionId)
        {
            if (_cache.TryGetValue(executionId, out var result))
            {
                _logger.LogInformation("Retrieved execution result from cache with ID: {ExecutionId}", executionId);
                return result;
            }

            _logger.LogInformation("Execution result not found in cache with ID: {ExecutionId}", executionId);
            return null;
        }

        /// <summary>
        /// Removes old entries if the cache gets too large
        /// </summary>
        private void CleanupCache()
        {
            _logger.LogInformation("Cleaning up execution cache");
            
            // Remove random entries to keep the cache size manageable
            // In a production system, this would use a more sophisticated approach
            // like removing based on time, LRU, etc.
            var keysToRemove = _cache.Keys.Take(_cache.Count - 50).ToList();
            foreach (var key in keysToRemove)
            {
                _cache.TryRemove(key, out _);
            }
        }
    }
} 