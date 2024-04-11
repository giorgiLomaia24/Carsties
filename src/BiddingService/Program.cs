using BiddingService;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MongoDB.Driver;
using MongoDB.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();

builder.Services.AddMassTransit(x => {

    x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();
   
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", host => {
            host.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));
            host.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest"));

        });
        cfg.ConfigureEndpoints(context);
    });

    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("bids", false));
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options => 
{
    options.Authority = builder.Configuration["IdentitiyServiceUrl"];
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters.ValidateAudience = false;
    options.TokenValidationParameters.NameClaimType = "username";

});

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddHostedService<CheckAuctionFInished>();

builder.Services.AddScoped<GrpcAuctionClient>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

await DB.InitAsync("VidDb",MongoClientSettings.FromConnectionString(builder.Configuration.GetConnectionString("BidDbConnection")));

app.Run();

