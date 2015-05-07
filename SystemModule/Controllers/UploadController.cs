﻿using AppEngine.Models.Common;
using AppEngine.Models.DataBusiness;
using AppEngine.Models.ViewModels.Upload;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SystemModule.Controllers
{
    [Authorize]
    public class UploadController : Controller
    {
        #region Delete
        [HttpPost]
        public ActionResult DeleteMovie(DeleteViewModel model)
        {
            if (ModelState.IsValid)
            {
                delete(model.FileName, "~/Temp/Movies/");
            }

            return getErrorsFromModel();
        }

        [HttpPost]
        public ActionResult DeleteImage(DeleteViewModel model)
        {
            if (ModelState.IsValid)
            {
                delete(model.FileName, "~/Temp/Images/");
            }

            return getErrorsFromModel();
        }

        private void delete(string fileName, string basePath)
        {
            var path = Path.Combine(Server.MapPath(basePath), fileName.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries).Last());
            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
        }
        #endregion

        #region Upload
        [HttpPost]
        public ActionResult UploadMovie()
        {
            return Json(new Result() { Succeeded = true, Message = upload("/Temp/Movies/") });
        }

        [HttpPost]
        public ActionResult UploadImage()
        {
            return Json(new Result() { Succeeded = true, Message = upload("/Temp/Images/") });
        }

        private string upload(string basePath)
        {
            string url = string.Empty;
            var loggedPerson = Person.GetLoggedPerson(User);

            if (Request.Files.Count > 0)
            {
                var file = Request.Files[0];

                if (file != null && file.ContentLength > 0)
                {
                    var fileName = loggedPerson.Id + "_" + Path.GetFileName(file.FileName);
                    var path = Path.Combine(Server.MapPath("~"+ basePath), fileName);
                    url = basePath + fileName;
                    file.SaveAs(path);
                }
            }

            return url;
        }
        #endregion

        #region Private Functions
        private JsonResult getErrorsFromModel()
        {
            var Errors = new Collection<string>();

            foreach (ModelState modelState in ViewData.ModelState.Values)
            {
                foreach (ModelError error in modelState.Errors)
                {
                    Errors.Add(error.ErrorMessage);
                }
            }

            return Json(new
            {
                Succeeded = false,
                Errors = Errors
            });
        }
        #endregion
    }
}