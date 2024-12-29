namespace Assetto_Corsa_Server_Interface_API.Data.Tables
{
    public class Leaderboard
    {
        public int UID { get; set; }
        public string? Name { get; set; }
        public DateTime? Date { get; set; }
        public string? Car { get; set; }
        public TimeSpan? Duration { get; set; }
        public decimal? ScorePerMinute { get; set; }
        public decimal? Score { get; set; }
    }
}
