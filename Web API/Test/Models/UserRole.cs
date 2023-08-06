namespace Test.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    //using System.Data.Entity.Spatial;

    public partial class UserRole
    {
        public string UserRoleId { get; set; }
        public string RoleId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public string LastModifiedBy { get; set; }
        public string UserId { get; set; }
        public int UserStatus { get; set; }
        public string UserName { get; set; }
        //public virtual User User { get; set; }
        //public virtual Role Role { get; set; }
    }
}
