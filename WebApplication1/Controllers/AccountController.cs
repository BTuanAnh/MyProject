using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class AccountController : Controller
    {
        private readonly SellProductContext db = new SellProductContext();

        [HttpPost]
        public IActionResult Edit(User model)
        {
            int? userId = HttpContext.Session.GetInt32("UserId");

            if (userId == null)
            {
                return RedirectToAction("Login");
            }

            var user = db.Users.FirstOrDefault(u => u.UserId == userId);

            if (user == null)
            {
                return NotFound();
            }

            user.Username = model.Username;
            user.Phone = model.Phone;
            user.Address = model.Address;
            user.Email = model.Email;

            db.Users.Update(user);
            db.SaveChanges();

            return RedirectToAction("Individual", "Home");
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View("~/Views/Home/Login.cshtml");
        }

        [HttpPost]
        public IActionResult TryLogin(string username, string password)
        {
            var user = db.Users.FirstOrDefault(u => u.Username == username && u.Password == password);

            if (user != null)
            {
                HttpContext.Session.SetInt32("UserId", user.UserId);
                HttpContext.Session.SetString("Username", username);
                HttpContext.Session.SetString("Role", user.Role); 

                if (user.Role == "Admin" || user.Role == "Support")
                {
                    return RedirectToAction("Index", "Admin", new { area = "Admin" });
                }
                else
                {
                    return RedirectToAction("Index", "Home");
                }
            }

            ViewBag.Error = "Tên đăng nhập hoặc mật khẩu không đúng!";
            return View("~/Views/Home/Login.cshtml");
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View("~/Views/Home/Register.cshtml");
        }

        [HttpPost]
        public IActionResult TryRegister(string username, string email, string phone, string password)
        {
            var existingUser = db.Users.FirstOrDefault(u => u.Username == username || u.Email == email || u.Phone == phone);
            if (existingUser != null)
            {
                ViewBag.Error = "Tên đăng nhập, Email hoặc Số điện thoại đã tồn tại!";
                return View("~/Views/Home/Register.cshtml");
            }
            var newUser = new User
            {
                Username = username,
                Email = email,
                Phone = phone,
                Password = password,
                Role = "Customer"
            };

            db.Users.Add(newUser);
            db.SaveChanges();

            HttpContext.Session.SetInt32("UserId", newUser.UserId);
            HttpContext.Session.SetString("Username", username);
            HttpContext.Session.SetString("Role", "Customer");

            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home");
        }
    }
}
