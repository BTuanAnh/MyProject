using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using WebApplication1.Models;

namespace WebApplication1.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class AdminController : Controller
    {
        SellProductContext db = new SellProductContext();
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Products()
        {
            var categories = db.Categories.ToList();
            ViewBag.Categories = categories;
            return View(db.Products.ToList());
        }

        [HttpPost]
        public IActionResult Delete_Product(int id)
        {
            var product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Products.Remove(product);
            db.SaveChanges();
            return RedirectToAction("Products");
        }

        [HttpGet]
        public IActionResult SaveProduct(int? id)
        {
            ViewBag.Categories = db.Categories.ToList();
            if (id == null) return View(new Product());

            var product = db.Products.Find(id);
            return product == null ? NotFound() : View(product);
        }

        [HttpPost]
        public async Task<IActionResult> SaveProduct(Product model, IFormFile ImageFile)
        {
            if (model.ProductId == 0)
            {
                if (ImageFile != null)
                {
                    string imagePath = Path.Combine("wwwroot/images", ImageFile.FileName);
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        await ImageFile.CopyToAsync(stream);
                    }
                    model.ImageUrl = "/images/" + ImageFile.FileName;
                }

                db.Products.Add(model);
            }
            else
            {
                var existingProduct = await db.Products.FindAsync(model.ProductId);
                if (existingProduct == null) return NotFound();

                existingProduct.Title = model.Title;
                existingProduct.Description = model.Description;
                existingProduct.Price = model.Price;
                existingProduct.CategoryId = model.CategoryId;

                if (ImageFile != null)
                {
                    string imagePath = Path.Combine("wwwroot/images", ImageFile.FileName);
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        await ImageFile.CopyToAsync(stream);
                    }
                    existingProduct.ImageUrl = "/images/" + ImageFile.FileName;
                }

                db.Products.Update(existingProduct);
            }

            await db.SaveChangesAsync();
            return RedirectToAction("Products");
        }

        // Hiển thị danh sách danh mục 
        [HttpGet]
        public IActionResult Categories()
        {
            var lstDanhMuc = db.Categories.ToList();
            return View(lstDanhMuc);
        }

        [HttpPost]
        public IActionResult Delete_Category(int id)
        {
            var lstDanhMuc = db.Categories.Find(id);
            if (lstDanhMuc == null)
            {
                return NotFound();
            }

            db.Categories.Remove(lstDanhMuc);
            db.SaveChanges();
            return RedirectToAction("Categories");
        }

        [HttpGet]
        public IActionResult SaveCategory(int? id)
        {
            if (id == null)
            {
                return View(new Category());
            }

            var lstDanhMuc = db.Categories.Find(id);
            if (lstDanhMuc == null) return NotFound();

            return View(lstDanhMuc);
        }

        [HttpPost]
        public async Task<IActionResult> SaveCategory(Category model)
        {
            if (model.CategoryId == 0)
            {
                db.Categories.Add(model);
            }
            else
            {
                var existingCategory = await db.Categories.FindAsync(model.CategoryId);
                if (existingCategory == null) return NotFound();

                existingCategory.CategoryName = model.CategoryName;
                existingCategory.ParentCategoryId = model.ParentCategoryId;

                db.Categories.Update(existingCategory);
            }

            await db.SaveChangesAsync();
            return RedirectToAction("Categories");
        }

        // Hiển thị danh sách tài khoản
        [HttpGet]
        public IActionResult Users()
        {
            var users = db.Users.ToList();
            return View(users);
        }

        [HttpPost]
        public IActionResult Delete_User(int id)
        {
            var users = db.Users.Find(id);
            if (users == null)
            {
                return NotFound();
            }

            db.Users.Remove(users);
            db.SaveChanges();
            return RedirectToAction("Users");
        }

        [HttpGet]
        public IActionResult SaveUser(int? id)
        {
            if (id == null)
            {
                return View(new User());
            }
            var user = db.Users.Find(id);
            if (user == null) return NotFound();
            return View(user);
        }

        [HttpPost]
        public async Task<IActionResult> SaveUser(User model)
        {
            if (model.UserId == 0)
            {
                db.Users.Add(model);
            }
            else
            {
                var existingUser = await db.Users.FindAsync(model.UserId);
                if (existingUser == null) return NotFound();

                existingUser.Username = model.Username;
                existingUser.Email = model.Email;
                existingUser.Role = model.Role;
                existingUser.Phone = model.Phone;
                existingUser.Address = model.Address;

                if (!string.IsNullOrEmpty(model.Password))
                {
                    existingUser.Password = model.Password;
                }

                db.Users.Update(existingUser);
            }

            await db.SaveChangesAsync();
            return RedirectToAction("Users");
        }

        // Hiển thị danh sách khuyễn mãi
        [HttpGet]
        public IActionResult Promotions()
        {
            var promotion = db.Promotions.ToList();
            return View(promotion);
        }

        [HttpPost]
        public IActionResult Delete_Promotion(int id)
        {
            var promotion = db.Promotions.Find(id);
            if (promotion == null)
            {
                return NotFound();
            }

            db.Promotions.Remove(promotion);
            db.SaveChanges();
            return RedirectToAction("Promotions");
        }

        [HttpGet]
        public IActionResult SavePromotion(int? id)
        {
            if (id == null)
            {
                return View(new Promotion());
            }
            var promotion = db.Promotions.Find(id);
            if (promotion == null) return NotFound();
            return View(promotion);
        }

        [HttpPost]
        public async Task<IActionResult> SavePromotion(Promotion model)
        {
            if (model.PromotionId == 0)
            {
                db.Promotions.Add(model);
            }
            else
            {
                var existingPromotion = await db.Promotions.FindAsync(model.PromotionId);
                if (existingPromotion == null) return NotFound();

                existingPromotion.PromotionName = model.PromotionName;
                existingPromotion.DiscountPercentage = model.DiscountPercentage;
                existingPromotion.StartDate = model.StartDate;
                existingPromotion.EndDate = model.EndDate;

                db.Promotions.Update(existingPromotion);
            }

            await db.SaveChangesAsync();
            return RedirectToAction("Promotions");
        }

        // Hiển thị danh sách đơn hàng
        [HttpGet]
        public IActionResult Orders()
        {
            var variants = db.Orders.Include(v => v.User).ToList();
            return View(variants);
        }

        [HttpPost]
        public IActionResult Delete_Order(int id)
        {
            var order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            db.Orders.Remove(order);
            db.SaveChanges();
            return RedirectToAction("Orders");
        }

        [HttpGet]
        public IActionResult SaveOrder(int? id)
        {
            if (id == null)
            {
                return View(new Order());
            }
            var order = db.Orders.Find(id);
            if (order == null) return NotFound();
            return View(order);
        }

        [HttpPost]
        public async Task<IActionResult> SaveOrder(Order model)
        {
            if (model.OrderId == 0)
            {
                db.Orders.Add(model);
            }
            else
            {
                var existingOrder = await db.Orders.FindAsync(model.OrderId);
                if (existingOrder == null) return NotFound();

                existingOrder.UserId = model.UserId;
                existingOrder.OrderDate = model.OrderDate;
                existingOrder.TotalAmount = model.TotalAmount;
                existingOrder.Status = model.Status;
                existingOrder.PaymentMethod = model.PaymentMethod;

                db.Orders.Update(existingOrder);
            }

            await db.SaveChangesAsync();
            return RedirectToAction("Orders");
        }

        // Hiển thị danh sách chi tiết đơn hàng
        [HttpGet]
        public IActionResult OrderDetails()
        {
            ViewBag.Products = db.Products
                .Select(p => new { p.ProductId, p.Title })
                .ToList();

            var orderDetails = db.OrderDetails
                .Include(od => od.Product)
                .ToList();

            return View(orderDetails);
        }

        [HttpPost]
        public IActionResult Delete_OrderDetail(int orderId, int variantId)
        {
            var orderDetail = db.OrderDetails.FirstOrDefault(od => od.OrderId == orderId && od.ProductId == variantId);
            if (orderDetail == null)
            {
                return NotFound();
            }

            db.OrderDetails.Remove(orderDetail);
            db.SaveChanges();
            return RedirectToAction("OrderDetails");
        }

        [HttpGet]
        public IActionResult SaveOrderDetail(int? orderId, int? ProductId)
        {
            ViewBag.Products = db.Products.ToList();

            if (orderId == null || ProductId == null)
            {
                return View(new OrderDetail());
            }

            var orderDetail = db.OrderDetails
                .Include(od => od.Product)
                .FirstOrDefault(od => od.OrderId == orderId && od.ProductId == ProductId);

            if (orderDetail == null) return NotFound();

            return View(orderDetail);
        }

        [HttpGet]
        public IActionResult AppliedPromotions(DateOnly? fromDate = null, DateOnly? toDate = null)
        {
            if (fromDate == null || toDate == null)
            {
                fromDate = DateOnly.FromDateTime(new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1));
                toDate = DateOnly.FromDateTime(DateTime.Today);
            }
            else
            {
                DateTime startDateTime = fromDate.Value.ToDateTime(new TimeOnly(0, 0));
                DateTime endDateTime = toDate.Value.ToDateTime(new TimeOnly(23, 59, 59));

                var deliveredOrders = db.Orders
                    .Where(o => o.Status == "Delivered" && o.OrderDate >= startDateTime && o.OrderDate <= endDateTime)
                    .Include(o => o.OrderDetails)
                        .ThenInclude(od => od.Product)
                    .ToList();

                if (deliveredOrders.Any())
                {
                    decimal totalRevenue = deliveredOrders
                        .SelectMany(o => o.OrderDetails)
                        .Sum(od => od.Quantity * od.UnitPrice);

                    int totalOrders = deliveredOrders.Count;

                    int? bestSellingProductId = deliveredOrders
                        .SelectMany(o => o.OrderDetails)
                        .GroupBy(od => od.Product.ProductId)
                        .OrderByDescending(g => g.Sum(od => od.Quantity))
                        .Select(g => g.Key)
                        .FirstOrDefault();

                    var existingReport = db.Reports.FirstOrDefault(r => r.ReportDate == fromDate.Value);

                    if (existingReport == null && fromDate != null && toDate != null)
                    {
                        var report = new Report
                        {
                            ReportDate = fromDate.Value,
                            TotalRevenue = totalRevenue,
                            TotalOrders = totalOrders,
                            BestSellingProductId = bestSellingProductId
                        };

                        db.Reports.Add(report);
                        db.SaveChanges();
                    }
                }
            }
            var reports = db.Reports
                .Where(r => (!fromDate.HasValue || r.ReportDate >= fromDate.Value)
                         && (!toDate.HasValue || r.ReportDate <= toDate.Value))
                .OrderByDescending(r => r.ReportDate)
                .ToList();
            return View(reports);
        }

        [HttpPost]
        public IActionResult Delete_AppliedPromotion(int id)
        {
            var report = db.Reports.Find(id);
            if (report == null)
            {
                return NotFound();
            }

            db.Reports.Remove(report);
            db.SaveChanges();

            return RedirectToAction("Bcdt");
        }



    }
}
