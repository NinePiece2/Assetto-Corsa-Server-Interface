using Assetto_Corsa_Server_Interface_API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Assetto_Corsa_Server_Interface_API.Models;

namespace Assetto_Corsa_Server_Interface_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaderboardController : Controller
    {
        private readonly AssettoServerDbContext assettoServerDbContext;
        public LeaderboardController(AssettoServerDbContext _assettoServerDbContext)
        {
            assettoServerDbContext = _assettoServerDbContext;
        }

        [HttpGet]
        [Route("GetLeaderbaord")]
        public IActionResult GetLeaderbaord()
        {
            var leaderboardData = assettoServerDbContext.leaderboard
                                     .OrderByDescending(l => l.Score)
                                     .ToList();

            var leaderboard = leaderboardData
                                .Select((l, index) => new LeaderboardModel
                                {
                                    Rank = index + 1, // Assign rank (1-based index)
                                    Name = l.Name,
                                    Date = l.Date,
                                    Car = l.Car,
                                    Duration = l.Duration,
                                    ScorePerMinute = l.ScorePerMinute,
                                    Score = l.Score
                                })
                                .ToList();

            return Json(new { result = leaderboard, count = leaderboard.Count });
        }
    }
}
