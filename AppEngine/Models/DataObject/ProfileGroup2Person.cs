﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppEngine.Models.Common
{
    public class ProfileGroup2Person
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int ProfileGroup2PersonID { get; set; }
        public int ProfileGroupID { get; set; }
        public ProfileGroup ProfileGroup { get; set; }
        public string PersonID { get; set; }
        public Person Person { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedDate { get; set; }
        public string DeletedUserID { get; set; }

        [NotMapped]
        public string GroupName { get; set; }
    }
}
