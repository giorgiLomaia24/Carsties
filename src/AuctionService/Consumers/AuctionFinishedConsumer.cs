using AuctionService.Data;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    private readonly AuctionDbContext _DbContext;
    public AuctionFinishedConsumer(AuctionDbContext DbContext)
    {
        _DbContext = DbContext;
        
    }
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
         Console.WriteLine("---------->Auction Finished Consumer");
        var auction = await _DbContext.Auctions.FindAsync(context.Message.AuctionId);

        if(context.Message.ItemSold){
            auction.Winner = context.Message.Winner;
            auction.SoldAmount = context.Message.Amount;
        }

        auction.Status = auction.SoldAmount > auction.ReservePrice ? Status.Finished : Status.ReserveNotMet;

        await _DbContext.SaveChangesAsync();
    }
}
