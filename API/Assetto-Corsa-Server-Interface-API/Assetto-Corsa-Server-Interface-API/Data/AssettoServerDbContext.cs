using Microsoft.EntityFrameworkCore;
using Assetto_Corsa_Server_Interface_API.Data.Tables;
using Microsoft.AspNetCore.Identity;

namespace Assetto_Corsa_Server_Interface_API.Data
{
    public class AssettoServerDbContext : DbContext
    {
        public AssettoServerDbContext(DbContextOptions<AssettoServerDbContext> options)
            : base(options)
        {
        }

        public DbSet<ServerList> ServerList { get; set; }
        public DbSet<PowerSettings> PowerSettings { get; set; }
        public DbSet<Leaderboard> leaderboard { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ServerList>(entity =>
            {
                entity.HasKey(e => e.UID);
            });

            builder.Entity<PowerSettings>(entity =>
            {
                entity.HasKey(e => e.UID);
            });

            builder.Entity<Leaderboard>(entity =>
            {
                entity.HasKey(e => e.UID);
            });
        }
    }

}
