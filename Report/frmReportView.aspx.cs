using DevExpress.DataAccess.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Report
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
    //        var url = $rootScope.reportUrl + '/?type=' + $routeParams.type + '&df=' + $routeParams.df + '&dt=' + $routeParams.dt + '&airline=' + ($routeParams.airline ?$routeParams.airline:-1)
    //+'&status=15&from=' + ($routeParams.from ? $routeParams.from : -1) +'&to=' + ($routeParams.to ? $routeParams.to : -1);


            string apiUrl = WebConfigurationManager.AppSettings["api_url"];
            // string df = Request.QueryString["from"];
            // string dt = Request.QueryString["to"];
            string df = Request.QueryString["df"];
            string dt = Request.QueryString["dt"];
            
            string type = Request.QueryString["type"];
            if (string.IsNullOrEmpty(type))
                type = "1";
            
           
            string airlineId = Request.QueryString["airline"];
            if (string.IsNullOrEmpty(airlineId))
                airlineId = "-1";
            string flightStatusId = Request.QueryString["status"];
            if (string.IsNullOrEmpty(flightStatusId))
                flightStatusId = "-1";
            string from = Request.QueryString["from"];
            if (string.IsNullOrEmpty(from))
                from = "-1";
            string to = Request.QueryString["to"];
            if (string.IsNullOrEmpty(to))
                to = "-1";
            string employeeId = Request.QueryString["id"];

            JsonDataSource dataSource = null;

            switch (type)
            {

                case "1":
                    var rptFlight = new RptFlight(df,dt);
                    dataSource = new JsonDataSource();
                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/crew/flights/app2/?id=" + employeeId + "&df=" + df + "&dt=" + dt + "&status=" + flightStatusId + "&airline=" + airlineId + "&report=" + type + "&from=" + from + "&to=" + to));
                    dataSource.Fill();
                    rptFlight.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptFlight);
                    break;
                case "easafcl16":
                    var rptEASAFCL16 = new RptFlight();
                    dataSource = new JsonDataSource();
                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/crew/flights/app2/?id=" + employeeId + "&df=" + df + "&dt=" + dt + "&status=" + flightStatusId + "&airline=" + airlineId + "&report=" + type+"&from="+from+"&to="+to));
                    dataSource.Fill();
                    rptEASAFCL16.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptEASAFCL16);
                    break;
                default:
                    break;

            }
           // var report = new RptTwoPageLogBook();

            // var jsonDataSource = new JsonDataSource();

            // jsonDataSource.JsonSource = new UriJsonSource(new Uri("http://fleet.flypersia.aero/api.airpocket/odata/fuel/report/?$top=2020&dt=2020-01-12T00:00:00&df=2020-01-12T00:00:00&%24orderby=STDDay%2CSTDLocal&%24filter=(FlightId%20gt%200)"));

            // jsonDataSource.Fill();

            //report.DataSource = jsonDataSource;




        }
    }
}