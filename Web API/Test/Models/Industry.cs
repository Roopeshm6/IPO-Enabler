namespace Test.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    //using System.Data.Entity.Spatial;

    public partial class Industry
    {
        public int Id { get; set; }

        public string IndustryName { get; set; }

       // public virtual ICollection<FunctionalArea> FunctionalAreas { get; set; }
    }
}
