using System.Net.Sockets;
using Newtonsoft.Json.Linq;
using Assetto_Corsa_Server_Interface_API.Data;

namespace Assetto_Corsa_Server_Interface_API.Services
{
    public interface IIPService
    {
        public Task<string> GetPublicIpAsync();
        public Task<bool> IsPortOpenAsync(int port);
    }
    public class IPService : IIPService
    {
        private readonly string ApiToken;
        private readonly AssettoServerDbContext assettoServerDbContext;
        private readonly string CloudflareDnsRecordUrl; 
        private static readonly HttpClient HttpClient = new HttpClient();

        public IPService(AssettoServerDbContext _assettoServerDbContext)
        {
            assettoServerDbContext = _assettoServerDbContext;
            CloudflareDnsRecordUrl = assettoServerDbContext.PowerSettings.Where(s => s.SettingName == "Cloudflare_DNS_Record_URL").FirstOrDefault().SettingValue;
            ApiToken = assettoServerDbContext.PowerSettings.Where(s => s.SettingName == "CLOUDFLARE_API_TOKEN").FirstOrDefault().SettingValue;
            HttpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", ApiToken);
        }


        public async Task<string> GetPublicIpAsync()
        {
            try
            {
                // Get the Cloudflare DNS record's IP address
                HttpResponseMessage response = await HttpClient.GetAsync(CloudflareDnsRecordUrl);
                response.EnsureSuccessStatusCode();

                string responseContent = await response.Content.ReadAsStringAsync();
                JObject data = JObject.Parse(responseContent);
                string dnsRecordIp = data["result"]["content"]?.ToString();

                return dnsRecordIp ?? "0";
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"Error: Failed to retrieve DNS record: {e.Message}");
                return "0";
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error: {e.Message}");
                return "0";
            }
        }

        public async Task<bool> IsPortOpenAsync(int port)
        {
            try
            {
                string host = await GetPublicIpAsync();

                if (host == "0")
                {
                    return false;
                }

                using (var tcpClient = new TcpClient())
                {
                    // Timeout for the connection attempt 1s
                    var connectTask = tcpClient.ConnectAsync(host, port);
                    bool isConnected = await Task.WhenAny(connectTask, Task.Delay(1000)) == connectTask;

                    if (!isConnected)
                    {
                        return false;
                    }

                    return tcpClient.Connected;
                }
            }
            catch (SocketException)
            {
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error: {e.Message}");
                return false;
            }
        }
    }
}
