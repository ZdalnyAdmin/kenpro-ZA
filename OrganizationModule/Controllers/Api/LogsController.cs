﻿using AppEngine.Models;
using AppEngine.Models.Common;
using AppEngine.Models.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OrganizationModule.Controllers.Api
{
    public class LogsController : ApiController
    {
        private EFContext db = new EFContext();

        [HttpGet]
        public IEnumerable<AppLog> Get()
        {
            //get from correct profil
            //get current organization
            var protecter = Person.GetLoggedPerson(User);
            if(protecter == null || !protecter.OrganizationID.HasValue)
            {
                return new List<AppLog>();
            }

            //get all users assigned to organization and show logs only for that users



            var logs = db.Logs.Where(x=>!x.IsSystem && x.OrganizationID == protecter.OrganizationID).OrderByDescending(p=>p.ModifiedDate).ToList();



            foreach (var item in logs)
            {
                if (!string.IsNullOrWhiteSpace(item.PersonID))
                {
                    item.Person = db.Users.FirstOrDefault(x => x.Id == item.PersonID);
                }

                if (!string.IsNullOrWhiteSpace(item.ModifiedUserID))
                {
                    item.ModifiedUser = db.Users.FirstOrDefault(x => x.Id == item.ModifiedUserID);
                }

                if (item.TrainingID != 0)
                {
                    item.Training = db.Trainings.FirstOrDefault(x => x.TrainingID == item.TrainingID);
                    if(item.Training != null)
                    {
                        item.Training.UserName = db.Users.FirstOrDefault(x => x.Id == item.Training.CreateUserID).DisplayName;
                    }
                }
            }

            return logs;
        }

        // POST api/<controller>
        public HttpResponseMessage Post(AppLog log)
        {

            if (ModelState.IsValid)
            {
                var list = (from t in db.Logs
                            where t.OperationType == log.OperationType && t.TrainingID == log.TrainingID && !log.IsSystem
                            orderby t.ModifiedDate descending
                            select t).ToList();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, list);
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
