using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService;

public class AuctionDeletedConsumer : IConsumer<AuctionDteleted>
{
    public async Task Consume(ConsumeContext<AuctionDteleted> context)
    {
        Console.WriteLine("--------> Consuming Auction deleted Consumer" + context.Message.Id);

        var result = await DB.DeleteAsync<Item>(context.Message.Id);

        if(!result.IsAcknowledged){
            throw new MessageException(typeof(AuctionDteleted), "Problem Deleting Auction");
        }

    }
}
