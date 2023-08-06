using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.Swagger;
using Test.Models;
using Test.Repositories;

namespace Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersRoleController : Controller
    {
        private readonly IPOEnablerContext _ipoEnablerContext;
        public UsersRoleController(IPOEnablerContext ipoEnablerContext)
        {
            _ipoEnablerContext = ipoEnablerContext;
        }
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] UserRole userRole)
        {
            try
            {
                userRole.UserRoleId = Guid.NewGuid().ToString();
                Users user = new Users();
                user.Id = Guid.NewGuid().ToString();
                userRole.UserId = user.Id;
                user.Firstname = userRole.Firstname;
                user.Lastname = userRole.Lastname;
                user.Email = userRole.Email;
                userRole.RoleId = "A5A6D623-B0B9-42BE-ACC9-AD8B439AE8C9";
                userRole.CreatedOn = DateTime.Now;
                userRole.LastModifiedOn = DateTime.Now;
                var firstname = _ipoEnablerContext.Users.Where(x => x.Id == userRole.CreatedBy).FirstOrDefault().Firstname;
                var lastname = _ipoEnablerContext.Users.Where(x => x.Id == userRole.CreatedBy).FirstOrDefault().Lastname;
                userRole.CreatedBy = firstname + " " + lastname;
                userRole.LastModifiedBy = firstname + " " + lastname;
                userRole.UserStatus = 1;
                _ipoEnablerContext.Users.Add(user);
                _ipoEnablerContext.SaveChanges();
                _ipoEnablerContext.UserRole.Add(userRole);
                _ipoEnablerContext.SaveChanges();
                EmailSender emailSender = new EmailSender();
                emailSender.SendEmailAsync(user.Email, "Admin has provided you the access", "Admin has provided you the access");
                return Ok(userRole);
            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetUser")]
        public UserRole Getuser(Guid id)
        {
            var userID = Convert.ToString(id);
            var user = _ipoEnablerContext.UserRole.Where(x => x.UserId == userID).FirstOrDefault();
            if (user == null)
            {
                throw new Exception("Not found");
            }
            return user;
        }
        [HttpDelete]
        [Route("{id:guid}")]
        [ActionName("GetUser")]
        public void DeleteUser(Guid id)
        {
            var userID = Convert.ToString(id);
            var userProject = _ipoEnablerContext.Project.Where(x=>x.UserId == userID).ToList();
            if(userProject.Count() > 0)
            {
                foreach(var project in userProject)
                {
                    _ipoEnablerContext.Project.Remove(project);
                    _ipoEnablerContext.SaveChanges();
                }
                var userRoles = _ipoEnablerContext.UserRole.Where( x=> x.UserId == userID).ToList();
                if(userRoles.Count() > 0)
                {
                    var user = _ipoEnablerContext.Users.Where( c => c.Id == userID ).FirstOrDefault();
                    foreach (var userRole in userRoles)
                    {
                        _ipoEnablerContext.UserRole.Remove(userRole);
                        _ipoEnablerContext.SaveChanges();
                    }
                    if(user!=null)
                    {
                        _ipoEnablerContext.Users.Remove(user);
                        _ipoEnablerContext.SaveChanges();
                    }
                    else if(user == null)
                    {
                        throw new Exception("Unable to find the user you want to delete");
                    }
                }
                else if(userRoles.Count() ==0)
                {
                    var user = _ipoEnablerContext.Users.Where(c => c.Id == userID).FirstOrDefault();
                    if (user != null)
                    {
                        _ipoEnablerContext.Users.Remove(user);
                        _ipoEnablerContext.SaveChanges();
                    }
                    else if (user == null)
                    {
                        throw new Exception("Unable to find the user you want to delete");
                    }
                }
            }
            else if(userProject.Count == 0)
            {
                var userRoles = _ipoEnablerContext.UserRole.Where(x => x.UserId == userID).ToList();
                if (userRoles.Count() > 0)
                {
                    var user = _ipoEnablerContext.Users.Where(c => c.Id == userID).FirstOrDefault();
                    foreach (var userRole in userRoles)
                    {
                        _ipoEnablerContext.UserRole.Remove(userRole);
                        _ipoEnablerContext.SaveChanges();
                    }
                    if (user != null)
                    {
                        _ipoEnablerContext.Users.Remove(user);
                        _ipoEnablerContext.SaveChanges();
                    }
                    else if (user == null)
                    {
                        throw new Exception("Unable to find the user you want to delete");
                    }
                }
                else if (userRoles.Count() == 0)
                {
                    var user = _ipoEnablerContext.Users.Where(c => c.Id == userID).FirstOrDefault();
                    if (user != null)
                    {
                        _ipoEnablerContext.Users.Remove(user);
                        _ipoEnablerContext.SaveChanges();
                    }
                    else if (user == null)
                    {
                        throw new Exception("Unable to find the user you want to delete");
                    }
                }

            }
        }
    }
}
