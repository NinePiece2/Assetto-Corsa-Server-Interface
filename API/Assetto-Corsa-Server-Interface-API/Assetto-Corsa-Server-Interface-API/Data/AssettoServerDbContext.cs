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
            builder.HasDefaultSchema("dbo");

            builder.Entity<ServerList>(entity =>
            {
                entity.HasKey(e => e.UID);
                entity.ToTable("serverlist");
                
                entity.Property(e => e.UID).HasColumnName("uid");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.Map).HasColumnName("map");
                entity.Property(e => e.LocalIP).HasColumnName("localip");
                entity.Property(e => e.HttpPort).HasColumnName("httpport");
                entity.Property(e => e.TCPUDPPort).HasColumnName("TCP-UDP-Port");
                entity.Property(e => e.IsActive).HasColumnName("isactive");
            });

            builder.Entity<PowerSettings>(entity =>
            {
                entity.HasKey(e => e.UID);
                entity.ToTable("powersettings");
                
                entity.Property(e => e.UID).HasColumnName("uid");
                entity.Property(e => e.SettingName).HasColumnName("settingname");
                entity.Property(e => e.SettingValue).HasColumnName("settingvalue");
            });

            builder.Entity<Leaderboard>(entity =>
            {
                entity.HasKey(e => e.UID);
                entity.ToTable("leaderboard");
                
                entity.Property(e => e.UID).HasColumnName("uid");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.Date).HasColumnName("date");
                entity.Property(e => e.Car).HasColumnName("car");
                entity.Property(e => e.Duration).HasColumnName("duration");
                entity.Property(e => e.ScorePerMinute).HasColumnName("scoreperminute");
                entity.Property(e => e.Score).HasColumnName("score");
            });
        }
    }

}
