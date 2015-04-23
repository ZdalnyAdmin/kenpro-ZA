﻿using AppEngine.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OrganizationModule.Controllers
{
    public class GroupController : ApiController
    {
        // GET api/<controller>
        [HttpGet]
        public IEnumerable<ProfileGroup> Get()
        {
            var list = new List<ProfileGroup>();

            list.Add(new ProfileGroup()
            {
                ProfileGroupID=1,
                Name = "Test group",
                CreateDate = DateTime.Today.Date
            });

            list.Add(new ProfileGroup()
            {
                ProfileGroupID = 2,
                Name = "Test group 2",
                CreateDate = DateTime.Today.Date
            });

            list.Add(new ProfileGroup()
            {
                ProfileGroupID = 3,
                Name = "Test group 4",
                CreateDate = DateTime.Today.Date
            });

            return list.AsEnumerable();
        }

        // GET api/<controller>/5
        public ProfileGroup Get(int id)
        {
            return null;
        }

        // POST api/<controller>
        public HttpResponseMessage Post(ProfileGroup person)
        {
            if (ModelState.IsValid)
            {

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
        public HttpResponseMessage Put(int id, ProfileGroup person)
        {

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // DELETE api/<controller>/5
        public HttpResponseMessage Delete(int id)
        {
            ProfileGroup person = new ProfileGroup();
            return Request.CreateResponse(HttpStatusCode.OK, person);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
