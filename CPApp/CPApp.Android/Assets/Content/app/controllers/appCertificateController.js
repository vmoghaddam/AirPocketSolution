'use strict';
app.controller('appCertificateController', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', '$route', '$timeout', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, $route, $timeout) {
    //test
    $scope.prms = $routeParams.prms;
    $scope.firstBind = true;
    $scope.active = $route.current.type;

    $scope.title = null;
    if (!$rootScope.hasACTypes || $rootScope.hasACTypes != "1")
        General.Modal("Please insert your AIRCRAFT TYPE CERTIFICATES to use CrewPocket.", function () { });
    
    //switch ($scope.active) {


    //    case 'all':

    //        $scope.title = 'All';
    //        break;
    //    case 'last':

    //        $scope.title = 'Last';
    //        break;

    //    default:
    //        break;
    //}


    $scope.scroll_height = 200;
    $scope.scroll_main = {
        width: '100%',
        bounceEnabled: true,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        useNative: false,
        refreshingText: 'Updating...',
        onPullDown: function (options) {
            //$scope.bind();
            //Alert.getStartupNots(null, function (arg) {
            //    options.component.release();
            //    // refreshCarts(arg);
            //});
            options.component.release();

        },
        bindingOptions: { height: 'scroll_height', }
    };




    $scope.loadingVisible = false;
    $scope.loadPanel = {
        message: 'Please wait...',

        showIndicator: true,
        showPane: true,
        shading: true,
        closeOnOutsideClick: false,
        shadingColor: "rgba(0,0,0,0.4)",
        // position: { of: "body" },
        onShown: function () {

        },
        onHidden: function () {

        },
        bindingOptions: {
            visible: 'loadingVisible'
        }
    };



    
    $scope.formatDate = function (dt) {
        return moment(new Date(dt)).format('MMM-DD-YYYY').toUpperCase();
    };
    $scope.ds = null;
    $scope.bind = function () {
        $scope.doRefresh = false;
        $scope.selectedItem = null;
        $rootScope.$broadcast('HideEditCertificate', null);
        $('.lib-cer').hide();
        $scope.ds = [];
        $scope.loadingVisible = true;
        generalService.getCertifications($rootScope.employeeId).then(function (response) {

            $scope.loadingVisible = false;
            response = Enumerable.From(response).OrderBy('$.Expiring').ThenBy('$.Remain').ToArray();
            var tmp1 = [1187, 1188, 1189, 1190, 1191, 1192, 1194, 1195, 1202, 1182];
            $.each(response, function (_i, _d) {
                if (tmp1.indexOf(_d.TypeId) != -1)
                    _d.tmp = 1;
                else
                    _d.tmp = _d.TypeId;
            });
            $scope.ds = response;
            var scroll_main = $("#scrollview").dxScrollView().dxScrollView("instance");
            scroll_main.scrollBy(1);
            console.log($scope.ds);

        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    $scope.getRemainClass = function (item) {
        if (item.Remain <= 0)
            return 'expired';
        else if (item.Remain <= 30)
            return 'expiring';
        else return '';

    };
    $scope.selectedItem = null;
    $scope.itemClick = function ($event, x) {
       // console.log(x);
        //tile-selected
        
        // $timeout(function () {
        $scope.selectedItem = null;
            var has = $($event.currentTarget).hasClass('tile-selected');
            $('.lib-cer').removeClass('tile-selected');
            if (!has) {

                $($event.currentTarget).addClass('tile-selected');
                $scope.selectedItem = x;
            }
           // var selected = $('.tile-selected').length;
        // if (selected > 0)
            
            if ($scope.selectedItem && $scope.selectedItem.AirPocket == false)
                $rootScope.$broadcast('ShowEditCertificate', null);
            else
                $rootScope.$broadcast('HideEditCertificate', null);
         //}, 600);
        

        //alert(bookId+' '+employeeId);
        // $location.path('/applibrary/item/' + bookId);
    };

    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'Certificates';
        $scope.scroll_height = $(window).height() - 45 - 42;
        $('.certificate').fadeIn();
         
        $scope.bind();
    }
    //////////////////////////////////////////
    $scope.$on('PageLoaded', function (event, prms) {
        //footerbook
        //  if (prms == 'footer')
        //      $('.footer' + $scope.active).addClass('active');


    });

    $scope.doRefresh = false;
    $scope.popup_newcertificate_visible = false;
    $scope.popup_newcertificate_title = 'New Certificate';
    $scope.popup_newcertificate = {
        title: 'Certificate',
        fullScreen: true,
        showTitle: true,
        dragEnabled: false,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Save', icon: 'check', useSubmitBehavior: true, validationGroup: 'add_new_certificate',
                    onClick: function (e) {
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            //   General.ShowNotify('Please fill in all required fields.', 'error');
                            return;
                        }
                        var offset = -1 * (new Date()).getTimezoneOffset();
                        if ($scope.newCertificate.DateIssue)
                            $scope.newCertificate.DateIssue = (new Date($scope.newCertificate.DateIssue)).addMinutes(offset);//.toUTCString();
                        if ($scope.newCertificate.DateExpire)
                            $scope.newCertificate.DateExpire = (new Date($scope.newCertificate.DateExpire)).addMinutes(offset);//.toUTCString();
                        if ($scope.newCertificate.DateIRValid)
                            $scope.newCertificate.DateIRValid = (new Date($scope.newCertificate.DateIRValid)).addMinutes(offset);//.toUTCString();
                        $scope.loadingVisible = true;
                        generalService.saveCertification($scope.newCertificate).then(function (response) {
                            if ($scope.newCertificate.TypeId == 5007) {
                                $rootScope.hasACTypes = "1";
                                $rootScope.updateUserDataActypes("1");
                                $rootScope.clearCacheAcTypes();
                            }
                            $scope.clearCertificate();
                            $scope.doRefresh = true;

                            General.ShowNotify(Config.Text_SavedOk, 'success');
                            
                            
                            //sook


                            $scope.loadingVisible = false;
                            if (!$scope.isNew)
                                $scope.popup_newcertificate_visible = false;
                            else
                                $scope.newCertificate.Id = -1;



                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'normal', text: 'Close',  onClick: function (e) {
                        // $scope.bind();
                        
                        $scope.popup_newcertificate_visible = false;
                    }
                }, toolbar: 'bottom'
            },
            // {
            //    widget: 'dxButton', location: 'before', options: {
            //        type: 'danger', text: 'Delete',icon:'remove',  onClick: function (e) {
            //            // $scope.bind();
                        
            //            $scope.popup_newcertificate_visible = false;
            //        }
            //    }, toolbar: 'bottom'
            //}
        ],

        visible: false,

        closeOnOutsideClick: false,
        onShowing: function (e) {


        },
        onShown: function (e) {

        },
        onHiding: function () {
            if ($scope.doRefresh)
                $scope.bind();
            $scope.clearCertificate();

        },
        bindingOptions: {
            visible: 'popup_newcertificate_visible',



        }
    };

    ////////////////////////////////////
    $scope.cmc = false;
    $scope.icao = false;
    $scope.fcl = false;
    $scope.med = false;
    $scope.typ = false;
    $scope.issueVisible = false;
    $scope.expireVisible = false;
    var issueList = [1186, 1184];
    //var expireList = [1187, 1188, 1189, 1190, 1192, 1191, 1194, 1195, 1202];
    var validList = [1181, 1182, 1184];

    $scope.newCertificate = {

        /////////////////////////
        Id: null,
        TypeId: null,
        TypeTitle: null,
        Description: null,
        DateIssue: null,
        DateExpire: null,
        DateIRValid: null,
        AcTypeId: null,
        Rating: null,
        Class: null,
        Limitation: null,
        EmployedBy: null,
        EmployedById: null,
        Occupation: null,
        Level: null,
        EmployeeId: $rootScope.employeeId,
        PersonId: $rootScope.userId,
        AirPocket: false,
        No: null,
        Title: null,
        /////////////////////////
    };
    $scope.clearCertificate = function () {

        $scope.newCertificate = {

            Id: null,
            TypeId: null,
            TypeTitle: null,
            Description: null,
            DateIssue: null,
            DateExpire: null,
            DateIRValid: null,
            AcTypeId: null,
            Rating: null,
            Class: null,
            Limitation: null,
            EmployedBy: null,
            EmployedById: null,
            Occupation: null,
            Level: null,
            EmployeeId: $rootScope.employeeId,
            PersonId: $rootScope.userId,
            AirPocket: false,
            No: null,
            Title: null,


        };
        $scope.cmc = false;
        $scope.icao = false;
        $scope.fcl = false;
        $scope.med = false;
        $scope.typ = false;
        $scope.issueVisible = false;
        $scope.expireVisible = false;
    };
    $scope.Issued = 'Issued';
    $scope.Expires = 'Expires';
    $scope.sb_certype = {
        showClearButton: false,
        searchEnabled: false,
        dataSource: $rootScope.getDatasourceCertificate(),

        onSelectionChanged: function (arg) {
            if (!arg.selectedItem)
                return;
            var id = arg.selectedItem.Id;
            $scope.issueVisible = issueList.indexOf(id) == -1;
            $scope.expireVisible = true;
            $scope.Issued = 'Issued';
            if (id == 1181)
                $scope.Issued = 'Date of Initial Issue';
            if (id == 1182)
                $scope.Issued = 'Date Of Check';
            if (validList.indexOf(id) != -1)
                $scope.Expires = 'Valid Until';
            $scope.fcl = id == 1181;
            $scope.typ = id == 5007;
            $scope.med = id == 1185;
            $scope.cmc = id == 1186;
            $scope.icao = id == 1184;

        },
        searchExpr: ["Title"],
        displayExpr: "Title",
        valueExpr: 'Id',
        bindingOptions: {
            value: 'newCertificate.TypeId',


        }
    };
    $scope.icao_ds = [1, 2, 3, 4, 5, 6];
    $scope.sb_icao = {

        showClearButton: true,
        width: '100%',
        searchEnabled: true,
        //itemTemplate: function (data) {
        //    return $rootScope.getSbTemplateAircraft(data);
        //},

        dataSource: $scope.icao_ds,

        onSelectionChanged: function (arg) {

        },
        bindingOptions: {
            value: 'newCertificate.Level',

        }
    };
    $scope.sb_actype = {

        showClearButton: true,
        width: '100%',
        searchEnabled: false,
        //itemTemplate: function (data) {
        //    return $rootScope.getSbTemplateAircraft(data);
        //},
        searchExpr: ['Type', 'Manufacturer'],
        dataSource: $rootScope.getDatasourceAircrafts(),
        displayExpr: "Type",
        valueExpr: 'Id',

        onSelectionChanged: function (arg) {

        },
        bindingOptions: {
            value: 'newCertificate.AcTypeId',

        }
    };
    $scope.date_issued = {
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        bindingOptions: {
            value: 'newCertificate.DateIssue',
            //visible: 'issueVisible',
        }
    };
    $scope.date_expired = {
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        bindingOptions: {
            value: 'newCertificate.DateExpire',
            //visible: 'expireVisible',
        }
    };
    $scope.date_irvalid = {
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        bindingOptions: {
            value: 'newCertificate.DateIRValid',
            //visible: 'expireVisible',
        }
    };
    $scope.txt_title = {
        bindingOptions: {
            value: 'newCertificate.Title',

        }
    };
    $scope.txt_occupation = {
        bindingOptions: {
            value: 'newCertificate.Occupation',

        }
    };
    $scope.sb_airline = {
        showClearButton: false,
        searchEnabled: true,
        dataSource: $rootScope.getDatasourceAirline(),

        onSelectionChanged: function (arg) {

            // $scope.getIrRoute();
        },
        searchExpr: ["Title"],
        displayExpr: "Title",
        valueExpr: 'Id',
        bindingOptions: {
            value: 'newCertificate.EmployedById',


        }
    };
    $scope.txt_limitation = {
        bindingOptions: {
            value: 'newCertificate.Limitation',

        }
    };
    $scope.num_class = {
        min: 1,
        bindingOptions: {
            value: 'newCertificate.Class',

        }
    };
    $scope.txt_rating = {
        bindingOptions: {
            value: 'newCertificate.Rating',

        }
    };
    $scope.txt_no = {
        bindingOptions: {
            value: 'newCertificate.No',

        }
    };
    $scope.txt_remark = {
        height: 100,
        bindingOptions: {
            value: 'newCertificate.Description',
        }
    };




    $scope.isNew = true;

    $scope.$on('new_certificate', function (event, prms) {
        $scope.newCertificate.Id = -1;
        $scope.isNew = true;
        $scope.popup_newcertificate_visible = true;
    });
    $scope.$on('delete_certificate', function (event, prms) {
        General.Confirm(Config.Text_DeleteConfirm, function (res) {
            if (res) {
                $scope.loadingVisible = true;
                generalService.deleteCertification({ Id: $scope.selectedItem.Id }).then(function (response) {
                    $rootScope.clearCacheAcTypes();
                     General.ShowNotify(Config.Text_SavedOk, 'success');
                     $scope.bind();

                }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

            }
        });
    });

    $scope.$on('edit_certificate', function (event, prms) {
        if (!$scope.selectedItem)
            return;
        if ($scope.selectedItem.Airpocket)
        {
            return;
        }
        $scope.newCertificate.Id = $scope.selectedItem.Id;
        $scope.newCertificate.TypeId = $scope.selectedItem.TypeId;
        
        
        $scope.newCertificate.Description = $scope.selectedItem.Description;
        $scope.newCertificate.DateIssue = $scope.selectedItem.DateIssue;
        $scope.newCertificate.DateExpire = $scope.selectedItem.DateExpire;
        $scope.newCertificate.DateIRValid = $scope.selectedItem.DateIRValid;
        $scope.newCertificate.AcTypeId = $scope.selectedItem.AcTypeId;
        $scope.newCertificate.Rating = $scope.selectedItem.Rating;
        $scope.newCertificate.Class = $scope.selectedItem.Class;
        $scope.newCertificate.Limitation = $scope.selectedItem.Limitation;
        $scope.newCertificate.EmployedBy = $scope.selectedItem.EmployedBy;
        $scope.newCertificate.EmployedById = $scope.selectedItem.EmployedById;
        $scope.newCertificate.Occupation = $scope.selectedItem.Occupation;
        $scope.newCertificate.Level = $scope.selectedItem.Level;
        
        $scope.newCertificate.AirPocket= false;
        $scope.newCertificate.No = $scope.selectedItem.No;
        $scope.newCertificate.Title = $scope.selectedItem.Title;
        $scope.isNew = false;
        $scope.popup_newcertificate_visible = true;
    });

    $rootScope.$broadcast('AppLibraryLoaded', null);


}]);
