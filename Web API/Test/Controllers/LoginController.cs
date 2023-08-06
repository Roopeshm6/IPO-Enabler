using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Data.Entity;
using Test.Models;

namespace Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly IPOEnablerContext _ipoEnablerContext;
        public LoginController(IPOEnablerContext ipoEnablerContext)
        {
            _ipoEnablerContext = ipoEnablerContext;
        }

        [HttpGet]
        public List<Users> Getuser()
        {
            if (_ipoEnablerContext.Users == null)
            {
                throw new Exception("Not found");
            }
            var users = _ipoEnablerContext.Users.ToList();
            if (users == null)
            {
                throw new Exception("Not found");
            }
            return  users;
        }
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetUser")]
        public Users Getuser(Guid id)
        {
            var userID = Convert.ToString(id);
            var user =  _ipoEnablerContext.Users.Where(x => x.Id == userID).FirstOrDefault();
            if(user == null)
            {
                throw new Exception("Not found");
            }
            return user;
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] Users user)
        {
            user.Id = Guid.NewGuid().ToString();
            await _ipoEnablerContext.Users.AddAsync(user);
            await _ipoEnablerContext.SaveChangesAsync();
            return CreatedAtAction(nameof(Getuser), new { user.Id } , user);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateUser([FromRoute] Guid id, [FromBody] Users user)
        {
            try
            {
                var userId = Convert.ToString(id);
                var userDetails = _ipoEnablerContext.Users.Where(x => x.Id == userId).FirstOrDefault();
                if (user == null)
                {
                    throw new Exception("Not found");

                }
                userDetails.Id = user.Id;
                userDetails.Firstname = user.Firstname;
                userDetails.Lastname = user.Lastname;
                userDetails.Email = user.Email;
                await _ipoEnablerContext.SaveChangesAsync();
                return Ok(userDetails);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> RemoveUser([FromRoute] Guid id, [FromBody] Users user)
        {
            try
            {
                var userId = Convert.ToString(id);
                var userDetails = _ipoEnablerContext.Users.Where(x => x.Id == userId).FirstOrDefault();
                if (user == null)
                {
                    throw new Exception("Not found");

                }
                _ipoEnablerContext.Users.Remove(userDetails);
                await _ipoEnablerContext.SaveChangesAsync();
                return Ok(userDetails);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
