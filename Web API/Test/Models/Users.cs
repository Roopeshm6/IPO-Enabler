using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Test.Models
{
    public partial class Users
    {
        
        public string Id { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Email { get; set; }

//public virtual ICollection<FunctionalArea> FunctionalAreas { get; set; }

       //public virtual ICollection<FunctionalArea> FunctionalAreas1 { get; set; }

        //public virtual ICollection<Project> Projects { get; set; }

        //public virtual ICollection<Questionnaire> Questionnaires { get; set; }

        //public virtual ICollection<Questionnaire> Questionnaires1 { get; set; }

        //public virtual ICollection<QuestionResponse> QuestionResponses { get; set; }
        
        //public virtual ICollection<QuestionResponse> QuestionResponses1 { get; set; }

        //public virtual ICollection<Question> Questions { get; set; }

        //public virtual ICollection<Question> Questions1 { get; set; }

        //public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
