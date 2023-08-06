using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Test.Models
{
    public class IPOEnablerContext : DbContext
    {
        public IPOEnablerContext(DbContextOptions<IPOEnablerContext> dbContextOptions)
            : base(dbContextOptions)
        {
        }

        public DbSet<FunctionalArea> FunctionalArea { get; set; }
        public DbSet<Industry> Industry { get; set; }
        public DbSet<Projects> Projects { get; set; }
        public DbSet<Project> Project { get; set; }
        public DbSet<Questionnaire> Questionnaire { get; set; }
        public DbSet<QuestionResponse> QuestionResponse { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<Questions> Questions { get; set; }
        public DbSet<Register> Register { get; set; }
        public DbSet<Score> Score { get; set; }
    }
}
