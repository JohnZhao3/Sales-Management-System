using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MarsOnBoard1.Models;

namespace MarsOnBoard1.Controllers
{
    public class CustomerController : Controller
    {
        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CustomerList()
        {
            using(var db = new OnboardingEntities())
            {
                var customerList = db.Customers.Select(x => new
                {
                    Id = x.Id,
                    Name = x.Name,
                    Address = x.Address
                }).ToList();
                return Json(customerList, JsonRequestBehavior.AllowGet);
            }
        }      

        public ActionResult AddCustomer(Customer customer)
        {
            using(var db = new OnboardingEntities())
            {
                db.Customers.Add(customer);
                db.SaveChanges();
                return this.Json(customer);
            }
        }

        public ActionResult EditCustomer(Customer customer)
        {
            using(var db = new OnboardingEntities())
            {
                var editCustomer = db.Customers.SingleOrDefault(x => x.Id == customer.Id);
                editCustomer.Name = customer.Name;
                editCustomer.Address = customer.Address;
                try
                {

                    db.SaveChanges();
                    return Json(new { success = true });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false });
                }
            }
        }

        public ActionResult DeleteCustomer(int Id)
        {
            using (var db = new OnboardingEntities())
            {
                var delete = db.Customers.Find(Id);
                db.Customers.Remove(delete);
                db.SaveChanges();
                return Json(new { success = true });
            }
        }

        public ActionResult Example()
        {
            return View();
        }
    }
}