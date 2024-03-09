using MongoDB.Entities;
using SearchService.Models;

namespace SearchService;

public class AuctionSvcHttpClient
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    public AuctionSvcHttpClient(HttpClient httpClient,IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        
    }


    public async Task<List<Item>> GetItemsFromSearchDb()
    {
        var lastUpdatedAt = await DB.Find<Item, string>()
        .Sort(x => x.Descending(x => x.UpdatedAt))
        .Project(x => x.UpdatedAt.ToString())
        .ExecuteFirstAsync();

        return await _httpClient.GetFromJsonAsync<List<Item>>(_configuration["AuctionServiceUrl"] + "/api/auctions?date=" + lastUpdatedAt);
    }

}
