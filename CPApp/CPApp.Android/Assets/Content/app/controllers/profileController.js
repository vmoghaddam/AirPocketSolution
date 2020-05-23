'use strict';
app.controller('profileController', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', '$route', '$timeout', 'flightService', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, $route, $timeout, flightService) {
    //////////////////////////////////////////////
    $scope.entity = {
        Id: null,
        PersonId:null,
        BaseAirportId: null,
        NID: null,
        SexId: null,
        FirstName: null,
        LastName: null,
        DateBirth: null,
        Email: null,
        Phone1: null,
        Mobile: null,
        PassportNumber: null,
        DatePassportIssue: null,
        DatePassportExpire: null,
        Address: null,
        CityId: null,
        PostalCode: null,
        VisaExpireDate: null,


        GroupId: null,
        LinkedIn: null,
        WhatsApp: null,
        Telegram: null,

    };
    $scope.fillEntity = function () {
        $scope.entity.Id = $rootScope.employeeId;
        $scope.entity.PersonId = $rootScope.userId;
        $scope.entity.BaseAirportId=$scope.emp.BaseAirportId;
        $scope.entity.NID=$scope.emp.NID;
        $scope.entity.SexId=$scope.emp.SexId;
        $scope.entity.FirstName=$scope.emp.FirstName;
        $scope.entity.LastName=$scope.emp.LastName;
        $scope.entity.DateBirth=$scope.emp.DateBirth;
        $scope.entity.Email=$scope.emp.Email;
        $scope.entity.Phone1=$scope.emp.Phone1;
         
        $scope.entity.PassportNumber=$scope.emp.PassportNumber;
        $scope.entity.DatePassportIssue=$scope.emp.DatePassportIssue;
        $scope.entity.DatePassportExpire=$scope.emp.DatePassportExpire;
        $scope.entity.Address=$scope.emp.Address;
        $scope.entity.CityId=$scope.emp.CityId;
        $scope.entity.PostalCode=$scope.emp.PostalCode;
        $scope.entity.VisaExpireDate=$scope.emp.VisaExpireDate;


        $scope.entity.GroupId=$scope.emp.GroupId;
        $scope.entity.LinkedIn=$scope.emp.LinkedIn;
        $scope.entity.WhatsApp=$scope.emp.WhatsApp;
        $scope.entity.Telegram = $scope.emp.Telegram;

    };
    //////////////////////////////////////////////
    $scope.txt_FirstName = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.FirstName',
            readOnly: 'IsMainDisabled',
        }
    };
    $scope.txt_LastName = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.LastName',
            readOnly: 'IsMainDisabled',
        }
    };

    $scope.txt_Address = {
        hoverStateEnabled: false,
        height:90,
        bindingOptions: {
            value: 'entity.Address',
            readOnly: 'IsMainDisabled',
        }
    };
    $scope.txt_PassportNumber = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.PassportNumber',
            readOnly: 'IsMainDisabled',
        }
    };

    $scope.txt_Mobile = {


        hoverStateEnabled: false,
        mask: "AB00-0000000",
        maskRules: {
            "A": /[0]/,
            "B": /[9]/,

        },
        maskChar: '_',
        maskInvalidMessage: 'Wrong value',

        bindingOptions: {
            value: 'entity.Mobile',
            readOnly: 'IsMainDisabled',
        }
    };
     
    $scope.emailValidationRules = {
        validationRules: [  {
            type: "email",
            message: "Email is invalid"
        } 
        ]
    };
    $scope.txt_Email = {
        mode: 'email',
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Email',
            readOnly: 'IsMainDisabled',
        }
    };
    $scope.txt_phone = {
        readOnly: false,
        hoverStateEnabled: false,

        mask: "A00000009999",
        maskRules: {
            "A": /[0]/,


        },
        maskChar: ' ',
        maskInvalidMessage: 'Wrong value',
        rtlEnabled: false,
        bindingOptions: {
            value: 'entity.Phone1',
            readOnly: 'IsMainDisabled',
        }
    };
    $scope.date_DateBirth = {
        width: '100%',
        type: 'date',
        pickerType: "rollers",

        bindingOptions: {
            value: 'entity.DateBirth',
            readOnly: 'IsMainDisabled',
        }
    };
    $scope.date_VisaExpireDate = {
        width: '100%',
        type: 'date',
        displayFormat: $rootScope.DateBoxFormat,
        bindingOptions: {
            value: 'entity.VisaExpireDate',
            readOnly: 'IsMainDisabled',
        }
    };



    $scope.date_DatePassportIssue = {
        width: '100%',
        type: 'date',
        displayFormat: $rootScope.DateBoxFormat,
        bindingOptions: {
            value: 'entity.DatePassportIssue',
            readOnly: 'IsMainDisabled',
        }
    };
    $scope.date_DatePassportExpire = {
        width: '100%',
        type: 'date',
        pickerType: "rollers",

        bindingOptions: {
            value: 'entity.DatePassportExpire',

        }
    };
    
    $scope.positions = [
       { id: 1025, title: 'TRE' }, { id: 1024, title: 'TRI' }, { id: 1026, title: 'LTC' }, { id: 1023, title: 'P1' }, { id: 1019, title: 'P2' }, { id: 1028, title: 'ISCCM' }, { id: 1030, title: 'SCCM' }, { id: 1031, title: 'CCM' }
    ];
    $scope.sb_group = {
        showClearButton: false,
        searchEnabled: true,
        dataSource: $scope.positions,
         
        displayExpr: "title",
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.GroupId',
            readOnly: 'IsMainDisabled',
        }
    };
    $scope.sb_city = {
        showClearButton: true,
        searchEnabled: true,
        dataSource: $rootScope.getDatasourceCityByCountry(103),
        displayExpr: "FullName",
        valueExpr: 'Id',
        bindingOptions: {
            value: 'entity.CityId',
            readOnly: 'IsMainDisabled',
        }
    };
    $scope.sb_Sex = {
        showClearButton: true,
        searchEnabled: true,
        dataSource: $rootScope.getDatasourceOption(29),
        displayExpr: "Title",
        valueExpr: 'Id',
        bindingOptions: {
            value: 'entity.SexId',
            readOnly: 'IsMainDisabled',
        }
    };

    $scope.sb_CityId = {
        showClearButton: true,
        width: '100%',
        searchEnabled: true,

        dataSource: new DevExpress.data.DataSource({
            store: new DevExpress.data.ODataStore({
                url: $rootScope.serviceUrl + 'odata/cities/all',
                version: 4
            }),
            sort: ['City'],
        }),
        searchExpr: ["City", "Country"],
        valueExpr: "Id",
        searchMode: 'startsWith',
        displayExpr: "FullName",
        bindingOptions: {
            value: 'entity.CityId',
        }

    };

    $scope.txt_nid = {

        valueChangeEvent: 'keyup',
        readOnly: false,
        hoverStateEnabled: false,

        mask: "999-999999-9",

        maskInvalidMessage: 'Wrong value',
        bindingOptions: {
            value: 'entity.NID',
            readOnly: 'IsNIDDisabled'
        }
    };

    $scope.txt_PostalCode = {
        hoverStateEnabled: false,
        mask: "9999999999",
        bindingOptions: {
            value: 'entity.PostalCode',
            readOnly: 'IsMainDisabled',
        }
    };

    $scope.sb_Base = {

        showClearButton: false,
        searchEnabled: true,
        dataSource: $rootScope.getDatasourceAirport(),

        onSelectionChanged: function (arg) {

            // $scope.getIrRoute();
        },
        searchExpr: ["IATA", "Country", "SortName", "City"],
        displayExpr: "IATA",
        valueExpr: 'Id',
        bindingOptions: {
            value: 'entity.BaseAirportId',


        }
    };

    $scope.txt_LinkedIn = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.LinkedIn',

        }
    };
    $scope.txt_WhatsApp = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.WhatsApp',

        }
    };
    $scope.txt_Telegram = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Telegram',

        }
    };
    ///////////////////////////////////////////
    $scope.popup_profile_visible = false;

    $scope.popup_profile = {
        title: 'Profile',
        fullScreen: true,
        showTitle: true,
        dragEnabled: false,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Save', icon: 'check', useSubmitBehavior: true, validationGroup: 'profileupd',
                    onClick: function (e) {
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            //   General.ShowNotify('Please fill in all required fields.', 'error');
                            return;
                        }
                        
                        $scope.doRefresh = true;
                        var _bd = $scope.entity.DateBirth;
                        var _pe = $scope.entity.DatePassportExpire;
                        

                        var bd_dates = (new Date(_bd)).getDatePartArray();
                        
                        var bd = new Date(bd_dates[0], bd_dates[1], bd_dates[2], 12, 0, 0, 0);

                        var pe_dates = (new Date(_pe)).getDatePartArray();
                       
                        var pe = new Date(pe_dates[0], pe_dates[1], pe_dates[2], 12, 0, 0, 0);
                        $scope.entity.DateBirth=(new Date(bd)).toUTCString();
                        $scope.entity.DatePassportExpire = (new Date(pe)).toUTCString();
                        

                        $scope.loadingVisible = true;
                        generalService.updateProfile($scope.entity).then(function (response) {
                            $rootScope.userTitle = $scope.entity.FirstName + ' ' + $scope.entity.LastName;
                            $scope.loadingVisible = false;
                            $scope.popup_profile_visible = false;
                             

                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                        

                         

                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
                        $scope.popup_profile_visible = false;
                    }
                }, toolbar: 'bottom'
            }
        ],

        visible: false,

        closeOnOutsideClick: false,
        onShowing: function (e) {


        },
        onShown: function (e) {

        },
        onHiding: function () {
            //$scope.clearNewFlight();
            if ($scope.doRefresh) {
                $scope.doRefresh = false;
                $scope.bind();
            }

        },
        bindingOptions: {
            visible: 'popup_profile_visible',

        }
    };

    ////////////////////////////////////////////////
    $scope.scroll_height = 200;
    $scope.scroll_profile = {
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

    $scope.resize = function () {

        $scope.scroll_height = $(window).height() - 45 - 45;
    };

    $(window).resize(function () {
        $scope.$apply(function () {
            $scope.resize();

        });

    });
    $scope.data = null;
    $scope.emp = null;
    $scope.types = [];
    $scope.bindACTypes = function () {
        
        $scope.types = [];
       
        generalService.getACTypeCertifications($rootScope.employeeId).then(function (response) {

            $scope.loadingVisible = false;
            response = Enumerable.From(response).OrderBy('$.Expiring').ThenBy('$.Remain').ToArray();
            var tmp1 = [1187, 1188, 1189, 1190, 1191, 1192, 1194, 1195, 1202, 1182];
            $.each(response, function (_i, _d) {
                if (tmp1.indexOf(_d.TypeId) != -1)
                    _d.tmp = 1;
                else
                    _d.tmp = _d.TypeId;
            });
            $scope.types = response;
             

        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    $scope.cmc = [];
    $scope.bindCMC = function () {

        $scope.cmc = [];

        generalService.getCMCCertifications($rootScope.employeeId).then(function (response) {

            $scope.loadingVisible = false;
            response = Enumerable.From(response).OrderBy('$.Expiring').ThenBy('$.Remain').ToArray();
            var tmp1 = [1187, 1188, 1189, 1190, 1191, 1192, 1194, 1195, 1202, 1182];
            $.each(response, function (_i, _d) {
                if (tmp1.indexOf(_d.TypeId) != -1)
                    _d.tmp = 1;
                else
                    _d.tmp = _d.TypeId;
            });
            $scope.cmc = response;


        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };

    $scope.getRemainClass = function (item) {
        if (item.Remain <= 0)
            return 'expired';
        else if (item.Remain <= 30)
            return 'expiring';
        else return '';

    };

    $scope.bind = function () {
        $scope.loadingVisible = true;
        generalService.getProfile($rootScope.employeeId).then(function (response) {
            $scope.loadingVisible = false;
            console.log(response);
            $scope.data = response;
            $scope.emp = response.Employee;
            $scope.bindACTypes();
            $scope.bindCMC();
            ////////////////////////
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };


    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'Profile';
        $scope.resize();
        $('.profile').fadeIn();
        $scope.bind();

        //$scope.bind();
    }
    /////////////////////////////////////////
    $scope.$on('edit_profile', function (event, prms) {
        $scope.doRefresh = false;
        $scope.fillEntity();
        $scope.popup_profile_visible = true;
    });


    ///////////////////////////////////
}]);
