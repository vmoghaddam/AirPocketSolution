using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using Newtonsoft.Json.Linq;
using Plugin.Connectivity;

namespace CPApp
{
    public partial class MainPage : ContentPage
    {
        private string WebViewUrl = "http://app.crewpocket.ir/#!/home";
        private const string LoginCallback = "login";
        private const string DisplayLoginAlertFunctioName = "displayLoginAlert";
        private const string Username = "User";
        HybridWebViewX webViewX;
        public MainPage()
        {
            InitializeComponent();
            if (CrossConnectivity.Current.IsConnected)
            {
                AttachHybridViewer();
            }
            else
            {
                indicator.IsRunning = false;
                gridContainer2.IsVisible = true;
            }
           
        }

        bool homeNotLoaded = true;
        public void AttachHybridViewer()
        {
            // gridContainer.Children.Clear();
            var loggedUser = App.Database.GetLoggedUser().Result;
            var lastHistory = App.Database.GetLastHistory().Result;
            // if (lastHistory != null)
            //   WebViewUrl = lastHistory.url;
            webViewX = new HybridWebViewX()
            {
                VerticalOptions = LayoutOptions.FillAndExpand,
                HorizontalOptions = LayoutOptions.FillAndExpand,
                Margin = new Thickness(0, 0),
                //Uri = WebViewUrl
                Uri= "index.html",
        };
            webViewX.Navigating += (s, e) =>
            {
                Device.BeginInvokeOnMainThread(() =>
                {
                    indicator.IsRunning = false;
                    indicator.IsVisible = false;
                    gridContainer2.IsVisible = false;
                    webViewX.IsVisible = true;
                });
                Device.StartTimer(new TimeSpan(0, 0, 3), () =>
                {
                    //Device.BeginInvokeOnMainThread(() =>
                    //{
                    //    indicator.IsRunning = false;
                    //    indicator.IsVisible = false;
                    //    gridContainer2.IsVisible = false;
                    //    webViewX.IsVisible = true;
                    //});
                    return false;

                    // webViewX.EvaluateJavaScriptAsync($"getStorage('loadStatus')");
                    // return homeNotLoaded;
                });
                var xxxx = e.Url;
                
                if (e.Url.ToLower().StartsWith("http://report.") || e.Url.ToLower().StartsWith("https://report."))
                {
                    try
                    {
                        var uri = new Uri(e.Url);

                        Device.OpenUri(uri);
                    }
                    catch (Exception ex)
                    {
                        var i = 0;
                    }

                    e.Cancel = true;
                }
            };
            webViewX.RegisterAction(async data =>
            {
                //DisplayAlert("Alert", "Hello " + data, "OK")

                var stuff = JObject.Parse(data.ToString());
                await ProccessAction(stuff);


                //var type = Convert.ToString(stuff.type);

            });
            webViewX.IsVisible = false;
            gridContainer.Children.Add(webViewX);

        }
        async Task<bool> ProccessAction(JObject data)
        {
            try
            {
                var type = data.GetValue("type");
                var _type = type.ToString();
                switch (_type)
                {
                    //case "storage":
                    //    var key1 = data.GetValue("key").ToString();
                    //    var value1 = data.GetValue("value").ToString();
                    //    if (key1 == "loadStatus")
                    //    {
                    //        homeNotLoaded = value1 != "1";
                    //        if (value1=="1")
                    //            Device.BeginInvokeOnMainThread(() =>
                    //            {
                    //                indicator.IsRunning = false;
                    //                indicator.IsVisible = false;
                    //                gridContainer2.IsVisible = false;
                    //                webViewX.IsVisible = true;
                    //            });
                    //    }
                    //    break;
                    case "load":
                    case "load2":
                        //await DisplayAlert("Question?", "Would you like to play a game", "Yes", "No");
                        break;
                    case "currentUrl":

                        var value = data.GetValue("value").ToString();
                        await App.Database.SaveHistoryAsync(new Model.UrlHistory()
                        {
                            date = DateTime.Now,
                            url = value,
                        });
                        break;
                    case "loginData":
                        //                  public int ID { get; set; }
                        //public string userName { get; set; }
                        //public string userTitle { get; set; }
                        //public string userId { get; set; }
                        //public string employeeId { get; set; }
                        //public string roles { get; set; }
                        //public string claims { get; set; }

                        //public string jobGroup { get; set; }
                        var user = new Model.LoggedUser();
                        user.userName= data.GetValue("userName").ToString();
                        user.userTitle = data.GetValue("userTitle").ToString();
                        user.userId = data.GetValue("userId").ToString();
                        user.employeeId = data.GetValue("employeeId").ToString();
                        user.roles = data.GetValue("roles").ToString();
                        user.claims = data.GetValue("claims").ToString();
                        user.jobGroup = data.GetValue("jobGroup").ToString();
                        var id = await App.Database.SaveLoggedUserAsync(user);
                        break;
                    case "report":
                        var reportUrl = data.GetValue("value").ToString();
                        var uri = new Uri(reportUrl);

                        Device.OpenUri(uri);
                        break;
                    default:
                        break;
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }
        void OnButtonClicked(object sender, EventArgs e)
        {
            indicator.IsRunning = true;
            gridContainer2.IsVisible = false;
            if (!CrossConnectivity.Current.IsConnected)
            {
                indicator.IsRunning = false;
                gridContainer2.IsVisible = true;
                return;
            }
            AttachHybridViewer();
        }
        protected override bool OnBackButtonPressed()
        {

            // webView.CallJsFunction("goBack");
            if (webViewX.CanGoBack)
            {
                webViewX.EvaluateJavaScriptAsync($"goBack()");
                return true;
            }
            else
            {
                return base.OnBackButtonPressed();
            }
          
            //    if (browser.CanGoBack)
            //    {
            //       // Task<string> task = Task.Run<string>(async () => await GetValueFromTextbox());
            //      //  var cccc = task.Result;
            //        browser.GoBack();
            //        return true;
            //    }
            //    return true;
            //    //else return base.OnBackButtonPressed();
            //}

            //void OnNavigating(object sender, WebNavigatingEventArgs args)
            //{
            //    // Checking if we are at the home page url
            //    // browser.CanGoBack does not seem to be working (not updating in time)
            //    NavigationPage.SetHasNavigationBar(this, args.Url != Url);
        }
        ///////////////////////
    }
}
