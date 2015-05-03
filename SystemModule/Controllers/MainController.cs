﻿﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SystemModule.Controllers
{
    [Authorize]
    public class MainController : Controller
    {
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Navigate to logged user view
        /// </summary>
        /// <returns></returns>
        public ActionResult LoggedUser()
        {
            return View();
        }

        public ActionResult CreateOrganization()
        {
            return View();
        }

        public ActionResult OrganizationsList()
        {
            return View();
        }

        public ActionResult GlobalSetting()
        {
            return View();
        }

        public ActionResult Statistics()
        {
            return View();
        }

        public ActionResult CreateTraning()
        {
            return View();
        }

        public ActionResult Tranings()
        {
            return View();
        }

        public ActionResult CreateProtectorRole()
        {
            return View();
        }

        public ActionResult EditProtectorRole()
        {
            return View();
        }

        [Authorize]
        public ActionResult InternalTrainings()
        {
            return View();
        }

        public ActionResult GlobalAdmins()
        {
            return View();
        }

        public ActionResult History()
        {
            return View();
        }

    }
}