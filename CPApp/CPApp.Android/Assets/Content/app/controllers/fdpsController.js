'use strict';
app.controller('fdpsController', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', '$route', '$timeout', 'flightService', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, $route, $timeout, flightService) {
    //test
    //flightService.getSun().then(function (response) {
    //    $scope.loadingVisible = false;
    //    General.ShowNotify(Config.Text_SavedOk, 'success');

    //    console.log(response);




    //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    $scope.isContentVisible = true;
    $scope.IsDutyVisible = false;
    $scope.bindFrom2 = new Date($rootScope.bindFrom);
    $scope.bindTo2 = new Date($rootScope.bindTo);
    //////////////////////////////
    $scope.prms = $routeParams.prms;
    $scope.firstBind = true;
    $scope.active = $route.current.type;

    $scope.title = null;
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
    ///////////////////////////////////////////////
    var tabs = [
      { text: "Total", id: 'total' },
      { text: "Detail", id: 'detail' },
    ];
    $scope.tabs = tabs;

    $scope.$watch("selectedTabIndex", function (newValue) {
        $('.tabfdps').hide();
        var id = tabs[newValue].id;
        $('#' + id).fadeIn(400, function () {
            var scroll_total = $("#scrollviewfdpstotal").dxScrollView().dxScrollView("instance");
            scroll_total.scrollBy(1);

            var scroll_detail = $("#scrollviewfdps").dxScrollView().dxScrollView("instance");
            scroll_detail.scrollBy(1);

        });


    });
    $scope.tabs_options = {


        onItemClick: function (arg) {
            //$scope.selectedTab = arg.itemData;

        },
        bindingOptions: {

            dataSource: { dataPath: "tabs", deep: true },
            selectedIndex: 'selectedTabIndex'
        }

    };
    $scope.selectedTabIndex = 0;
    /////////////////////////////////////////////////

    //////////////////////////////////////////////////
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
                    type: 'success', text: 'OK', icon: 'check', useSubmitBehavior: true, validationGroup: 'fdpsfilter',
                    onClick: function (e) {
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            //   General.ShowNotify('Please fill in all required fields.', 'error');
                            return;
                        }
                        $scope.bindFrom2 = new Date($scope.filterFrom);
                        $scope.bindTo2 = new Date($scope.filterTo);
                        //$scope.bind();
                        $scope.cacheRender = false;
                        $scope.bindFlights();
                        $scope.popup_filter_visible = false;



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
            $scope.filterFrom = new Date($scope.bindFrom2);
            $scope.filterTo = new Date($scope.bindTo2);

        },
        onShown: function (e) {

        },
        onHiding: function () {



        },
        bindingOptions: {
            visible: 'popup_filter_visible',



        }
    };
    $scope.periodClick = function (d) {
        d--;
        $scope.filterFrom = (new Date($scope.filterTo)).addDays(-d);

    };
    //////////////////////////////////////////////////

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


    $scope.scroll_main_total = {
        width: '100%',
        bounceEnabled: true,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        useNative: false,
        refreshingText: 'Updating...',
        onPullDown: function (options) {

            options.component.release();

        },
        bindingOptions: { height: 'scroll_height', }
    };




    $scope.loadingVisible = false;
    $scope.loadPanel = {
        message: 'Please wait...',

        showIndicator: true,
        showPane: true,
        shading: false,
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

    /// NEW DUTY //////////////////////
    $scope.newDuty = {
        type: null,
        start: null,
        end: null,
        remark: null,
        airline: null,
        Id: -1,
    };
    $scope.sb_airline = {
        showClearButton: false,
        searchEnabled: false,
        dataSource: $rootScope.getDatasourceAirline(),

        onSelectionChanged: function (arg) {

            // $scope.getIrRoute();
        },
        searchExpr: ["Title"],
        displayExpr: "Title",
        valueExpr: 'Id',
        bindingOptions: {
            value: 'newDuty.airline',


        }
    };
    $scope.sb_duty = {
        showClearButton: false,
        searchEnabled: false,
        dataSource: $rootScope.getDatasourceDuty(),

        onSelectionChanged: function (arg) {

            // $scope.getIrRoute();
        },
        searchExpr: ["Title"],
        displayExpr: "Title",
        valueExpr: 'Id',
        bindingOptions: {
            value: 'newDuty.type',


        }
    };
    $scope.txt_remark = {
        height: 100,
        bindingOptions: {
            value: 'newDuty.remark',
        }
    };
    $scope.dateStart = new Date();
    $scope.dateEnd = new Date();
    $scope.timeStart = new Date();
    $scope.timeEnd = new Date();
    $scope.date_start = {
        //placeholder: "Enter Flight Date",
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        onValueChanged: function (e) {
            $scope.startChanged();
        },
        bindingOptions: {
            value: 'dateStart'
        }
    };
    $scope.startChanged = function () {
        $scope.dateEnd = $scope.dateStart;
    };
    $scope.time_start = {
        type: "time",
        pickerType: "rollers",

        bindingOptions: {
            value: 'timeStart',
        }
    };
    $scope.date_end = {
        //placeholder: "Enter Flight Date",
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        bindingOptions: {
            value: 'dateEnd'
        }
    };
    $scope.time_end = {
        type: "time",
        pickerType: "rollers",
        onValueChanged: function (e) {

        },
        bindingOptions: {
            value: 'timeEnd',
        }
    };
    ///////////////////////////////////
    $scope.popup_duty_visible = false;
    $scope.popup_duty = {
        title: 'Duty',
        // width: 350,
        // height: 500,
        fullScreen: true,
        showTitle: true,
        dragEnabled: false,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Save', icon: 'check', useSubmitBehavior: true, validationGroup: 'fdpsduty',
                    onClick: function (e) {
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            //   General.ShowNotify('Please fill in all required fields.', 'error');
                            return;
                        }

                        $scope.doRefresh = true;

                        var dtstart = (new Date($scope.dateStart)).getDatePartArray();
                        var tistart = (new Date($scope.timeStart)).getTimePartArray();
                        var start = new Date(dtstart[0], dtstart[1], dtstart[2], tistart[0], tistart[1], 0, 0);
                        start = (new Date(start)).toUTCString();

                        var dtend = (new Date($scope.dateEnd)).getDatePartArray();
                        var tiend = (new Date($scope.timeEnd)).getTimePartArray();
                        var end = new Date(dtend[0], dtend[1], dtend[2], tiend[0], tiend[1], 0, 0);
                        end = (new Date(end)).toUTCString();

                        $scope.newDuty.start = start;
                        $scope.newDuty.end = end;

                        var dto = {
                            Id: $scope.newDuty.Id,
                            Start: start,
                            End: end,

                            Remark: $scope.newDuty.remark,

                            CrewId: $rootScope.employeeId,

                            Type: $scope.newDuty.type,
                            Airline: $scope.newDuty.airline
                        };



                        $scope.loadingVisible = true;
                        flightService.saveDuty(dto).then(function (response) {
                            console.log(response);
                            $scope.loadingVisible = false;
                            $rootScope.clearcacheFDPS();
                            $scope.bindFlights();
                            $scope.popup_duty_visible = false;

                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });



                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
                        $scope.popup_duty_visible = false;
                    }
                }, toolbar: 'bottom'
            }
        ],

        visible: false,

        closeOnOutsideClick: false,
        onShowing: function (e) {
            //if ($scope.fdp.ReportingTimeLocal) {
            //    $scope.rtdate = new Date($scope.fdp.ReportingTimeLocal);
            //    $scope.rttime = new Date($scope.fdp.ReportingTimeLocal);
            //} else if ($scope.fdp.DutyStartLocal) {
            //    $scope.rtdate = new Date($scope.fdp.DutyStartLocal);
            //    $scope.rttime = new Date($scope.fdp.DutyStartLocal);
            //}
            //else {

            //}

        },
        onShown: function (e) {

        },
        onHiding: function () {
            //$scope.rtdate = null;
            //$scope.rttime = null;
            //if ($scope.doRefresh) {
            //    $scope.doRefresh = false;
            //    //  $scope.bindFDP();
            //}

            $scope.newDuty = {
                type: null,
                start: null,
                end: null,
                remark: null,
                airline: null,
                Id: -1,
            };
            $scope.dateStart = new Date();
            $scope.dateEnd = new Date();
            $scope.timeStart = new Date();
            $scope.timeEnd = new Date();


        },
        bindingOptions: {
            visible: 'popup_duty_visible',



        }
    };

    $scope.formatDate = function (dt) {
        return moment(new Date(dt)).format('MMM-DD-YYYY').toUpperCase();
    };

    $scope.btn_filter = {
        text: 'Filter',
        type: 'default',
        icon: 'filter',
        width: '100%', //37,
        height: 30,
        onClick: function (e) {
           
              $scope.popup_filter_visible = true;
        }
    };
    $scope.selectedItem = null;
    $scope.itemClick = function ($event, x) {
        if (x.DutyType != 1165) {
            $scope.itemClick($event, x);
        }
        else
            $location.path("/fdp/" + x.Id);
        //$scope.selectedItem = null;
        //var has = $($event.currentTarget).hasClass('tile-selected');
        //$('.lib-cer').removeClass('tile-selected');
        //if (!has) {

        //    $($event.currentTarget).addClass('tile-selected');
        //    $scope.selectedItem = x;
        //}

        //if ($scope.selectedItem && $scope.selectedItem.AirPocket == false)
        //    $rootScope.$broadcast('ShowEditCertificate', null);
        //else
        //    $rootScope.$broadcast('HideEditCertificate', null);

    };
    $scope.dutyClick = function ($event, x) {

        $scope.newDuty = {
            type: x.DutyType,
            start: new Date(x.DutyStartLocal),
            end: new Date(x.DutyEndLocal),
            remark: x.Remark,
            airline: x.CustomerId,
            Id: x.Id,
        };
        $scope.dateStart = new Date(x.DutyStartLocal);
        $scope.timeStart = new Date(x.DutyStartLocal);
        $scope.dateEnd = new Date(x.DutyEndLocal);
        $scope.timeEnd = new Date(x.DutyEndLocal);

        $scope.popup_duty_visible = true;
        //$location.path("/fdp/" + x.Id);
        //$scope.selectedItem = null;
        //var has = $($event.currentTarget).hasClass('tile-selected');
        //$('.lib-cer').removeClass('tile-selected');
        //if (!has) {

        //    $($event.currentTarget).addClass('tile-selected');
        //    $scope.selectedItem = x;
        //}

        //if ($scope.selectedItem && $scope.selectedItem.AirPocket == false)
        //    $rootScope.$broadcast('ShowEditCertificate', null);
        //else
        //    $rootScope.$broadcast('HideEditCertificate', null);

    };
    $scope.getOverFDPClass = function (f) {
        var cls = '';
        if (!f || !f.FDP)
            return '';
        if (f.FDP > f.MaxFDPExtended)
            cls = 'fdp-over';
        return cls;
    };
    $scope.fdps = null;
    $scope.data = {
        count: '...',
        total: null,
        legs: '...',
        bl: null,
        nightto: '...',
        nightla: '...',
        dayto: '...',
        dayla: '...',
    };
    $scope.dateRef = null;
    $scope.date_ref = {
        //placeholder: "Enter Flight Date",
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        onValueChanged: function (e) {
            // $scope.bindFTL();
        },
        readOnly: true,
        bindingOptions: {
            value: 'dateRef'
        }
    };
    $scope.d7style = {
        display: 'inline-block',
    };
    $scope.yfstyle = {
        display: 'inline-block',
    };
    $scope.fstyle = {
        display: 'inline-block',
    };
    $scope.cyfstyle = {
        display: 'inline-block',
        'margin-left': '5px',
    };
    ////////////////////////
    $scope.d14style = {
        display: 'inline-block',
        'margin-left': '5px',
    };
    $scope.d28style = {
        display: 'inline-block',
        'margin-left': '5px',
    };
    $scope.d7 = null;
    $scope.d14 = null;
    $scope.d28 = null;

    $scope.f = null;
    $scope.yf = null;
    $scope.cyf = null;
    $scope.bindDuties = function () {
        var dt = $scope.bindTo2;
        var df = $scope.bindFrom2;
        var id = $rootScope.employeeId;
        $scope.dateRef = new Date(dt);
        flightService.getCrewFDPsDuties(id, df, dt).then(function (response) {

            $scope.isContentVisible = true;
            var scroll_total = $("#scrollviewfdpstotal").dxScrollView().dxScrollView("instance");
            scroll_total.scrollBy(1);
            var scroll_detail = $("#scrollviewfdps").dxScrollView().dxScrollView("instance");
            scroll_detail.scrollBy(1);
            //////////////////////////
            $scope.fdps = response.duties;
            $scope.data.dt = $scope.bindTo2;
            $scope.data.df = $scope.bindFrom2;
            $scope.data.duties = response.duties;
            $scope.data.grps = response.grps;
            $scope.data.total = response.total;
            $scope.data.count = response.count;
            $scope.data.period = response.period + 1;
            $scope.data.bl = response.bl;
            $scope.data.fl = response.fl;

            ///////////////////////
            $scope.bindFTL();

            var scroll_main = $("#scrollviewfdps").dxScrollView().dxScrollView("instance");
            scroll_main.scrollBy(1);

        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    }
    $scope.bindFlights = function () {
        var dt = $scope.bindTo2;
        var df = $scope.bindFrom2;
        var id = $rootScope.employeeId;
        $scope.dateRef = new Date(dt);
        $scope.loadingVisible = true;
        flightService.getCrewFDPsFlights(id, df, dt).then(function (response) {
            $scope.loadingVisible = false;
            $scope.isContentVisible = true;
            var scroll_total = $("#scrollviewfdpstotal").dxScrollView().dxScrollView("instance");
            scroll_total.scrollBy(1);
            var scroll_detail = $("#scrollviewfdps").dxScrollView().dxScrollView("instance");
            scroll_detail.scrollBy(1);
            //////////////////////////
            //period = dto.Subtract(dfrom).Days,

            //    legs = flights.Count(),
            //    dayto = flights.Where(q => q.DayTakeOff == 1).Count(),
            //    dayla = flights.Where(q => q.DayLanding == 1).Count(),
            //    nightto = flights.Where(q => q.NightTakeOff == 1).Count(),
            //    nightla = flights.Where(q => q.NightLanding == 1).Count(),
            $scope.data.dt = $scope.bindTo2;
            $scope.data.df = $scope.bindFrom2;
            $scope.data.legs = response.legs;
            $scope.data.dayto = response.dayto;
            $scope.data.dayla = response.dayla;
            $scope.data.nightto = response.nightto;
            $scope.data.period = response.period + 1;
            $scope.data.nightla = response.nightla;


            ///////////////////////


            var scroll_main = $("#scrollviewfdps").dxScrollView().dxScrollView("instance");
            scroll_main.scrollBy(1);

            $scope.dutyGaugeIns.render();
            $scope.yflightGaugeIns.render();
            $scope.flightGaugeIns.render();


            $scope.bindDuties();
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    }
    $scope.bindFTL = function () {
        var dt = $scope.bindTo2;
        var df = $scope.bindFrom2;
        var id = $rootScope.employeeId;
        $scope.dateRef = new Date(dt);
        $scope.loadingVisible = true;
        flightService.getCrewFDPsFTL(id, df, dt).then(function (response) {
            $scope.loadingVisible = false;
            $scope.isContentVisible = true;
            var scroll_total = $("#scrollviewfdpstotal").dxScrollView().dxScrollView("instance");
            scroll_total.scrollBy(1);
            var scroll_detail = $("#scrollviewfdps").dxScrollView().dxScrollView("instance");
            scroll_detail.scrollBy(1);
            //////////////////////////
            $scope.data.dt = $scope.bindTo2;
            $scope.data.df = $scope.bindFrom2;
            $scope.data.period = response.period + 1;
            $scope.data.ftl = response.ftl;
            ///////////////////////////////
            $scope.gDuties = [];
            $scope.gDutyColors = [];
            $scope.Flights = [];
            $scope.YFlights = [];
            $scope.YFlightsColors = [];
            $scope.FlightsColors = [];
            var f = response.ftl.Day28_Flight / 60.0;
            $scope.f = $rootScope.formatMinutes(response.ftl.Day28_Flight);
            $scope.Flights.push(f);
            var fcolor = '#1ac6ff';
            if (response.ftl.Day28_Flight >= 0.85 * 100 * 60)
                fcolor = "#ff8c1a";
            if (response.ftl.Day28_Flight >= 100 * 60)
                fcolor = "#e62e00";
            $scope.FlightsColors.push(fcolor);
            $scope.fstyle.color = fcolor;



            var yf = response.ftl.Year_Flight / 60.0;
            $scope.yf = $rootScope.formatMinutes(response.ftl.Year_Flight);
            var cyf = response.ftl.CYear_Flight / 60.0;
            $scope.cyf = $rootScope.formatMinutes(response.ftl.CYear_Flight);

            $scope.YFlights.push(yf);
            var yfcolor = '#1aff1a';
            if (response.ftl.Year_Flight >= 0.85 * 1000 * 60)
                yfcolor = "#ff9933";
            if (response.ftl.Year_Flight >= 1000 * 60)
                yfcolor = "#ff0000";
            $scope.YFlightsColors.push(yfcolor);
            $scope.yfstyle.color = yfcolor;

            $scope.YFlights.push(cyf);
            var cyfcolor = '#00e699';
            if (response.ftl.CYear_Flight >= 0.85 * 900 * 60)
                cyfcolor = "#ffcc00";
            if (response.ftl.CYear_Flight >= 900 * 60)
                cyfcolor = "#cc0052";
            $scope.YFlightsColors.push(cyfcolor);
            $scope.cyfstyle.color = cyfcolor;
            ////////////////////////////////
            //////////////////////////////
            var d7 = response.ftl.Day7_Duty / 60.0;
            $scope.d7 = $rootScope.formatMinutes(response.ftl.Day7_Duty);
            var d14 = response.ftl.Day14_Duty / 60.0;
            $scope.d14 = $rootScope.formatMinutes(response.ftl.Day14_Duty);
            var d28 = response.ftl.Day28_Duty / 60.0;
            $scope.d28 = $rootScope.formatMinutes(response.ftl.Day28_Duty);

            $scope.gDuties.push(d28);
            var d28color = '#5c85d6';
            if (response.ftl.Day28_Duty >= 0.85 * 190 * 60)
                d28color = "#e68a00";
            if (response.ftl.Day28_Duty >= 190 * 60)
                d28color = "#b30000";
            $scope.gDutyColors.push(d28color);
            $scope.d28style.color = d28color;

            $scope.gDuties.push(d14);
            var d14color = '#00cc99';
            if (response.ftl.Day14_Duty >= 0.85 * 110 * 60)
                d14color = "#ff8000";
            if (response.ftl.Day14_Duty >= 110 * 60)
                d14color = "#cc0052";
            $scope.gDutyColors.push(d14color);
            $scope.d14style.color = d14color;

            $scope.gDuties.push(d7);
            var d7color = '#0099ff';
            if (response.ftl.Day7_Duty >= 0.85 * 60 * 60)
                d7color = "#ffaa00";
            if (response.ftl.Day7_Duty >= 60 * 60)
                d7color = "#ff3300";
            $scope.gDutyColors.push(d7color);
            $scope.d7style.color = d7color;

            /////////////////////////////////
            $scope.dutyGaugeIns.render();
            $scope.yflightGaugeIns.render();
            $scope.flightGaugeIns.render();


            ///////////////////////


            var scroll_main = $("#scrollviewfdps").dxScrollView().dxScrollView("instance");
            scroll_main.scrollBy(1);

            $rootScope.clearcacheFDPS();
            $rootScope.cacheFDPS($scope.data);



        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };

    $scope.cacheRender = false;
    $scope.bindFromCache = function (_data) {
        $scope.cacheRender = true;
        $scope.bindFrom2 = new Date(_data.df);
        $scope.bindTo2 = new Date(_data.dt);
        $scope.dateRef = new Date(_data.dt);
        //Duties////////
        $scope.fdps = _data.duties;
        $scope.data.dt = new Date($scope.bindTo2);
        $scope.data.df = new Date($scope.bindFrom2);
        $scope.data.duties = _data.duties;
        $scope.data.grps = _data.grps;
        $scope.data.total = _data.total;
        $scope.data.count = _data.count;
        $scope.data.period = _data.period + 1;
        $scope.data.bl = _data.bl;
        $scope.data.fl = _data.fl;
        ///Flights/////////////


        $scope.data.legs = _data.legs;
        $scope.data.dayto = _data.dayto;
        $scope.data.dayla = _data.dayla;
        $scope.data.nightto = _data.nightto;
        $scope.data.period = _data.period + 1;
        $scope.data.nightla = _data.nightla;
        ////FTL//////////////////////
        $scope.IsDutyVisible = true;
        setTimeout(function () {
            $scope.gDuties = [];
            $scope.gDutyColors = [];
            $scope.Flights = [];
            $scope.YFlights = [];
            $scope.YFlightsColors = [];
            $scope.FlightsColors = [];
            var f = _data.ftl.Day28_Flight / 60.0;
            $scope.f = $rootScope.formatMinutes(_data.ftl.Day28_Flight);
            $scope.Flights.push(f);
            var fcolor = '#1ac6ff';
            if (_data.ftl.Day28_Flight >= 0.85 * 100 * 60)
                fcolor = "#ff8c1a";
            if (_data.ftl.Day28_Flight >= 100 * 60)
                fcolor = "#e62e00";
            $scope.FlightsColors.push(fcolor);
            $scope.fstyle.color = fcolor;



            var yf = _data.ftl.Year_Flight / 60.0;
            $scope.yf = $rootScope.formatMinutes(_data.ftl.Year_Flight);
            var cyf = _data.ftl.CYear_Flight / 60.0;
            $scope.cyf = $rootScope.formatMinutes(_data.ftl.CYear_Flight);

            $scope.YFlights.push(yf);
            var yfcolor = '#1aff1a';
            if (_data.ftl.Year_Flight >= 0.85 * 1000 * 60)
                yfcolor = "#ff9933";
            if (_data.ftl.Year_Flight >= 1000 * 60)
                yfcolor = "#ff0000";
            $scope.YFlightsColors.push(yfcolor);
            $scope.yfstyle.color = yfcolor;

            $scope.YFlights.push(cyf);
            var cyfcolor = '#00e699';
            if (_data.ftl.CYear_Flight >= 0.85 * 900 * 60)
                cyfcolor = "#ffcc00";
            if (_data.ftl.CYear_Flight >= 900 * 60)
                cyfcolor = "#cc0052";
            $scope.YFlightsColors.push(cyfcolor);
            $scope.cyfstyle.color = cyfcolor;
            ////////////////////////////////
            //////////////////////////////
            var d7 = _data.ftl.Day7_Duty / 60.0;
            $scope.d7 = $rootScope.formatMinutes(_data.ftl.Day7_Duty);
            var d14 = _data.ftl.Day14_Duty / 60.0;
            $scope.d14 = $rootScope.formatMinutes(_data.ftl.Day14_Duty);
            var d28 = _data.ftl.Day28_Duty / 60.0;
            $scope.d28 = $rootScope.formatMinutes(_data.ftl.Day28_Duty);

            $scope.gDuties.push(d28);
            var d28color = '#5c85d6';
            if (_data.ftl.Day28_Duty >= 0.85 * 190 * 60)
                d28color = "#e68a00";
            if (_data.ftl.Day28_Duty >= 190 * 60)
                d28color = "#b30000";
            $scope.gDutyColors.push(d28color);
            $scope.d28style.color = d28color;

            $scope.gDuties.push(d14);
            var d14color = '#00cc99';
            if (_data.ftl.Day14_Duty >= 0.85 * 110 * 60)
                d14color = "#ff8000";
            if (_data.ftl.Day14_Duty >= 110 * 60)
                d14color = "#cc0052";
            $scope.gDutyColors.push(d14color);
            $scope.d14style.color = d14color;

            $scope.gDuties.push(d7);
            var d7color = '#0099ff';
            if (_data.ftl.Day7_Duty >= 0.85 * 60 * 60)
                d7color = "#ffaa00";
            if (_data.ftl.Day7_Duty >= 60 * 60)
                d7color = "#ff3300";
            $scope.gDutyColors.push(d7color);
            $scope.d7style.color = d7color;

            /////////////////////////////////
              $scope.dutyGaugeIns.render();
              $scope.yflightGaugeIns.render();
              $scope.flightGaugeIns.render();


            ///////////////////////
        }, 500);
       
       
        ////////////////////////
        $scope.isContentVisible = true;
        //var scroll_total = $("#scrollviewfdpstotal").dxScrollView().dxScrollView("instance");
        //scroll_total.scrollBy(1);
        //var scroll_detail = $("#scrollviewfdps").dxScrollView().dxScrollView("instance");
        //scroll_detail.scrollBy(1);
        //var scroll_main = $("#scrollviewfdps").dxScrollView().dxScrollView("instance");
        //scroll_main.scrollBy(1);
        ///////////////////////

    };

    $scope.bind = function () {
        $scope.fdps = [];
        var dt = $scope.bindTo2;
        var df = $scope.bindFrom2;
        var id = $rootScope.employeeId;
        $scope.loadingVisible = true;
        flightService.getCrewFDPs(id, df, dt).then(function (response) {
            $scope.isContentVisible = true;
            var scroll_total = $("#scrollviewfdpstotal").dxScrollView().dxScrollView("instance");
            scroll_total.scrollBy(1);

            var scroll_detail = $("#scrollviewfdps").dxScrollView().dxScrollView("instance");
            scroll_detail.scrollBy(1);





            response.period++;
            $scope.loadingVisible = false;
            $scope.gDuties = [];
            $scope.gDutyColors = [];
            $scope.Flights = [];
            $scope.YFlights = [];
            $scope.YFlightsColors = [];
            $scope.FlightsColors = [];
            console.log(response);
            $scope.data = response;
            $scope.fdps = response.duties;
            $scope.dateRef = new Date(dt);
            ////////////////////////////////
            var f = response.ftl.Day28_Flight / 60.0;
            $scope.f = $rootScope.formatMinutes(response.ftl.Day28_Flight);
            $scope.Flights.push(f);
            var fcolor = '#1ac6ff';
            if (response.ftl.Day28_Flight >= 0.85 * 100 * 60)
                fcolor = "#ff8c1a";
            if (response.ftl.Day28_Flight >= 100 * 60)
                fcolor = "#e62e00";
            $scope.FlightsColors.push(fcolor);
            $scope.fstyle.color = fcolor;



            var yf = response.ftl.Year_Flight / 60.0;
            $scope.yf = $rootScope.formatMinutes(response.ftl.Year_Flight);
            var cyf = response.ftl.CYear_Flight / 60.0;
            $scope.cyf = $rootScope.formatMinutes(response.ftl.CYear_Flight);

            $scope.YFlights.push(yf);
            var yfcolor = '#1aff1a';
            if (response.ftl.Year_Flight >= 0.85 * 1000 * 60)
                yfcolor = "#ff9933";
            if (response.ftl.Year_Flight >= 1000 * 60)
                yfcolor = "#ff0000";
            $scope.YFlightsColors.push(yfcolor);
            $scope.yfstyle.color = yfcolor;

            $scope.YFlights.push(cyf);
            var cyfcolor = '#00e699';
            if (response.ftl.CYear_Flight >= 0.85 * 900 * 60)
                cyfcolor = "#ffcc00";
            if (response.ftl.CYear_Flight >= 900 * 60)
                cyfcolor = "#cc0052";
            $scope.YFlightsColors.push(cyfcolor);
            $scope.cyfstyle.color = cyfcolor;
            ////////////////////////////////
            //////////////////////////////
            var d7 = response.ftl.Day7_Duty / 60.0;
            $scope.d7 = $rootScope.formatMinutes(response.ftl.Day7_Duty);
            var d14 = response.ftl.Day14_Duty / 60.0;
            $scope.d14 = $rootScope.formatMinutes(response.ftl.Day14_Duty);
            var d28 = response.ftl.Day28_Duty / 60.0;
            $scope.d28 = $rootScope.formatMinutes(response.ftl.Day28_Duty);

            $scope.gDuties.push(d28);
            var d28color = '#5c85d6';
            if (response.ftl.Day28_Duty >= 0.85 * 190 * 60)
                d28color = "#e68a00";
            if (response.ftl.Day28_Duty >= 190 * 60)
                d28color = "#b30000";
            $scope.gDutyColors.push(d28color);
            $scope.d28style.color = d28color;

            $scope.gDuties.push(d14);
            var d14color = '#00cc99';
            if (response.ftl.Day14_Duty >= 0.85 * 110 * 60)
                d14color = "#ff8000";
            if (response.ftl.Day14_Duty >= 110 * 60)
                d14color = "#cc0052";
            $scope.gDutyColors.push(d14color);
            $scope.d14style.color = d14color;

            $scope.gDuties.push(d7);
            var d7color = '#0099ff';
            if (response.ftl.Day7_Duty >= 0.85 * 60 * 60)
                d7color = "#ffaa00";
            if (response.ftl.Day7_Duty >= 60 * 60)
                d7color = "#ff3300";
            $scope.gDutyColors.push(d7color);
            $scope.d7style.color = d7color;

            /////////////////////////////////
            $scope.dutyGaugeIns.render();
            $scope.yflightGaugeIns.render();
            $scope.flightGaugeIns.render();


            var scroll_main = $("#scrollviewfdps").dxScrollView().dxScrollView("instance");
            scroll_main.scrollBy(1);



        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
        ///////////////////////////////////////
    };
    $scope.gDuties = [];
    $scope.gDutyColors = [];
    $scope.dutyGaugeIns = null;
    $scope.dutyGauge = {
        relativeInnerRadius: 0.5,
        

        size: {
            height: 300,
            
        },
        startValue: 0,
        endValue: 190,
        onInitialized: function (e) {
            if (!$scope.dutyGaugeIns) {
                $scope.dutyGaugeIns = e.component;
                if ($scope.cacheRender) {
                     
                    $scope.dutyGaugeIns.render();
                }

            }
        },
        label: {
            indent: 30,
            format: {
                type: "fixedPoint",
                precision: 1
            },
            font: {
                size: 13,
            },
            customizeText: function (arg) {
                var dvalue = $scope.gDuties[arg.index];
                return $rootScope.formatMinutes(dvalue * 60);;
            }
        },

        //title: {
        //    text: "Duty",
        //    horizontalAlignment: 'left',
        //    margin:{top:-10,bottom:0,left:20,right:10},
        //    font: {
        //        size: 16,
        //        weight:900,
        //    }
        //},
        bindingOptions: {
            values: 'gDuties',
            palette: 'gDutyColors',
        }
    };


    $scope.YFlights = [];
    $scope.YFlightsColors = [];
    $scope.Flights = [];
    $scope.FlightsColors = [];
    $scope.yflightGaugeIns = null;
    $scope.yflightGauge = {
        onInitialized: function (e) {
            if (!$scope.yflightGaugeIns) {
                $scope.yflightGaugeIns = e.component;
                if ($scope.cacheRender)

                    $scope.yflightGaugeIns.render();

            }
        },
        startValue: 0,
        endValue: 1000,
        margin: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },
        size: {
            height: 150,

        },
        label: {
            visible: false
        },
        relativeInnerRadius: 0.5,
        //label: {
        //    indent: 10,
        //    format: {
        //        type: "fixedPoint",
        //        precision: 1
        //    },
        //    font: {
        //        size: 13,
        //    },
        //    customizeText: function (arg) {
        //        var dvalue = $scope.Duties[arg.index];
        //        return $scope.formatMinutes(dvalue * 60); //arg.valueText + " %";
        //    }
        //},

        //title: {
        //    text: "Duty",
        //    horizontalAlignment: 'left',
        //    margin: { top: -10, bottom: 0, left: 20, right: 10 },
        //    font: {
        //        size: 16,
        //        weight: 900,
        //    }
        //},
        bindingOptions: {
            values: 'YFlights',
            palette: 'YFlightsColors',
        }
    };
    $scope.flightGaugeIns = null;
    $scope.flightGauge = {
        onInitialized: function (e) {
            if (!$scope.flightGaugeIns) {
                $scope.flightGaugeIns = e.component;
                if ($scope.cacheRender)

                    $scope.flightGaugeIns.render();
            }
        },
        startValue: 0,
        endValue: 100,
        margin: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },
        size: {
            height: 150,

        },
        label: {
            visible: false
        },
        relativeInnerRadius: 0.8,

        bindingOptions: {
            values: 'Flights',
            palette: 'FlightsColors',
        }
    };



    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'Duties';
        $scope.scroll_height = $(window).height() - 45 - 42 - 70;
        $('.fdps').fadeIn();

        var _data = $rootScope.getFDPS();
        console.log('_data');
        console.log(_data);
        $scope.cacheRender = false;
        if (_data) {
            $scope.bindFromCache(_data);
        }
        else {
            $scope.IsDutyVisible = true;
            $scope.bindFlights();
        }
    }
    //////////////////////////////////////////
    $scope.$on('PageLoaded', function (event, prms) {
        //footerbook
        //  if (prms == 'footer')
        //      $('.footer' + $scope.active).addClass('active');


    });

    $scope.doRefresh = false;






    $scope.isNew = true;

    $scope.$on('new_fdp', function (event, prms) {
        $scope.loadingVisible = true;
        flightService.saveFDP({ crewId: $rootScope.employeeId }).then(function (response) {
            $location.url('/fdp/' + response.Id);

        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


    });
    $scope.$on('new_duty', function (event, prms) {
        $scope.popup_duty_visible = true;
        //$scope.loadingVisible = true;
        //flightService.saveFDP({ crewId: $rootScope.employeeId }).then(function (response) {
        //    $location.url('/fdp/' + response.Id);

        //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


    });
    $scope.$on('delete_fdp', function (event, prms) {
        //General.Confirm(Config.Text_DeleteConfirm, function (res) {
        //    if (res) {
        //        $scope.loadingVisible = true;
        //        generalService.deleteCertification({ Id: $scope.selectedItem.Id }).then(function (response) {
        //            General.ShowNotify(Config.Text_SavedOk, 'success');
        //            $scope.bind();

        //        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        //    }
        //});
    });

    $scope.$on('edit_fdp', function (event, prms) {
        //if (!$scope.selectedItem)
        //    return;
        //if ($scope.selectedItem.Airpocket) {
        //    return;
        //}
        //$scope.newCertificate.Id = $scope.selectedItem.Id;
        //$scope.newCertificate.TypeId = $scope.selectedItem.TypeId;


        //$scope.newCertificate.Description = $scope.selectedItem.Description;
        //$scope.newCertificate.DateIssue = $scope.selectedItem.DateIssue;
        //$scope.newCertificate.DateExpire = $scope.selectedItem.DateExpire;
        //$scope.newCertificate.DateIRValid = $scope.selectedItem.DateIRValid;
        //$scope.newCertificate.AcTypeId = $scope.selectedItem.AcTypeId;
        //$scope.newCertificate.Rating = $scope.selectedItem.Rating;
        //$scope.newCertificate.Class = $scope.selectedItem.Class;
        //$scope.newCertificate.Limitation = $scope.selectedItem.Limitation;
        //$scope.newCertificate.EmployedBy = $scope.selectedItem.EmployedBy;
        //$scope.newCertificate.EmployedById = $scope.selectedItem.EmployedById;
        //$scope.newCertificate.Occupation = $scope.selectedItem.Occupation;
        //$scope.newCertificate.Level = $scope.selectedItem.Level;

        //$scope.newCertificate.AirPocket = false;
        //$scope.newCertificate.No = $scope.selectedItem.No;
        //$scope.newCertificate.Title = $scope.selectedItem.Title;
        //$scope.isNew = false;
        //$scope.popup_newcertificate_visible = true;
    });




    $rootScope.$broadcast('AppLibraryLoaded', null);


}]);
