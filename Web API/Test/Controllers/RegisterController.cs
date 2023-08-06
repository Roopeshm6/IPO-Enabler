using Microsoft.AspNetCore.Mvc;
using Test.Models;

namespace Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : Controller
    {
        private readonly IPOEnablerContext _ipoEnablerContext;
        public RegisterController(IPOEnablerContext ipoEnablerContext)
        {
            _ipoEnablerContext = ipoEnablerContext;
        }
        [HttpPost]
        public async Task<IActionResult> NeedToAddUser([FromBody] Register register)
        {
            try
            {
                register.Id= Guid.NewGuid().ToString();
                await _ipoEnablerContext.Register.AddRangeAsync(register);
                await _ipoEnablerContext.SaveChangesAsync();
                return Ok(register);

            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }
        [HttpGet]
        public List<Register> GetRegisterList()
        {
            try
            {
                var registers = _ipoEnablerContext.Register.ToList();
                if (registers == null)
                {
                    throw new Exception("Not found");
                }
                return registers;
            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }
    }
}
