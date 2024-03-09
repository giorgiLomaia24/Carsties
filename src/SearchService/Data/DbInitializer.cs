using System.Text.Json;
using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Data;

public class DbInitializer
{
    public static object PropertyNameCaseInsensitive { get; private set; }

    public static async Task InitDb(WebApplication app)
    {
        await DB.InitAsync("SearchDb", MongoClientSettings
       .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));

         await DB.Index<Item>()
        .Key(x => x.Make, KeyType.Text)
        .Key(x => x.Model, KeyType.Text)
        .Key(x => x.Color, KeyType.Text)
        .Key(x => x.Year, KeyType.Text)
        .CreateAsync();

        var count = await DB.CountAsync<Item>();

        using var scope = app.Services.CreateScope();

        var httpClient = scope.ServiceProvider.GetRequiredService<AuctionSvcHttpClient>();

        var items = await httpClient.GetItemsFromSearchDb();

        Console.WriteLine(items.Count + "retured data from auction service");

        if (items.Count > 0) await DB.SaveAsync(items);
    }   

}
