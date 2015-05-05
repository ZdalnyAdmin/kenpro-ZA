﻿using AppEngine.Helpers;
using AppEngine.Models;
using AppEngine.Models.Common;
using AppEngine.Models.DataBusiness;
using AppEngine.Models.DataContext;
using AppEngine.Services;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OrganizationModule.Controllers
{
    public class PersonController : ApiController
    {
        private EFContext db = new EFContext();

        // GET api/<controller>
        [HttpGet]
        public IEnumerable<Person> Get()
        {
            var people =  db.Users.Where(x=>x.Status == StatusEnum.Active || x.Status == StatusEnum.Blocked || x.Status == StatusEnum.Deleted).ToList();
            foreach (var item in people)
            {
                item.SetAssignedTrainingsNumber((from t in db.TrainingResults
                                                 where t.PersonID == item.Id
                                                 select t).Count());

                var groups = (from pg in db.PeopleInGroups
                              join g in db.Groups on pg.ProfileGroupID equals g.ProfileGroupID
                              where pg.PersonID == item.Id
                              select g.Name).ToList();
                item.SetAssignedGroups(groups);
            }
            return people;
        }

        // GET api/<controller>/5
        public Person Get(int id)
        {
            var person = db.Users.Find(id);
            if (person == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
            return person;
        }

        // POST api/<controller>
        public HttpResponseMessage Post(Person person)
        {
            if (ModelState.IsValid)
            {
                //todo logs for add and send invitation

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, person);
                //response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = Contact.Id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // PUT api/<controller>/5
        public HttpResponseMessage Put(Person person)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            var usr = Person.GetLoggedPerson(User);
            if (person.IsDeleted)
            {
                
                person.DeleteUserID = usr.Id;
                person.DeletedDate = DateTime.Now;
            }
            else
            {
                person.ModifiedUserID = usr.Id;
            }

            db.Entry(person).State = EntityState.Modified;
            try
            {
                db.SaveChanges();

                if (person.IsDeleted && person.DeleteUserID == person.Id)
                {
                    LogService.InsertUserLogs(OperationLog.UserDeleteBySelf, db, person.Id, person.DeleteUserID);
                }
                if (person.IsDeleted && person.DeleteUserID != person.Id)
                {
                    LogService.InsertUserLogs(OperationLog.UserDelete, db, person.Id, person.DeleteUserID);
                }
                if (!person.IsDeleted)
                {
                    LogService.InsertUserLogs(OperationLog.UserEdit, db, person.Id, person.ModifiedUserID);
                }
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // DELETE api/<controller>/5
        public HttpResponseMessage Delete(int id)
        {
            var person = db.Users.Find(id);
            if (person == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Users.Remove(person);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, person);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
