namespace Test.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    //using System.Data.Entity.Spatial;

    public partial class Role
    {
        

        public string RoleId { get; set; }

        public string RoleName { get; set; }

        //public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
