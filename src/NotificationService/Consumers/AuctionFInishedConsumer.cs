using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace NotificationService;

public class AuctionFInishedConsumer : IConsumer<AuctionFinished>
{
    private readonly IHubContext<NotificationHub> _hubContext;
    public AuctionFInishedConsumer(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
        
    }
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        Console.WriteLine("Consuming auction finished message from signalr");

        await _hubContext.Clients.All.SendAsync("AuctionFinished", context.Message);
    }
}
