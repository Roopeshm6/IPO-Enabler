using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;
using Test.Models;

namespace Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionnnaireController : Controller
    {
        private readonly IPOEnablerContext _ipoEnablerContext;
        public QuestionnnaireController(IPOEnablerContext ipoEnablerContext)
        {
            _ipoEnablerContext = ipoEnablerContext;
        }
        [HttpGet]
        public List<Questionnaire> GetAllQuestions()
        {
            if (_ipoEnablerContext.Questionnaire == null)
            {
                throw new Exception("Not found");
            }
            var questionnaire = _ipoEnablerContext.Questionnaire.ToList();
            if (questionnaire == null)
            {
                throw new Exception("Not found");
            }
            return questionnaire;
        }
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetQuestionnaireProjectId")]
        public List<Questionnaire> GetQuestionnaireProjectId(Guid id)
        {
            try
            {
                var projectId = Convert.ToString(id);
                if (projectId == null)
                {
                    throw new Exception("Not found");
                }
                var questionnaire = _ipoEnablerContext.Questionnaire.Where(x => x.ProjectId == projectId).ToList();
                if (questionnaire == null)
                {
                    throw new Exception("Not found");
                }
                return questionnaire;
            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }
        [HttpPost]
        public async Task<IActionResult> AddQuestionnaire([FromBody] Questionnaire questionnaire)
        {
            try
            {
                questionnaire.QuestionnaireId = Guid.NewGuid().ToString();
                questionnaire.InScope = true;
                questionnaire.Criticality = 0;
                questionnaire.CreatedOn = DateTime.Now;
                questionnaire.LastModifiedOn = DateTime.Now;
                questionnaire.CreatedBy = _ipoEnablerContext.UserRole.Where(x => x.UserId == questionnaire.CreatedBy).FirstOrDefault().UserName;
                questionnaire.LastModifiedBy = _ipoEnablerContext.UserRole.Where(x => x.UserId == questionnaire.LastModifiedBy).FirstOrDefault().UserName;
                await _ipoEnablerContext.Questionnaire.AddAsync(questionnaire);
                await _ipoEnablerContext.SaveChangesAsync();
                return Ok(questionnaire);
            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }
        [HttpDelete]
        [Route("{id:guid}")]
        [ActionName("GetUser")]
        public IActionResult DeleteQuestionnaire(Guid id)
        {
            try
            {
                var questionnaireId = Convert.ToString(id);
                var questionnaire = _ipoEnablerContext.Questionnaire.Where(x => x.QuestionnaireId == questionnaireId).FirstOrDefault();
                if (questionnaire == null)
                {
                    throw new Exception("Unable to find the Questionnaire");
                }
                _ipoEnablerContext.Questionnaire.Remove(questionnaire);
                _ipoEnablerContext.SaveChanges();
                return Ok("Questionnaire Deleted Successfully");
            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }
    }
}
