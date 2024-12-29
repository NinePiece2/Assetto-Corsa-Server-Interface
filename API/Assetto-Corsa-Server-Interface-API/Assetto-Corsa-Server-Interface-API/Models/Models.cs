namespace Assetto_Corsa_Server_Interface_API.Models
{
    public class LeaderboardModel
    {
        public int Rank { get; set; }
        public string? Name { get; set; }
        public DateTime? Date { get; set; }
        public string? Car { get; set; }
        public TimeSpan? Duration { get; set; }
        public decimal? ScorePerMinute { get; set; }
        public decimal? Score { get; set; }
    }
}
