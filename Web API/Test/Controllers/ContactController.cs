using Microsoft.AspNetCore.Mvc;
using Test.Interfaces;
using Test.Models;
using Test.Repositories;

namespace Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly IEmailSender _emailSender;
        public ContactController(IEmailSender emailSender)
        {
            this._emailSender = emailSender;
        }

        [HttpPost]
        public async Task<IActionResult> SendMail([FromBody] Contact contact)
        {
            try
            {
                EmailSender emailSender = new EmailSender();
                emailSender.SendEmailAsync(contact.EmailAddress, contact.Subject, contact.Message);
                return Ok(contact);
            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }
    }
}
