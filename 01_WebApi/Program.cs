var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseHttpsRedirection();
app.MapGet("/", () =>
{
    return "Api is Working";
});
var products = new List<productDet>()
{
    new productDet("Apple",100),
    new productDet("Bananan",60)
};
app.MapGet("/product", () =>
{
     return products[0].name;
});
app.MapGet("/hello", () =>
{
    // return "Get Method";
    return Results.Content("<h1>Hello Post Method</h1>", "text/html"); // html
});
app.MapPost("/hello", () =>
{
    var response = new { msg = "This is post method", success = true }; // json
    return response;
    // return Results.Ok(response);
    // return "Post Method";
});
app.MapPut("/hello", () =>
{
    return "Put Method";
});
app.MapDelete("/hello", () =>
{
    return "Delete Method";
});
app.Run();
public record productDet(string name, double price);
