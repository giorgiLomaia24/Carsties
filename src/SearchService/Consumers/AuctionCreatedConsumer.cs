using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService;

public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
{
    private readonly IMapper _mapper;
    public AuctionCreatedConsumer(IMapper imapper)
    {
        _mapper = imapper;
        
    }
    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        Console.WriteLine(" ---> Auction Created the make of created Auction is:" + " " + context.Message.Make);

        var item = _mapper.Map<Item>(context.Message);

        if (item.Model == "foo") throw new ArgumentException("can not create car with the name of foo");

       await item.SaveAsync();
    }
}
