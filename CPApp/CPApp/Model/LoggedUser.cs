using System;
using System.Collections.Generic;
using System.Text;
using SQLite;

namespace CPApp.Model
{
    public class LoggedUser
    {
        
        [PrimaryKey, AutoIncrement]
        public int ID { get; set; }
        public string userName { get; set; }
        public string userTitle { get; set; }
        public string userId { get; set; }
        public string employeeId { get; set; }
        public string roles { get; set; }
        public string claims { get; set; }

        public string jobGroup { get; set; }
    }

    public class UrlHistory
    {
        [PrimaryKey, AutoIncrement]
        public int ID { get; set; }

        public string url { get; set; }

        public DateTime date { get; set; }
    }
}
