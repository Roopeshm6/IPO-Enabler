namespace Test.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    //using System.Data.Entity.Spatial;

    public partial class QuestionResponse
    {
        [Key]
        public string ResponseId { get; set; }

        public string QuestionnaireId { get; set; }

        public string ProjectId { get; set; }

        public string Response { get; set; }

        public string Impact { get; set; }

        public string Effort { get; set; }

        public string Timing { get; set; }

        public string Observation { get; set; }

        public string Recommendations { get; set; }

        public DateTime? CreatedOn { get; set; }

        public string CreatedBy { get; set; }

        public string LastModifiedBy { get; set; }

        public DateTime? LastModifiedOn { get; set; }

        //public virtual Project Project { get; set; }

        //public virtual Questionnaire Questionnaire { get; set; }

        //public virtual User User { get; set; }

    }
}
