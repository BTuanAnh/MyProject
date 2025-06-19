namespace WebApplication1.Models;

public class CartItem
{
    public int ProductId { get; set; }
    public string? Title { get; set; }
    public string? Manufacturer { get; set; }
    public int CategoryId { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public string? ImageUrl { get; set; }
    public int? ReleaseYear { get; set; }
}
