using System.ComponentModel.DataAnnotations;

namespace Test.Models
{
    public class Projects
    {
        public int Id { get; set; }

        public string ProjectName { get; set; }

        public DateTime? CreatedOn { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? LastModifiedOn { get; set; }

        public string LastModifiedBy { get; set; }
    }
}
