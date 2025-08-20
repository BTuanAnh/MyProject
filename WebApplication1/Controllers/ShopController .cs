using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using WebApplication1.Models;


namespace WebApplication1.Controllers
{
    public class ShopController : Controller
    {
        SellProductContext db = new SellProductContext();

        [HttpPost]
        public IActionResult AddToCart(int productId, int quantity)
        {
            if (quantity < 1) quantity = 1;

            var cart = HttpContext.Session.GetObjectFromJson<List<CartItem>>("Cart") ?? new List<CartItem>();
            var product = db.Products.FirstOrDefault(b => b.ProductId == productId);

            if (product == null)
            {
                return Json(new { success = false, message = "Sản phẩm không tồn tại." });
            }

            var cartItem = cart.FirstOrDefault(c => c.ProductId == productId);
            if (cartItem != null)
            {
                cartItem.Quantity += quantity;
            }
            else
            {
                cart.Add(new CartItem
                {
                    ProductId = product.ProductId,
                    Title = product.Title,
                    Manufacturer = product.Manufacturer,
                    CategoryId = product.CategoryId,
                    Price = product.Price,
                    Quantity = quantity, 
                    ImageUrl = product.ImageUrl,
                    ReleaseYear = product.ReleaseYear
                });
            }

            HttpContext.Session.SetObjectAsJson("Cart", cart);
            return Json(new { success = true, cartCount = cart.Sum(c => c.Quantity) });
        }

        [HttpPost]
        public IActionResult UpdateQuantity(int productId, int quantity)
        {
            if (quantity < 1) quantity = 1;
            if (quantity > 100) quantity = 100;

            var cart = HttpContext.Session.GetObjectFromJson<List<CartItem>>("Cart") ?? new List<CartItem>();

            if (!cart.Any())
            {
                return Json(new { success = false, message = "Giỏ hàng của bạn đang trống." });
            }

            var cartItem = cart.FirstOrDefault(c => c.ProductId == productId);
            if (cartItem == null)
            {
                return Json(new { success = false, message = "Sản phẩm không tồn tại trong giỏ hàng." });
            }

            cartItem.Quantity = quantity;

            HttpContext.Session.SetObjectAsJson("Cart", cart);

            return Json(new { success = true, cartCount = cart.Sum(c => c.Quantity), updatedQuantity = cartItem.Quantity });
        }

        [HttpGet]
        public IActionResult Remove(int productId)
        {
            var cart = HttpContext.Session.GetObjectFromJson<List<CartItem>>("Cart");
            if (cart != null)
            {
                var itemToRemove = cart.FirstOrDefault(x => x.ProductId == productId);
                if (itemToRemove != null)
                {
                    cart.Remove(itemToRemove);
                    HttpContext.Session.SetObjectAsJson("Cart", cart);
                }
            }

            return RedirectToAction("Checkout", "Home");
        }

        [HttpPost]
        public IActionResult CheckoutProcess(string PaymentMethod)
        {
            var role = HttpContext.Session.GetString("Role");
            var userId = HttpContext.Session.GetInt32("UserId");

            if (!userId.HasValue || string.IsNullOrEmpty(role) || role != "Customer")
            {
                return RedirectToAction("Checkout", "Home");
            }

            var cartItems = HttpContext.Session.GetObjectFromJson<List<CartItem>>("Cart");
            if (cartItems == null || !cartItems.Any())
            {
                return RedirectToAction("Checkout", "Home");
            }

            decimal totalAmount = cartItems.Sum(c => c.Price * c.Quantity);
            int discountPercentage = HttpContext.Session.GetInt32("DiscountPercentage") ?? 0;
            decimal discountAmount = totalAmount * discountPercentage / 100;
            totalAmount -= discountAmount;

            var order = new Order
            {
                UserId = userId.Value,
                OrderDate = DateTime.Now,
                TotalAmount = totalAmount,
                Status = "Processing",
                PaymentMethod = PaymentMethod
            };
            db.Orders.Add(order);
            db.SaveChanges();

            foreach (var item in cartItems)
            {
                var product = db.Products.FirstOrDefault(p => p.ProductId == item.ProductId);
                if (product != null)
                {
                    product.Quantity -= item.Quantity;
                    db.Products.Update(product);
                }

                var orderDetail = new OrderDetail
                {
                    OrderId = order.OrderId,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = item.Price
                };
                db.OrderDetails.Add(orderDetail);
            }
            db.SaveChanges();

            var userCartItems = db.Carts.Where(c => c.UserId == userId.Value).ToList();
            db.Carts.RemoveRange(userCartItems);
            db.SaveChanges();
            HttpContext.Session.Remove("Cart");
            HttpContext.Session.Remove("DiscountPercentage");

            TempData["SuccessMessage"] = "Đặt đơn hàng thành công!";
            return RedirectToAction("Checkout", "Home");
        }

        [HttpPost]
        public IActionResult CheckoutShippingAddress()
        {
            var role = HttpContext.Session.GetString("Role");
            var userId = HttpContext.Session.GetInt32("UserId");

            if (!userId.HasValue || string.IsNullOrEmpty(role) || role != "Customer")
            {
                TempData["ErrorMessage"] = "Bạn cần đăng nhập với tài khoản để thanh toán!";
                return RedirectToAction("Checkout", "Home");
            }

            var cartItems = HttpContext.Session.GetObjectFromJson<List<CartItem>>("Cart");

            if (cartItems == null || !cartItems.Any())
            {
                TempData["ErrorMessage"] = "Giỏ hàng của bạn đang trống. Không có sản phẩm để thanh toán!";
                return RedirectToAction("Checkout", "Home");
            }

            var productIds = cartItems.Select(c => c.ProductId).ToList();
            var product = db.Products
                .Where(v => productIds.Contains(v.ProductId))
                .ToDictionary(v => v.ProductId);

            foreach (var item in cartItems)
            {
                if (!product.TryGetValue(item.ProductId, out var variant) || variant.Quantity < item.Quantity)
                {
                    TempData["ErrorMessage"] = $"Sản phẩm '{variant?.Title ?? "Không xác định"}' không đủ số lượng. Chỉ còn {variant?.Quantity ?? 0} sản phẩm trong kho!";
                    return RedirectToAction("Checkout", "Home");
                }
            }

            foreach (var item in cartItems)
            {
                var cart = new Cart
                {
                    UserId = userId.Value,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity
                };
                db.Carts.Add(cart);

            }

            db.SaveChanges();

            return RedirectToAction("Shipping_Address", "Home");
        }

    }
}
