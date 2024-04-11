using AutoMapper;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;

namespace BiddingService;

[ApiController]
[Route("api/[controller]")]
public class BidsController : ControllerBase
{

    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;

    private readonly GrpcAuctionClient _grpcClient;

    public BidsController(IMapper mapper, IPublishEndpoint publishEndpoint, GrpcAuctionClient grpcClient)
    {

        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
        _grpcClient = grpcClient;
        
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BidDto>> PlaceBid (string auctionId, int amount )
    {

        var auction = await DB.Find<Auction>().OneAsync(auctionId);

        if(auction == null){
            auction = _grpcClient.GetAuction(auctionId);
            if (auction == null) return BadRequest("Can not accept bids on this auction at the moment");
        }

        if(auction.Seller == User.Identity.Name)
        {
            return BadRequest("You can't bid on your own auction");
        }

        var bid = new Bid
        {
            Amount = amount,
            AuctionId = auctionId,
            Bidder = User.Identity.Name
        };

        if (auction.AuctionEnd < DateTime.UtcNow)
        {
            bid.bidStatus = BidStatus.Finished;
        }
        else
        {
            
        var highBid = await DB.Find<Bid>()
        .Match(a => a.AuctionId == auctionId)
        .Sort(b => b.Descending(x => x.Amount))
        .ExecuteFirstAsync();


        if(highBid != null && amount > highBid.Amount || highBid == null)
        {
            bid.bidStatus = amount > auction.ReservePrice ? BidStatus.Accepted : BidStatus.AcceptedBelowReserve;
        }

        if( highBid != null && bid.Amount <= highBid.Amount)
        {
            bid.bidStatus = BidStatus.TooLow;
        }

        }


        await DB.SaveAsync(bid);
        await _publishEndpoint.Publish(_mapper.Map<BidPlaced>(bid));

        return Ok(_mapper.Map<BidDto>(bid));

    }


    

 [HttpGet("{auctionId}")]
    public async Task<ActionResult<List<BidDto>>> GetBid(string auctionId)
    {
        var bids = await DB.Find<Bid>()
        .Match(a => a.AuctionId == auctionId)
        .Sort(b => b.Descending(a => a.BidTime))
        .ExecuteAsync();

        return bids.Select(_mapper.Map<BidDto>).ToList();
    }





}
