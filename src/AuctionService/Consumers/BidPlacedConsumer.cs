using AuctionService.Data;
using Contracts;
using MassTransit;

namespace AuctionService;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    private readonly AuctionDbContext _DbContext;
    public BidPlacedConsumer(AuctionDbContext DbContext)
    {

        _DbContext = DbContext;
        
    }
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("---------->Bid PLaced Consumer");
        var auction = await _DbContext.Auctions.FindAsync(context.Message.AuctionId);

        if(auction.CurrentHighBid == null || context.Message.BidStatus.Contains("Accepted") && context.Message.Amount > auction.CurrentHighBid)
        {

            auction.CurrentHighBid = context.Message.Amount;

            await _DbContext.SaveChangesAsync();

        }


    }
}
