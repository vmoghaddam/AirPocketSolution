app.controller("footerController", function ($scope, $rootScope, $routeParams, $location) {

    // $('.' + $scope.type).show();
    $('.' + $scope.type).addClass('active');
    if ($scope.type == 'apphome') {
        $('.footeritem').hide();
        $('.footerflight').width('16.66%').show();
        $('.footerduty').width('16.66%').show();
        $('.footerlibrary').width('16.66%').show();
        $('.footercertification').width('16.66%').show();
       // $('.footercourse').width('16.66%').show();
        $('.footerreport').width('16.66%').show();
        $('.footerdocument').width('16.66%').show();
    }
    if ($scope.type == 'profile') {
        $('.footeritem').hide();
         
        $('.footerhome').width('33.333%').show();
        $('.footereditprofile').width('33.333%').show();
        $('.footerprivacy').width('33.333%').show();
      

    }
    if ($scope.type == 'privacy') {
        $('.footeritem').hide();

        $('.footerhome').width('50%').show();
        $('.footerprofile').width('50%').show();
       


    }
    if ($scope.type == 'applibrary') {
        $('.footeritem').hide();
        //$('.applibrary').width('50%').show();
        //$('.apphome').width('50%').show();;
        $('.footerhome').width('100%').show();
        // $('.footerbook').width('25%').show();
        // $('.footervideo').width('25%').show();
        //  $('.footerpaper').width('25%').show();

    }
    //reportviewer
    if ($scope.type == 'reportviewer') {
        $('.footeritem').hide();
       
        $('.footerhome').width('50%').show();
        $('.footerreport').width('50%').show();
         

    }
    if ($scope.type == 'reports') {
        $('.footeritem').hide();
        //$('.applibrary').width('50%').show();
        //$('.apphome').width('50%').show();;
        $('.footerhome').width('100%').show();
        // $('.footerbook').width('25%').show();
        // $('.footervideo').width('25%').show();
        //  $('.footerpaper').width('25%').show();

    }
    //if ($scope.type == 'appdocument') {
    //    $('.footeritem').hide();
    //    //$('.applibrary').width('50%').show();
    //    //$('.apphome').width('50%').show();;
    //    $('.footerhome').width('100%').show();


    //}
    if ($scope.type == 'appcertificate') {
        $('.footeritem').hide();
        //$('.applibrary').width('50%').show();
        //$('.apphome').width('50%').show();;
        $('.footerhome').width('50%').show();
        $('.footercertificatenew').width('50%').show();
        //  $('.footerlast').width('25%').show();
        //$('.footercourse').width('25%').show();


    }


    if ($scope.type == 'fdps') {
        $('.footeritem').hide();
        
        $('.footerhome').width('33.3333%').show();
        $('.footerfdpnew').width('33.3333%').show();
        $('.footerfdpnewduty').width('33.3333%').show();
        


    }

    if ($scope.type == 'fdp') {
        $('.footeritem').hide();

        $('.footerhome').width('100%').show();
       // $('.footerfdpnewflight').width('50%').show();



    }


    if ($scope.type == 'appcourse') {
        $('.footeritem').hide();
        //$('.applibrary').width('50%').show();
        //$('.apphome').width('50%').show();;
        $('.footerhome').width('50%').show();
        //  $('.footercoursepending').width('25%').show();
        // $('.footercourseactive').width('33.3333%').show();
        $('.footercertification').width('50%').show();


    }
    if ($scope.type == 'appmessage') {
        $('.footeritem').hide();
        $('.footerhome').width('100%').show();
    }
    if ($scope.type == 'appmessageitem') {
        $('.footeritem').hide();
        $('.footerhome').width('50%').show();
        $('.footernotification').width('50%').show();

    }

    if ($scope.type == 'applibraryitem') {
        $('.footeritem').hide();

    }
    if ($scope.type == 'appdocumentitem') {
        $('.footeritem').hide();
        $('.footerhome').width('50%').show();
        $('.footerdocument').width('50%').show();
    }

    if ($scope.type == 'appflightcalendar') {
        $('.footeritem').hide();
        //$('.applibrary').width('50%').show();
        //$('.apphome').width('50%').show();;
        $('.footerhome').width('33.333%').show();
        $('.footerflightcalendar').width('33.333%').addClass('xactive').show();
        //$('.footerflightstatistics').width('20%').show();
        $('.footerflightlogbook').width('33.333%').show();
       


    }
    if ($scope.type == 'appflightstatistics') {
        $('.footeritem').hide();
        //$('.applibrary').width('50%').show();
        //$('.apphome').width('50%').show();;
        $('.footerhome').width('20%').show();
        $('.footerflightcalendar').width('20%').show();
        $('.footerflightstatistics').width('20%').addClass('xactive').show();
        $('.footerflightlogbook').width('20%').show();
        


    }
    if ($scope.type == 'appflightlogbook') {
        $('.footeritem').hide();
        //$('.applibrary').width('50%').show();
        //$('.apphome').width('50%').show();;
        $('.footerhome').width('33.333%').show();
        $('.footerflightcalendar').width('33.333%').show();
       // $('.footerflightstatistics').width('20%').show();
        $('.footerflightlogbook').addClass('xactive').width('33.333%').show();
        

    }


    if ($scope.type == 'appflightnew') {
        $('.footeritem').hide();
        //$('.applibrary').width('50%').show();
        //$('.apphome').width('50%').show();;
        $('.footerhome').width('33.333%').show();
        $('.footerflightcalendar').width('33.333%').show();
        //$('.footerflightstatistics').width('20%').show();
        $('.footerflightlogbook').width('33.333%').show();
         


    }



    if ($scope.type == 'appdocument') {

        $('.footeritem').hide();
        //$('.applibrary').width('50%').show();
        //$('.apphome').width('50%').show();;
        $('.footerhome').width('33.33%').show();
        $('.footerdocumentpif').width('33.33%').addClass('xactive').show();
        $('.footerdocumentother').width('33.33%').show();


    }
    if ($scope.type == 'appdocumentother') {
        $('.footeritem').hide();
        //$('.applibrary').width('50%').show();
        //$('.apphome').width('50%').show();;
        $('.footerhome').width('33.33%').show();
        $('.footerdocumentpif').width('33.33%').show();
        $('.footerdocumentother').width('33.33%').addClass('xactive').show();


    }

    $scope.$on('ShowFooterItems', function (event, prms) {
        //footerbook
        if (prms == '84') {
            $('.footerhome').width('33.3333%').show();
            $('.footerlibrary').width('33.3333%').show();
            $('.footerpaper').width('33.3333%').show();
        }
        if (prms == '83') {
            $('.footerhome').width('33.3333%').show();
            $('.footerlibrary').width('33.3333%').show();
            $('.footerbook').width('33.3333%').show();
        }
        if (prms == '85') {
            $('.footerhome').width('33.3333%').show();
            $('.footerlibrary').width('33.3333%').show();
            $('.footervideo').width('33.3333%').show();
        }


    });
    $scope.$on('ActiveFooterItem', function (event, prms) {
        //footerbook
        alert('x');
        $('.footeritem').removeClass('active');
        $('.' + prms).addClass('active');


    });
    $scope.$on('ShowEditCertificate', function (event, prms) {
        $('.footeritem').hide();
       
        $('.footerhome').width('25%').show();
        $('.footercertificatenew').width('25%').show();
        $('.footercertificateedit').width('25%').show();
        $('.footercertificatedelete').width('25%').show();
       
         


    });
    $scope.$on('HideEditCertificate', function (event, prms) {
        $('.footeritem').hide();

        $('.footerhome').width('50%').show();
        $('.footercertificatenew').width('50%').show();



    });

    $scope.$on('ShowEditFDPFlight', function (event, prms) {
        $('.footeritem').hide();

        $('.footerhome').width('25%').show();
        $('.footerfdptime').width('25%').show();
        $('.footerfdpnewflight').width('25%').show();
       // $('.footerfdpflightstatus').width('20%').show();
        $('.footerfdpflightdelete').width('25%').show();
        




    });
    $scope.$on('HideEditFDPFlight', function (event, prms) {
        $('.footeritem').hide();

        $('.footerhome').width('50%').show();
        $('.footerfdpnewflight').width('50%').show();
        



    });
    $scope.$on('ShowGoFDP', function (event, prms) {
        if ($(".footergofdp").is(":visible"))
            return;
        var items = $(".footeritem:visible");
        var w = 100 / (items.length + 3);
        $.each(items, function (_i, _d) {
            $(_d).width(w+'%');

        });
        $('.footergofdp').width(w + '%').show();
        $('.footershowflightinfo').width(w + '%').show();
        $('.footerflighteditdirect').width(w + '%').show();
       

    });
    $scope.$on('HideGoFDP', function (event, prms) {
        var items = $(".footeritem:visible");
        $('.footergofdp').hide();
        $('.footershowflightinfo').hide();
        $('.footerflighteditdirect').hide();
        var w = 100 / (items.length -3);
        $.each(items, function (_i, _d) {
            $(_d).width(w + '%');

        });
        


    });
    $scope.$on('ReadOnlyFDP', function (event, prms) {
        
        $('.footeritem').hide();

        $('.footerhome').width('100%').show();
        //$('.footerfdpnewflight').width('50%').show();

    });
    $scope.$on('EditableFDP', function (event, prms) {
        
        $('.footeritem').hide();

        $('.footerhome').width('33.333%').show();
        $('.footerfdptime').width('33.333%').show();
        $('.footerfdpnewflight').width('33.333%').show();
       

    });

    $scope.$on('$viewContentLoaded', function () {

      
    });
   
    $rootScope.$broadcast('PageLoaded', 'footer');
    $rootScope.$broadcast('FooterLoad', 'footer');
    //end scope
});