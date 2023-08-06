using System.ComponentModel.DataAnnotations;

namespace Test.Models
{
    public class QuestionsDetail
    {
        [Key]
        public int QuestionId { get; set; }

        public int FunctionAreaId { get; set; }
        public int IndustryId { get; set; }

        public string QuestionName { get; set; }

        public string Description { get; set; }

        public DateTime? CreatedOn { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? LastModifiedOn { get; set; }

        public string LastModifiedBy { get; set; }
        public Boolean IsActive { get; set; }
        public string QuestionnaireId { get; set; }
    }
}
