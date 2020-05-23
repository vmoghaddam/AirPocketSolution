using Android.Content;
using CPApp;
using CPApp.Droid;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;

[assembly: ExportRenderer(typeof(HybridWebViewX), typeof(HybridWebViewRenderer))]
namespace CPApp.Droid
{
    public class HybridWebViewRenderer : WebViewRenderer
    {
        const string JavascriptFunction = "function invokeCSharpAction(data){jsBridge.invokeAction(data);}";
        Context _context;

        public HybridWebViewRenderer(Context context) : base(context)
        {
            _context = context;
        }

        protected override void OnElementChanged(ElementChangedEventArgs<WebView> e)
        {
            base.OnElementChanged(e);

            if (e.OldElement != null)
            {
                Control.RemoveJavascriptInterface("jsBridge");
                ((HybridWebViewX)Element).Cleanup();
            }
            if (e.NewElement != null)
            {
                Control.Settings.AllowFileAccessFromFileURLs = true;
                Control.Settings.AllowUniversalAccessFromFileURLs = true;


                Control.Settings.JavaScriptEnabled = true;
                //webView.Settings.CacheMode = CacheModes.Normal;
                Control.Settings.DomStorageEnabled = true;
                Control.Settings.SetSupportMultipleWindows(true);
                Control.Settings.JavaScriptCanOpenWindowsAutomatically = true;
                Control.Settings.AllowContentAccess = true;
                Control.Settings.AllowFileAccess = true;
                Control.Settings.AllowFileAccessFromFileURLs = true;
                Control.SetWebViewClient(new JavascriptWebViewClient(this, $"javascript: {JavascriptFunction}"));
                Control.AddJavascriptInterface(new JSBridge(this), "jsBridge");
                Control.LoadUrl($"file:///android_asset/Content/{((HybridWebViewX)Element).Uri}");
                //Control.LoadUrl(((HybridWebViewX)Element).Uri);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                ((HybridWebViewX)Element).Cleanup();
            }
            base.Dispose(disposing);
        }
    }
}
