using Assetto_Corsa_Server_Interface_API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Assetto_Corsa_Server_Interface_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServerController : ControllerBase
    {
        private readonly AssettoServerDbContext _assettoServerDbContext;
        public ServerController(AssettoServerDbContext assettoServerDbContext) { 
            _assettoServerDbContext = assettoServerDbContext;
        }

        [HttpGet]
        [Route("GetServerList")]
        public IActionResult GetServerList()
        {
            var serverList = _assettoServerDbContext.ServerList.ToList();
            return Ok(serverList);
        }
    }
}
