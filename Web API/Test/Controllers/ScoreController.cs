using Microsoft.AspNetCore.Mvc;
using Test.Models;

namespace Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScoreController : Controller
    {
        private readonly IPOEnablerContext _ipoEnablerContext;
        public ScoreController(IPOEnablerContext ipoEnablerContext)
        {
            _ipoEnablerContext = ipoEnablerContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllScore()
        {
            var scores = _ipoEnablerContext.Score.ToList();
            if(scores.Count == 0)
            {
                throw new Exception("No Scores Available");
            }
            return Ok(scores); 
        }
        [HttpGet]
        [Route("{funcAreaId:int}/{projectId:Guid}")]
        [ActionName("GetUser")]
        public async Task<IActionResult> CalculateScore(int funcAreaId , Guid projectId)
        {
            if(funcAreaId == 0 || projectId == null)
            {
                throw new Exception("Functional Area Id is null");
            }
            var functionalArea = _ipoEnablerContext.FunctionalArea.ToList();
            foreach(var i in functionalArea)
            {
                var score = _ipoEnablerContext.Score.Where(x=> x.FunctionalAreaId == i.Id && x.ProjectId == projectId.ToString()).FirstOrDefault();
                if(score != null)
                {
                    var questions = _ipoEnablerContext.Questions.Where(x => x.FunctionAreaId == i.Id).ToList();
                    foreach (var question in questions)
                    {
                        var questionnaires = _ipoEnablerContext.Questionnaire.Where(x => x.QuestionId == question.QuestionId && x.ProjectId == projectId.ToString());
                        foreach (var questionnaire in questionnaires)
                        {
                            var questionResponse = _ipoEnablerContext.QuestionResponse.Where(x => x.QuestionnaireId == questionnaire.QuestionnaireId && x.ProjectId == projectId.ToString()).FirstOrDefault();
                            if (questionResponse != null)
                            {
                                var previousScore = _ipoEnablerContext.Score.Where(x => x.FunctionalAreaId == i.Id && x.ProjectId == projectId.ToString()).FirstOrDefault();
                                var value = previousScore == null ? 0 : previousScore.ScoreValue;
                                var responseValue = questionResponse.Response == "Very Low" ? 0 : questionResponse.Response == "Low" ? 0.5 : questionResponse.Response == "Medium" ? 0.15 : questionResponse.Response == "High" ? 0.3 : questionResponse.Response == "Very High" ? 0.5 : 0;
                                var impactRespone = questionResponse.Impact == "Low" ? 0 : questionResponse.Impact == "Medium" ? 0.33 : questionResponse.Impact == "High" ? 0.67 : 0;
                                var effortResponse = questionResponse.Effort == "Low" ? 0.67 : questionResponse.Effort == "Medium" ? 0.33 : questionResponse.Effort == "High" ? 0 : 0;
                                var totalScore = (responseValue + (responseValue * impactRespone) + (responseValue * effortResponse)) * 100;
                                score.ScoreValue = Convert.ToInt32(Math.Round(value + totalScore));
                            }
                        }
                    }
                    var scoresList = _ipoEnablerContext.Score.ToList();
                    _ipoEnablerContext.Score.Update(score);
                    _ipoEnablerContext.SaveChanges();
                }
                else
                {
                    var scoresCount = _ipoEnablerContext.Score.Count();

                    Score score1 = new Score();
                    if (scoresCount == 0)
                    {
                        score1.ScoreId = 1;
                    }
                    else
                    {
                        var scoresList = _ipoEnablerContext.Score.ToList();
                        score1.ScoreId = scoresList[scoresList.Count - 1].ScoreId + 1;
                    }
                    var questions = _ipoEnablerContext.Questions.Where(x => x.FunctionAreaId == i.Id).ToList();
                    foreach (var question in questions)
                    {
                        var questionnaires = _ipoEnablerContext.Questionnaire.Where(x => x.QuestionId == question.QuestionId && x.ProjectId == projectId.ToString());
                        foreach (var questionnaire in questionnaires)
                        {
                            var questionResponse = _ipoEnablerContext.QuestionResponse.Where(x => x.QuestionnaireId == questionnaire.QuestionnaireId && x.ProjectId == projectId.ToString()).FirstOrDefault();
                            if (questionResponse != null)
                            {
                                var previousScore = _ipoEnablerContext.Score.Where(x=>x.FunctionalAreaId == i.Id && x.ProjectId == projectId.ToString()).FirstOrDefault();
                                var value = previousScore == null ? 0 : previousScore.ScoreValue;
                                var responseValue = questionResponse.Response == "Very Low" ? 0 : questionResponse.Response == "Low" ? 0.5 : questionResponse.Response == "Medium" ? 0.15 : questionResponse.Response == "High" ? 0.3 : questionResponse.Response == "Very High" ? 0.5 : 0;
                                var impactRespone = questionResponse.Impact == "Low" ? 0 : questionResponse.Impact == "Medium" ? 0.33 : questionResponse.Impact == "High" ? 0.67 : 0;
                                var effortResponse = questionResponse.Effort == "Low" ? 0.67 : questionResponse.Effort == "Medium" ? 0.33 : questionResponse.Effort == "High" ? 0 : 0;
                                var totalScore = ( responseValue + (responseValue * impactRespone) + (responseValue * effortResponse)) * 100;
                                score1.ScoreValue = Convert.ToInt32(Math.Round(value + totalScore));
                            }
                        }
                    }
                    score1.ProjectId = projectId.ToString();
                    score1.FunctionalAreaId = i.Id;
                    _ipoEnablerContext.Score.Add(score1);
                    _ipoEnablerContext.SaveChanges();
                }
                
            }
            var ScoreLists = _ipoEnablerContext.Score.Where(x=> x.FunctionalAreaId == funcAreaId && x.ProjectId == projectId.ToString()).ToList();
            return Ok(ScoreLists);
        }
    }
}
