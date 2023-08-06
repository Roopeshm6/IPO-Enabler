using Microsoft.AspNetCore.Mvc;
using Test.Models;

namespace Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : Controller
    {
        private readonly IPOEnablerContext _ipoEnablerContext;
        public ProjectsController(IPOEnablerContext ipoEnablerContext)
        {
            _ipoEnablerContext = ipoEnablerContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProjects()
        {
            if (_ipoEnablerContext.Projects == null)
            {
                throw new Exception("Not found");
            }
            var scenarios = _ipoEnablerContext.Projects.ToList();
            if (scenarios == null)
            {
                throw new Exception("Not found");
            }
            return Ok(scenarios);
        }
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetUser")]
        public List<Project> GetUserProjects(Guid id)
        {
            var userID = Convert.ToString(id);
            if (userID == null)
            {
                throw new Exception("Not found");
            }
            var projects = _ipoEnablerContext.Project.Where(x=>x.UserId == userID).ToList();
            if (projects == null)
            {
                throw new Exception("Not found");
            }
            return projects;
        }
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] Project project)
        {
            try
            {
                var mainProject = _ipoEnablerContext.Projects.Where(x => x.Id == project.ProjectId).FirstOrDefault();
                Projects mainProjects = new Projects();
                if (mainProject == null)
                {
                    project.Id = Guid.NewGuid().ToString();
                    project.CreatedBy = _ipoEnablerContext.UserRole.Where(x => x.UserId == project.CreatedBy).FirstOrDefault().UserName;
                    project.LastModifiedBy = _ipoEnablerContext.UserRole.Where(x => x.UserId == project.LastModifiedBy).FirstOrDefault().UserName;
                    project.CreatedOn = DateTime.Now;
                    project.LastModifiedOn = DateTime.Now;
                    var projects = _ipoEnablerContext.Projects.ToList();
                    var count = projects.Count();
                    if (count == 0)
                    {
                        mainProjects.Id = 1;
                    }
                    else
                    {
                        mainProjects.Id = projects[count - 1].Id + 1;
                    }
                    project.ProjectId = mainProjects.Id;
                    mainProjects.ProjectName = project.ProjectName;
                    mainProjects.CreatedBy = project.CreatedBy;
                    mainProjects.LastModifiedBy = project.LastModifiedBy;
                    mainProjects.CreatedOn = DateTime.Now;
                    mainProjects.LastModifiedOn = DateTime.Now;
                    await _ipoEnablerContext.Projects.AddAsync(mainProjects);
                    await _ipoEnablerContext.SaveChangesAsync();
                    await _ipoEnablerContext.Project.AddAsync(project);
                    await _ipoEnablerContext.SaveChangesAsync();
                }
                if(mainProject!= null)
                {
                    project.Id = Guid.NewGuid().ToString();
                    project.CreatedBy = _ipoEnablerContext.UserRole.Where(x => x.UserId == project.CreatedBy).FirstOrDefault().UserName;
                    project.LastModifiedBy = _ipoEnablerContext.UserRole.Where(x => x.UserId == project.LastModifiedBy).FirstOrDefault().UserName;
                    project.CreatedOn = DateTime.Now;
                    project.LastModifiedOn = DateTime.Now;
                    await _ipoEnablerContext.Project.AddAsync(project);
                    await _ipoEnablerContext.SaveChangesAsync();
                }
                return Ok(mainProject);
            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }
    }
}
