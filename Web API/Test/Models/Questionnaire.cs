namespace Test.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    //using System.Data.Entity.Spatial;

    public partial class Questionnaire
    {
        

        public string QuestionnaireId { get; set; }

        public string ProjectId { get; set; }

        public int QuestionId { get; set; }

        public bool? InScope { get; set; }

        public int? Criticality { get; set; }

        public string LastModifiedBy { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? LastModifiedOn { get; set; }

        public DateTime? CreatedOn { get; set; }

        //public virtual Project Project { get; set; }

        //public virtual User User { get; set; }

        //public virtual User User1 { get; set; }

        //public virtual Question Question { get; set; }

        //public virtual ICollection<QuestionResponse> QuestionResponses { get; set; }
    }
}
