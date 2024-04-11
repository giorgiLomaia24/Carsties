

using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService;

public class CheckAuctionFInished : BackgroundService
{
    private readonly ILogger<CheckAuctionFInished> _logger;
    private readonly IServiceProvider _service;
    public CheckAuctionFInished(ILogger<CheckAuctionFInished> logger, IServiceProvider service)
    {
        _logger = logger;
        _service = service;
        
    }
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Starting check for finished auctions");

        stoppingToken.Register(() => _logger.LogInformation(" ==> Checking finished auctions is ending"));

        while(!stoppingToken.IsCancellationRequested)
        {

            await CheckAuctions(stoppingToken);

            await Task.Delay(5000,stoppingToken);


        }
        
    }

    private async Task CheckAuctions(CancellationToken stoppingToken)
    {
        var finishedAuctions = await DB.Find<Auction>()
        .Match(x => x.AuctionEnd <= DateTime.UtcNow)
        .Match(x => !x.Finished)
        .ExecuteAsync(stoppingToken);

        if (finishedAuctions.Count == 0) return;

        _logger.LogInformation("==> Found {Count} auctions that have completed", finishedAuctions.Count);

        using var scope = _service.CreateScope();
        var endpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();

        foreach (var auction in finishedAuctions)
        {
            auction.Finished = true;
            await auction.SaveAsync(null, stoppingToken);

            var winningBid = await DB.Find<Bid>()
            .Match(a => a.AuctionId == auction.ID)
            .Match(b => b.bidStatus == BidStatus.Accepted)
            .Sort(x => x.Descending(s => s.Amount))
            .ExecuteFirstAsync(stoppingToken);


            await endpoint.Publish(new AuctionFinished
            {
   
                ItemSold = winningBid != null,
                AuctionId = auction.ID,
                Winner =  winningBid?.Bidder,
                Amount = winningBid?.Amount,
                Seller = auction.Seller


            }, stoppingToken);

            
            
        }
    }
}
