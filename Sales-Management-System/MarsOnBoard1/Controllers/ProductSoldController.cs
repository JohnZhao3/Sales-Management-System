using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MarsOnBoard1.Models;

namespace MarsOnBoard1.Controllers
{
    public class ProductSoldController : Controller
    {
        // GET: ProductSold
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ProductSoldList()
        {
            using (var db = new OnboardingEntities())
            {
                var productSoldList = db.ProductSolds.Select(x => new
                {
                    Id = x.Id,
                    CustomerId = x.Customer.Id,
                    CustomerName = x.Customer.Name,
                    StoreId = x.Store.Id,
                    StoreName = x.Store.Name,
                    ProductId = x.Product.Id,
                    ProductName = x.Product.Name,
                    DateSold = x.DateSold.Day + "-" + x.DateSold.Month + "-" + x.DateSold.Year
                }).ToList();
                return Json(productSoldList, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult AddProductSold(ProductSold productSold)
        {
            using (var db = new OnboardingEntities())
            {
                var proSold = new ProductSold
                {
                    CustomerId = productSold.CustomerId,
                    ProductId = productSold.ProductId,
                    StoreId = productSold.StoreId,
                    DateSold = productSold.DateSold,
                };
                db.ProductSolds.Add(proSold);
                db.SaveChanges();
                return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult UpdateSales(ProductSold sales)
        {
            using(var db = new OnboardingEntities())
            {
                var editSales = db.ProductSolds.SingleOrDefault(x => x.Id == sales.Id);
                editSales.CustomerId = sales.CustomerId;
                editSales.ProductId = sales.ProductId;
                editSales.StoreId = sales.StoreId;
                editSales.DateSold = sales.DateSold;
                db.SaveChanges();
                return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DeleteSale(int Id)
        {
            using (var db = new OnboardingEntities())
            {
                var deleteSale = db.ProductSolds.Find(Id);
                db.ProductSolds.Remove(deleteSale);
                db.SaveChanges();
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DropDownCustomerName()
        {
            using (var db = new OnboardingEntities())
            {
                var customerInfo = db.Customers.Select(x => new
                {
                    Name = x.Name,
                    Id = x.Id
                }).ToList();
                return this.Json(customerInfo, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DropDownProductName()
        {
            using (var db = new OnboardingEntities())
            {
                var productInfo = db.Products.Select(x => new
                {
                    Name = x.Name,
                    Id = x.Id
                }).ToList();
                return this.Json(productInfo, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DropDownStoretName()
        {
            using (var db = new OnboardingEntities())
            {
                var storeInfo = db.Stores.Select(x => new
                {
                    Name = x.Name,
                    Id = x.Id
                }).ToList();
                return this.Json(storeInfo, JsonRequestBehavior.AllowGet);
            }
        }
    }
}