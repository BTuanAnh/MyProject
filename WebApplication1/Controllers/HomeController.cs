using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Net;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        SellProductContext db = new SellProductContext();

        [HttpGet]
        public IActionResult Index()
        {
            var products = db.Products
                .OrderByDescending(p => p.ProductId)
                .ToList();

            return View(products);
        }

        [HttpGet]
        public IActionResult Shop()
        {
            var products = db.Products
                .ToList();

            return View(products);
        }

        [HttpGet]
        public IActionResult Checkout()
        {
            var cart = HttpContext.Session.GetObjectFromJson<List<CartItem>>("Cart") ?? new List<CartItem>();

            ViewBag.TotalAmount = cart.Sum(item => item.Price * item.Quantity);
            ViewBag.CartCount = cart.Sum(item => item.Quantity);

            return View(cart);
        }

        [HttpGet]
        public IActionResult Shipping_Address()
        {
            int? userId = HttpContext.Session.GetInt32("UserId");

            var user = db.Users.FirstOrDefault(u => u.UserId == userId);

            return View(user);
        }

        [HttpPost]
        public IActionResult Shipping_Address(User model)
        {
            int? userId = HttpContext.Session.GetInt32("UserId");

            var user = db.Users.FirstOrDefault(u => u.UserId == userId);

            if (user == null)
            {
                return NotFound();
            }

            user.Username = model.Username;
            user.Phone = model.Phone;
            user.Address = model.Address;

            db.Users.Update(user);
            db.SaveChanges();

            return RedirectToAction("Shipping_Address");
        }

        [HttpGet("Product_details/{id}")]
        public IActionResult Product_details(int id)
        {
            var products = db.Products
                .Where(p => p.ProductId == id)
                .Include(p => p.Feedbacks)
                .ThenInclude(f => f.User)
                .ToList();

            if (!products.Any())
            {
                return NotFound();
            }

            return View(products);
        }

        public IActionResult GetVariants(int productId)
        {
            var product = db.Products
                             .Where(v => v.ProductId == productId)
                             .ToList();

            return PartialView("_VariantList", product);
        }


        [HttpGet]

        public IActionResult Introduce()
        {
            return View();
        }

        [HttpGet]

        public IActionResult Register()
        {
            return View();
        }

        [HttpGet]

        public IActionResult Login()
        {
            return View();
        }



        [HttpGet]
        public IActionResult Contact()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Address()
        {
            return View();
        }





        [HttpPost]
        public IActionResult ApplyDiscount(string discountCode)
        {
            var promotion = db.Promotions.FirstOrDefault(p => p.PromotionName == discountCode &&
                                                               p.StartDate <= DateOnly.FromDateTime(DateTime.Now) &&
                                                               p.EndDate >= DateOnly.FromDateTime(DateTime.Now));

            if (promotion == null)
            {
                TempData["ErrorMessage"] = "Mã giảm giá không hợp lệ hoặc đã hết hạn!";
                return RedirectToAction("Checkout");
            }

            HttpContext.Session.SetInt32("DiscountPercentage", (int)promotion.DiscountPercentage);
            TempData["SuccessMessage"] = "Mã giảm giá đã được áp dụng!";
            return RedirectToAction("Checkout");
        }






    }
}
