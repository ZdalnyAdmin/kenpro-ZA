﻿using AppEngine.Models.Common;
using AppEngine.Models.DataBusiness;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppEngine.Models.Common
{
    public class Organization
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)] 
        public int OrganizationID { get; set; }
        public string Name { get; set; }
        public decimal SpaceDisk { get; set; }
        public int MaxAssignedUser { get; set; }
        public bool IsGlobalAvailable { get; set; }
        public bool IsTrainingAvailableForAll { get; set; }
        public bool CanUserChangeMail { get; set; }
        public bool CanUserChangeName { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreateUserID { get; set; }
        //public Person CreateUser { get; set; }
        public string ProtectorID { get; set; }
        //public Person Protector { get; set; }
        public StatusEnum Status { get; set; }
        //public Status Status { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedDate { get; set; }
        public string DeletedUserID { get; set; }
        public string DeletedReason { get; set; }
       //public Person DeletedUser { get; set; }
    }
}
