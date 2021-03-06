﻿using AppEngine.Models.Common;
using AppEngine.Models.DataContext;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace OrganizationModule.Controllers.Api
{
    public class SimplePersonController : ApiController
    {
        private EFContext db = new EFContext();

        // GET api/<controller>
        [HttpGet]
        public IEnumerable<Person> Get()
        {
            //get from correct profile
            return db.Users.Where(x => !x.IsDeleted).AsEnumerable();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
