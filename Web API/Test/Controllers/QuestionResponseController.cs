using Microsoft.AspNetCore.Mvc;
using Test.Models;

namespace Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionResponseController : Controller
    {
        private readonly IPOEnablerContext _ipoEnablerContext;
        public QuestionResponseController(IPOEnablerContext ipoEnablerContext)
        {
            _ipoEnablerContext = ipoEnablerContext;
        }
        [HttpGet]
        public List<QuestionResponse> GetAllQuestions()
        {
            if (_ipoEnablerContext.QuestionResponse == null)
            {
                throw new Exception("Not found");
            }
            var questionResponse = _ipoEnablerContext.QuestionResponse.ToList();
            if (questionResponse == null)
            {
                throw new Exception("Not found");
            }
            return questionResponse;
        }
        [HttpGet]
        [Route("{id:Guid}")]
        [ActionName("GetQuestionResponsebyQuestionnaireId")]
        public QuestionResponse GetQuestionResponsebyQuestionnaireId(Guid id)
        {
            var questionnaireId = Convert.ToString(id);
            if (id == null)
            {
                throw new Exception("Not found");
            }
            var questionResponse = _ipoEnablerContext.QuestionResponse.Where(x => x.QuestionnaireId == questionnaireId).FirstOrDefault();
            if (questionResponse == null)
            {
                throw new Exception("Not found");
            }
            return questionResponse;
        }
        [HttpGet]
        [Route("{id:guid}/{questionId:int}")]
        [ActionName("GetQuestionnairebyProjectIdQuestionnaireId")]
        public List<Questionnaire> GetQuestionnairebyProjectIdQuestionnaireId(Guid id,int questionId)
        {
            try
            {
                var projectId = Convert.ToString(id);
                if (projectId == null)
                {
                    throw new Exception("Not found");
                }
                var questionnaire = _ipoEnablerContext.Questionnaire.Where(x => x.ProjectId == projectId && x.QuestionId == questionId).ToList();
                if (questionnaire == null)
                {
                    throw new Exception("Not found");
                }
                return questionnaire;
            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }
        [HttpPost]
        public async Task<IActionResult> AddQuestionResponse([FromBody] QuestionResponse questionResponse)
        {
            try
            {
                questionResponse.ResponseId = Guid.NewGuid().ToString();
                questionResponse.CreatedOn = DateTime.Now;
                questionResponse.LastModifiedOn = DateTime.Now;
                questionResponse.CreatedBy = _ipoEnablerContext.UserRole.Where(x => x.UserId == questionResponse.CreatedBy).FirstOrDefault().UserName;
                questionResponse.LastModifiedBy = _ipoEnablerContext.UserRole.Where(x => x.UserId == questionResponse.LastModifiedBy).FirstOrDefault().UserName;
                await _ipoEnablerContext.QuestionResponse.AddAsync(questionResponse);
                await _ipoEnablerContext.SaveChangesAsync();
                return Ok(questionResponse);

            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }
    }
}
