using Microsoft.EntityFrameworkCore;
using WebApi.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<EmployeeContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("CRUD")));
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddCors();
builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    // app.UseSwagger();
    // app.UseSwaggerUI();
}
app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
app.MapGet("/", () =>
{
    return "Hello Siam";
});
app.MapControllers();
app.Run();
