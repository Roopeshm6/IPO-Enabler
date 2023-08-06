using Microsoft.AspNetCore.Mvc;
using Test.Models;



namespace Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {

        private readonly IPOEnablerContext _ipoEnablerContext;
        public ProjectController(IPOEnablerContext ipoEnablerContext)
        {
            _ipoEnablerContext = ipoEnablerContext;
        }
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] Project project)
        {
            try
            {
                project.Id = Guid.NewGuid().ToString();
                await _ipoEnablerContext.Project.AddAsync(project);
                await _ipoEnablerContext.SaveChangesAsync();
                return Ok(project);
            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }
        [HttpGet]
        public List<Project> GetProject()
        {
            if (_ipoEnablerContext.Project== null)
            {
                throw new Exception("Not found");
            }
            var projects = _ipoEnablerContext.Project.ToList();
            if (projects == null)
            {
                throw new Exception("Not found");
            }
            return projects;
        }
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetProjectbyProjectId")]
        public Project GetProjectbyProjectId(Guid id)
        {
            var projectId = Convert.ToString(id);
            if (projectId == null)
            {
                throw new Exception("Not found");
            }
            var projects = _ipoEnablerContext.Project.Where(x => x.Id == projectId).FirstOrDefault();
            if (projects == null)
            {
                throw new Exception("Not found");
            }
            return projects;
        }

        [HttpDelete]
        [Route("{id:guid}")]
        [ActionName("GetUser")]
        public IActionResult DeleteuserProject(Guid id)
        {
            try
            {
                var projectId = Convert.ToString(id);
                var project = _ipoEnablerContext.Project.Where(x => x.Id == projectId).FirstOrDefault();
                if (project == null)
                {
                    throw new Exception("Unable to find the Project");
                }
                _ipoEnablerContext.Project.Remove(project);
                _ipoEnablerContext.SaveChanges();
                return Ok("Project Deleted Successfully");
            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }
    }
}
