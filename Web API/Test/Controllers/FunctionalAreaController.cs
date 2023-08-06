using Microsoft.AspNetCore.Mvc;
using Test.Models;

namespace Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FunctionalAreaController : Controller
    {
        private readonly IPOEnablerContext _ipoEnablerContext;
        public FunctionalAreaController(IPOEnablerContext ipoEnablerContext)
        {
            _ipoEnablerContext = ipoEnablerContext;
        }
        [HttpGet]
        public List<FunctionalArea> GetFunctionalAreas()
        {
            if (_ipoEnablerContext.FunctionalArea == null)
            {
                throw new Exception("Not found");
            }
            var functionalAreas = _ipoEnablerContext.FunctionalArea.ToList();
            if (functionalAreas == null)
            {
                throw new Exception("Not found");
            }
            return functionalAreas;
        }
    }
}
