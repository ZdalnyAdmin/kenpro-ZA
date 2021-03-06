﻿using AppEngine.Models.Common;
using AppEngine.Models.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrganizationModule.Controllers
{
    public class MenuController : Controller
    {
        #region Private Fields
        private EFContext _db = new EFContext();
        #endregion

        // GET: Menu
        [ChildActionOnly]
        public ActionResult UserMenu()
        {
            fillData();
            return View();
        }

        [ChildActionOnly]
        public ActionResult CreatorMenu()
        {
            fillData();
            return View();
        }

        [ChildActionOnly]
        public ActionResult ManagerMenu()
        {
            fillData();

            return View();
        }

        [ChildActionOnly]
        public ActionResult AdminMenu()
        {
            fillData();

            return View();
        }

        [ChildActionOnly]
        public ActionResult KeeperMenu()
        {
            fillData();

            return View();
        }

        public ActionResult Index()
        {
            var loggedPerson = Person.GetLoggedPerson(User);
            ViewBag.LoggedUser = loggedPerson;

            return View();
        }

        #region Private Methods
        private List<Training> getTrainings(string personID)
        {
            var trainings = new List<Training>();

            trainings = _db.Trainings
                            .Join(_db.TrainingResults
                                     .Where(y => y.PersonID == personID && y.EndDate == null),
                                  x => x.TrainingID,
                                  y => y.TrainingID,
                                  (x, y) => x)
                            .Where(x => x.IsActive)
                            .ToList();

            return trainings;
        }

        private void fillData()
        {
            var loggedPerson = Person.GetLoggedPerson(User);
            var trainings = getTrainings(loggedPerson.Id);

            if(loggedPerson.Profile != AppEngine.Models.DataBusiness.ProfileEnum.User)
            {
                var myTrainings = _db.Trainings.Where(x => x.CreateUserID == loggedPerson.Id).ToList();
                ViewBag.MyTrainings = myTrainings;
            }

            var organization = _db.Organizations.FirstOrDefault(x => x.OrganizationID == loggedPerson.OrganizationID);

            ViewBag.OrganizationName = organization != null ? organization.Name : "Brak Organizacji";
            ViewBag.LoggedUser = loggedPerson;
            ViewBag.Trainings = trainings;
        }
        #endregion
    }
}