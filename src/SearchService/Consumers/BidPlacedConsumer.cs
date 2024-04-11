using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
  public async Task Consume(ConsumeContext<BidPlaced> context)
{
    Console.WriteLine("--------> Consuming bid placed");

    var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId);

    if (auction != null && context.Message.BidStatus != null )
    {
        if (context.Message.BidStatus.Contains("Accepted") && context.Message.Amount > auction.CurrentHighBid)
        {
            auction.CurrentHighBid = context.Message.Amount;
            await auction.SaveAsync();
        }
    }
    else
    {
        // Handle the case where auction or its properties are null
        Console.WriteLine("Auction or its properties are null");
    }
}

}
