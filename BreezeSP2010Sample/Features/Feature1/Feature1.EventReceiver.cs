using System;
using System.Runtime.InteropServices;
using System.Security.Permissions;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Navigation;

namespace BreezeSP2010Sample.Features.Feature1 {
  /// <summary>
  /// This class handles events raised during feature activation, deactivation, installation, uninstallation, and upgrade.
  /// </summary>
  /// <remarks>
  /// The GUID attached to this class may be used during packaging and should not be modified.
  /// </remarks>

  [Guid("9ace6194-caee-447e-8036-06c118bd0b9c")]
  public class Feature1EventReceiver : SPFeatureReceiver {
    // Uncomment the method below to handle the event raised after a feature has been activated.

    public override void FeatureActivated(SPFeatureReceiverProperties properties) {
      var site = properties.Feature.Parent as SPWeb;
      if (site != null) {
        var topNav = site.Navigation.TopNavigationBar;
        topNav.AddAsLast(new SPNavigationNode("BreezeJS DEMO", "App/Default.aspx"));
      }
    }


    // Uncomment the method below to handle the event raised before a feature is deactivated.

    public override void FeatureDeactivating(SPFeatureReceiverProperties properties) {
      var site = properties.Feature.Parent as SPWeb;
      if (site != null) {
        // delete the provisioned page
        try {
          var appFolder = site.GetFolder("App");
          appFolder.Delete();
        } catch { }

        // delete the navigation link
        var topNav = site.Navigation.TopNavigationBar;
        for (int index = topNav.Count - 1; index >= 0; index--) {
          if (topNav[index].Url.Contains("App/Default.aspx")) {
            topNav[index].Delete();
          }
        }

        // delete the list
        var list = site.Lists.TryGetList("Contacts");
        if (list != null)
          list.Delete();
      }
    }


    // Uncomment the method below to handle the event raised after a feature has been installed.

    //public override void FeatureInstalled(SPFeatureReceiverProperties properties)
    //{
    //}


    // Uncomment the method below to handle the event raised before a feature is uninstalled.

    //public override void FeatureUninstalling(SPFeatureReceiverProperties properties)
    //{
    //}

    // Uncomment the method below to handle the event raised when a feature is upgrading.

    //public override void FeatureUpgrading(SPFeatureReceiverProperties properties, string upgradeActionName, System.Collections.Generic.IDictionary<string, string> parameters)
    //{
    //}
  }
}
