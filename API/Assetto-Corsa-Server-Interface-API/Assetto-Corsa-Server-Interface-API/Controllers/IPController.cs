using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Assetto_Corsa_Server_Interface_API.Services;

namespace Assetto_Corsa_Server_Interface_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IPController : Controller
    {
        private readonly IIPService ipService;
        public IPController(IIPService _ipService) {
            ipService = _ipService;
        }

        [HttpGet]
        [Route("GetPublicIP")]
        public async Task<IActionResult> GetPublicIP()
        {
            var temp = await ipService.GetPublicIpAsync();
            return Ok(temp);
        }

        [HttpGet]
        [Route("IsPortOpen")]
        public async Task<IActionResult> IsPortOpen(int port)
        {
            var temp = await ipService.IsPortOpenAsync(port);
            return Ok(temp);
        }
    }
}
