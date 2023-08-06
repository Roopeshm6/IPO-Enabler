using Microsoft.AspNetCore.Mvc;
using Test.Models;

namespace Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IndustryController : Controller
    {
        private readonly IPOEnablerContext _ipoEnablerContext;
        public IndustryController(IPOEnablerContext ipoEnablerContext)
        {
            _ipoEnablerContext = ipoEnablerContext;
        }
        [HttpGet]
        public List<Industry> GetIndustries()
        {
            if (_ipoEnablerContext.Industry == null)
            {
                throw new Exception("Not found");
            }
            var industries = _ipoEnablerContext.Industry.ToList();
            if (industries == null)
            {
                throw new Exception("Not found");
            }
            return industries;
        }
    }
}
