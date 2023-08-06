using System.ComponentModel.DataAnnotations;

namespace Test.Models
{
    public class Score
    {
        [Key]
        public int ScoreId { get; set; }
        public string ProjectId {  get; set; }
        public int FunctionalAreaId { get; set; }
        public int ScoreValue {  get; set; }
    }
}
