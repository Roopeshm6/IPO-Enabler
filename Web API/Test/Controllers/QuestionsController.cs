using Microsoft.AspNetCore.Mvc;
using Test.Models;

namespace Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionsController : Controller
    {
        private readonly IPOEnablerContext _ipoEnablerContext;
        public QuestionsController(IPOEnablerContext ipoEnablerContext)
        {
            _ipoEnablerContext = ipoEnablerContext;
        }
        [HttpGet]
        public List<Questions> GetAllQuestions()
        {
            if (_ipoEnablerContext.Questions == null)
            {
                throw new Exception("Not found");
            }
            var functionalAreas = _ipoEnablerContext.Questions.ToList();
            if (functionalAreas == null)
            {
                throw new Exception("Not found");
            }
            return functionalAreas;
        }
        [HttpGet]
        [Route("{id:int}/{industryId:int}")]
        [ActionName("GetQuestionsbyFunctionalAreaId")]
        public List<Questions> GetQuestionsbyFunctionalAreaId(int id,int industryId)
        {
            if (id == null)
            {
                throw new Exception("Not found");
            }
            var questions = _ipoEnablerContext.Questions.Where(x => x.FunctionAreaId == id && x.IndustryId == industryId).ToList();
            if (questions == null)
            {
                throw new Exception("Not found");
            }
            return questions;
        }
        [HttpPost]
        public async Task<IActionResult> AddQuestionResponse([FromBody] Questions question)
        {
            try
            {
                var questions = _ipoEnablerContext.Questions.ToList();
                var count = questions.Count();
                if(count == 0)
                {
                    question.QuestionId = 1;
                }
                else
                {
                    question.QuestionId = questions[count - 1].QuestionId + 1;
                }
                question.CreatedOn = DateTime.Now;
                question.LastModifiedOn = DateTime.Now;
                question.CreatedBy = _ipoEnablerContext.UserRole.Where(x => x.UserId == question.CreatedBy).FirstOrDefault().UserName;
                question.LastModifiedBy = _ipoEnablerContext.UserRole.Where(x => x.UserId == question.LastModifiedBy).FirstOrDefault().UserName;
                await _ipoEnablerContext.Questions.AddAsync(question);
                await _ipoEnablerContext.SaveChangesAsync();
                return Ok(question);

            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }
    }
}
