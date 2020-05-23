'use strict';
app.controller('reportsController', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', '$route', '$timeout', 'flightService', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, $route, $timeout, flightService) {
    //////////////////////////////////////////////
    
    ////////////////////////////////////////////////
    $scope.scroll_height = 200;
    $scope.scroll_reports = {
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
    

    ////////////////////////////////////
    $scope.filterstatus = null;
    $scope.sb_filterstatus = {
        showClearButton: false,
        searchEnabled: true,
        dataSource: Enumerable.From(Flight.statusDataSource).Where('$.selectable').ToArray(),

        displayExpr: "title",
        valueExpr: 'id',
        bindingOptions: {
            value: 'filterstatus',

        }
    };
    $scope.filterAirline = null;
    $scope.sb_filterairline = {
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
            value: 'filterAirline',


        }
    };
    $scope.filterToAirport = null;
    $scope.filterFromAirport = null;
    $scope.sb_filterfrom = {
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
            value: 'filterFromAirport',


        }
    };

    $scope.sb_filterto = {
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
            value: 'filterToAirport',

        }
    };
    $scope.filterTo = null;
    $scope.filterFrom = null;
    $scope.filter_to = {
        //placeholder: "Enter Flight Date",
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        bindingOptions: {
            value: 'filterTo'
        }
    };
    $scope.filter_from = {
        //placeholder: "Enter Flight Date",
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        bindingOptions: {
            value: 'filterFrom'
        }
    };
    ////////////////////////////////////
    $scope.periodClick = function (d) {
        if (d != 12) {
            d--;
            $scope.filterFrom = (new Date($scope.filterTo)).addDays(-d);
        }
        if (d == 12) {
            d--;
            $scope.filterFrom = (new Date($scope.filterTo)).addMonths(-d);
        }


    };
    //////////////////////////////////////
    $scope.popup_filter_visible = false;
    $scope.popup_filter = {
        title: 'Filter',
        width: 350,
        height: 500,
        //fullScreen: true,
        showTitle: true,
        dragEnabled: false,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'OK', icon: 'check', useSubmitBehavior: true, validationGroup: 'reportfilter',
                    onClick: function (e) {
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            //   General.ShowNotify('Please fill in all required fields.', 'error');
                            return;
                        }
                       // $scope.popup_filter_visible = false;
                        //"/reports/viewer/:type/:df/:dt/:from/:to/:airline/:status"
                        var df = (new Date($scope.filterFrom)).yyyymmdd();
                        var dt = (new Date($scope.filterTo)).yyyymmdd();
                         
                       
                      //  $location.path('/reports/viewer/'+$scope.reportType+'/'+df+'/'+dt+'/'+($scope.filterFromAirport?$scope.filterFromAirport:-1)+'/'+($scope.filterToAirport?$scope.filterToAirport:-1)+'/'+($scope.filterAirline?$scope.filterAirline:-1)+'/-1');
                        
                        var url = $rootScope.reportUrl + 'frmReportView.aspx?type=' + $scope.reportType + '&df=' + df + '&dt=' + dt + '&airline='
                          + ($scope.filterAirline ? $scope.filterAirline : -1)
                                + '&status=15&from='
                                + ($scope.filterFromAirport ? $scope.filterFromAirport : -1)
                                + '&to='
                               + ($scope.filterToAirport ? $scope.filterToAirport : -1)
                                + "&id="
                                + $rootScope.employeeId;
                        var dto = {
                            type: 'report',
                            value: url,
                        };
                        invokeCSCode(JSON.stringify(dto));
                        
                        



                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
                        $scope.popup_filter_visible = false;
                    }
                }, toolbar: 'bottom'
            }
        ],

        visible: false,

        closeOnOutsideClick: false,
        onShowing: function (e) {
            $scope.filterFrom = new Date($rootScope.bindFrom);
            $scope.filterTo = new Date($rootScope.bindTo);

        },
        onShown: function (e) {

        },
        onHiding: function () {



        },
        bindingOptions: {
            visible: 'popup_filter_visible',



        }
    };
    /////////////////////////////////////
    $scope.reportType = 1;
    $scope.showFilter = function (type) {
        $scope.reportType = type;
        $scope.popup_filter_visible = true;
    };

    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'Reports';
        $scope.resize();
        $('.reports').fadeIn();
      

        //$scope.bind();
    }
    /////////////////////////////////////////
   


    ///////////////////////////////////
}]);
