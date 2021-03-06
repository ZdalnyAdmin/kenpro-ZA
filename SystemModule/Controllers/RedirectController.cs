﻿using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SystemModule.Controllers
{
    public class RedirectController : Controller
    {
        public ActionResult Index(string id, string code)
        {
            if (id == "signin")
            {
                logoff();
            }

            if (string.IsNullOrWhiteSpace(id))
            {
                return Redirect("/");
            }
            else
            {
                return Redirect("/?page=" + id);
            }
        }

        public ActionResult ResetPasswordConfirmation(string code)
        {
            logoff();

            if (string.IsNullOrWhiteSpace(code))
            {
                return Redirect("/");
            }
            else
            {
                code = Url.Encode(code);
                return Redirect("/?page=resetPasswordConfirmation&code=" + code);
            }
        }

        public ActionResult RegisterUser(string code, string id)
        {
            logoff();

            if (string.IsNullOrWhiteSpace(code))
            {
                return Redirect("/");
            }
            else
            {
                code = Url.Encode(code);
                id = Url.Encode(id);
                return Redirect("/?page=registerUser&controller=Templates&code=" + code + "&id=" + id);
            }
        }

        public ActionResult DeleteOrganization(string code, string id)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                return Redirect("/");
            }
            else
            {
                code = Url.Encode(code);
                id = Url.Encode(id);
                return Redirect("/?page=delOrganization&controller=Templates&code=" + code + "&id=" + id);
            }
        }

        public ActionResult ChangeOrganizationName(string code, string id)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                return Redirect("/");
            }
            else
            {
                code = Url.Encode(code);
                id = Url.Encode(id);
                return Redirect("/?page=changeOrganization&controller=Templates&code=" + code + "&id=" + id);
            }
        }

        #region Private Methods
        private void logoff()
        {
            var ctx = Request.GetOwinContext();
            var authManager = ctx.Authentication;

            authManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
        }
        #endregion
    }
}