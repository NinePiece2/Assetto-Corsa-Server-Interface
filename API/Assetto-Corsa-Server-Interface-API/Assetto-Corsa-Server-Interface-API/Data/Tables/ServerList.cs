namespace Assetto_Corsa_Server_Interface_API.Data.Tables
{
    public class ServerList
    {
        public int UID { get; set; }
        public string? Name { get; set; }
        public string? Map { get; set; }
        public string? LocalIP { get; set; }
        public string? HttpPort { get; set; }
        public bool? IsActive { get; set; }
    }
}
