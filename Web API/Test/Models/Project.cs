namespace Test.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    //using System.Data.Entity.Spatial;

    public partial class Project
    {
        public string Id { get; set; }

        public string ProjectName { get; set; }

        public string UserId { get; set; }

        public DateTime? CreatedOn { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? LastModifiedOn { get; set; }

        public string LastModifiedBy { get; set; }
        public int ProjectId { get; set; }

        //public virtual Users User { get; set; }

        //public virtual ICollection<Questionnaire> Questionnaires { get; set; }
        //public virtual ICollection<QuestionResponse> QuestionResponses { get; set; }
    }
}
