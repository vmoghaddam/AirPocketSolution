'use strict';
app.controller('appFlightController', ['$scope', '$location', '$routeParams', '$rootScope', 'flightService', 'authService', 'notificationService', '$route', function ($scope, $location, $routeParams, $rootScope, flightService, authService, notificationService, $route) {
    $scope.prms = $routeParams.prms;
    $scope.firstBind = true;

    $scope.typeId = null;
    $scope.title = "Calendar";
    ///////////////////////////////
    var detector = new MobileDetect(window.navigator.userAgent);
    console.log("Mobile: " + detector.mobile());
    console.log("Phone: " + detector.phone());
    console.log("Tablet: " + detector.tablet());
    console.log("OS: " + detector.os());
    console.log("userAgent: " + detector.userAgent());
    //////////////////////////
    var tabs = [
       { text: "Tomorrow", id: 'tomorrow' },
       { text: "Today", id: 'today' },
        { text: "All", id: 'all' },


    ];
    $scope.tabs = tabs;
    $scope.tabId = null;
    $scope.$watch("selectedTabIndex", function (newValue) {
        $('.tabc').hide();
        var id = tabs[newValue].id;
        $('#' + id).fadeIn(400, function () {
            var scroll_crew_tomorrow = $("#scroll_crew_tomorrow").dxScrollView().dxScrollView("instance");
            if (scroll_crew_tomorrow)
            scroll_crew_tomorrow.scrollBy(1);

            var scroll_crew_tday = $("#scroll_crew_today").dxScrollView().dxScrollView("instance");
            if (scroll_crew_tday)
            scroll_crew_tday.scrollBy(1);

            var scrltom = $("#scrltom").dxScrollView().dxScrollView("instance");
            scrltom.scrollBy(1);

            var scrltod = $("#scrltod").dxScrollView().dxScrollView("instance");
            scrltod.scrollBy(1);
            
        });
        $scope.tabId = id;
        switch (id) {
            case 'today':
                $scope.bindToday();

                break;
            case 'tomorrow':
                $scope.bindTomorrow();
                break;
            case 'all':
                $scope.buildAcc();
                $scope.bindAll();

                if ($scope.sch_instance)
                    $scope.sch_instance.repaint();
                break;
            default:
                break;
        }

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
    //////////////////////

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
            $scope.bind();
            //Alert.getStartupNots(null, function (arg) {
            //    options.component.release();
            //    // refreshCarts(arg);
            //});
            options.component.release();

        },
        bindingOptions: { height: 'scroll_height', }
    };
    ///////////////////////////
    $scope.scroll_height_all = 100;
    $scope.scroll_all_instance = null;
    $scope.scroll_all = {
        width: '100%',
        bounceEnabled: false,
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
        onInitialized: function (e) {
            //console.log(e.component);
            if (!$scope.scroll_all_instance)
                $scope.scroll_all_instance = e.component;

        },
        bindingOptions: { height: 'scroll_height_all', }
    };

    $scope.scroll_popup = {
        width: '100%',
        bounceEnabled: false,
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
        onInitialized: function (e) {
           

        },
        heigh:'100%',
      //  bindingOptions: { height: 'scroll_height_all', }
    };
    /////////////////////////////
    $scope.scroll_tomorrow = {
        width: '100%',
        bounceEnabled: false,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        useNative: true,
        refreshingText: 'Updating...',
        onPullDown: function (options) {
            
            options.component.release();

        },
        onInitialized: function (e) {


        },
        height: '100%',
         
    };
    $scope.scroll_crew = {
        width: '100%',
        bounceEnabled: false,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        useNative: true,
        refreshingText: 'Updating...',
        onPullDown: function (options) {

            options.component.release();

        },
        onInitialized: function (e) {
            

        },
        height: '100%',

    };
    $scope.scroll_crew_today = {
        width: '100%',
        bounceEnabled: false,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        useNative: true,
        refreshingText: 'Updating...',
        onPullDown: function (options) {

            options.component.release();

        },
        onInitialized: function (e) {


        },
        height: '100%',

    };
    ///////////////////////////
   
    ///////////////////////////
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
    //////////////////////////////

    ////////////////////////////////////////////////////
    $scope.dg_flight_columns = [

        { dataField: 'Date', caption: 'Date', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, format: 'yyyy-MMM-dd', width: 140 },
        { dataField: 'Leg', caption: 'Leg', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, fixed: false, fixedPosition: 'left' },
        { dataField: 'STD', caption: 'STD', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, format: 'HH:mm', width: 100 },
        { dataField: 'STA', caption: 'STA', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, format: 'HH:mm', width: 100 },
       
    ];

    $scope.dg_flight_selected = null;
    $scope.dg_flight_instance = null;
    $scope.dg_flight_ds = null;
    $scope.dg_flight = {
        headerFilter: {
            visible: false
        },
        filterRow: {
            visible: true,
            showOperationChooser: true,
        },
        showRowLines: true,
        showColumnLines: true,
        sorting: { mode: 'none' },

        noDataText: '',

        allowColumnReordering: true,
        allowColumnResizing: true,
        scrolling: { mode: 'infinite' },
        paging: { pageSize: 100 },
        showBorders: true,
        selection: { mode: 'single' },

        columnAutoWidth: true,
        height: $(window).height() - 45 - 62,

        columns: $scope.dg_flight_columns,
        onContentReady: function (e) {
            if (!$scope.dg_flight_instance)
                $scope.dg_flight_instance = e.component;

        },
        onSelectionChanged: function (e) {
            var data = e.selectedRowsData[0];

            if (!data) {
                $scope.dg_flight_selected = null;
            }
            else
                $scope.dg_flight_selected = data;


        },
        summary: {
            totalItems: [{
                name: "FlightTimeTotal",
                showInColumn: "FlightTime2",
                displayFormat: "{0}",

                summaryType: "custom"
            },
            {
                name: "BlockTimeTotal",
                showInColumn: "BlockTime",
                displayFormat: "{0}",

                summaryType: "custom"
            }
                ,
            {
                name: "DutyTotal",
                showInColumn: "Duty",
                displayFormat: "{0}",

                summaryType: "custom"
            }
            ],
            calculateCustomSummary: function (options) {
                if (options.name === "FlightTimeTotal") {
                    if (options.summaryProcess === "start") {
                        options.totalValueMinutes = 0;
                        options.totalValue = '';

                    }
                    if (options.summaryProcess === "calculate") {

                        options.totalValueMinutes = options.totalValueMinutes + options.value.FlightH * 60 + options.value.FlightM;
                        options.totalValue = pad(Math.floor(options.totalValueMinutes / 60)).toString() + ':' + pad(options.totalValueMinutes % 60).toString();



                    }
                }

                if (options.name === "BlockTimeTotal") {
                    if (options.summaryProcess === "start") {
                        options.totalValueMinutes = 0;
                        options.totalValue = '';

                    }
                    if (options.summaryProcess === "calculate") {

                        options.totalValueMinutes = options.totalValueMinutes + options.value.ActualFlightHOffBlock * 60 + options.value.ActualFlightMOffBlock;
                        options.totalValue = pad(Math.floor(options.totalValueMinutes / 60)).toString() + ':' + pad(options.totalValueMinutes % 60).toString();



                    }
                }

                if (options.name === "DutyTotal") {
                    if (options.summaryProcess === "start") {
                        options.totalValueMinutes = 0;
                        options.totalValue = '';

                    }
                    if (options.summaryProcess === "calculate") {

                        options.totalValueMinutes = options.totalValueMinutes + options.value.Duty;
                        options.totalValue = pad(Math.floor(options.totalValueMinutes / 60)).toString() + ':' + pad(options.totalValueMinutes % 60).toString();



                    }
                }



            }
        },
        bindingOptions: {
            dataSource: 'dg_flight_ds'
        }
    };
    ////////////////////////////////////////////////////
    $scope.ds = null;
    $scope.ds_today = null;
    $scope.ds_tomorrow = null;
    $scope.ds_all = null;
    $scope.ds_day = null;
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };
    $scope.getDay = function (dt) {
       
        return (new Date(dt)).getDate();
    };
    $scope.getFlightTileMonth = function (dt) {
        var mns = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        var _dt = new Date(dt);
        var m = _dt.getMonth();
        var mstr = mns[m];
        var year = _dt.getFullYear();
        var yearstr = year.toString().substring(2, 4);
        var str = mstr + ' ' + yearstr;
        return str;
    };
    $scope.getStatusClass = function (item) {
        if (!item)
            return "";
        return "fa fa-circle " + item.FlightStatus.toLowerCase();
    };
    $scope.getStatus  = function (item) {

        switch (item ) {
            case 'OffBlocked':
                return 'Block Off';
            case 'OnBlocked':
                return 'Block On';
            case 'Departed':
                return 'Take Off';
            case 'Arrived':
                return 'Landing';

            default:
                return item ;
        }
    };
   
    function formatTime2(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes;
        return strTime;
    }
    $scope.getTimeFormated = function (dt) {
        if (!dt)
            return "-";
      
        if (dt.toString().indexOf('T') != -1) {
            var prts = dt.toString().split('T')[1];
            var tm = prts.substr(0, 5);
            return (tm);
        }
        var _dt = new Date(dt);
        //new Date(year, month, day, hours, minutes, seconds, milliseconds)
        return formatTime2(_dt);
    };
    $scope.getDuration = function (x) {
        if (!x)
            return "-";
        return pad(Math.floor(x / 60)).toString() + ':' + pad(x % 60).toString() + ' hrs';
    };


    $scope.flight = null;
    $scope.flightDay = null;
    $scope.flightToday = null;
    $scope.flightTomorrow = null;
    $scope.showFlight = function (item, n, $event) {
        
        if (!detector.tablet()) {
            $scope.flight = item;
            $scope.popup_flight_visible = true;
        }
        else {
            if (n == 0) {
                $('.today-tile').removeClass('selected');
                $scope.flightToday = item;
            }
            if (n == 1) {
                $('.tomorrow-tile').removeClass('selected');
                $scope.flightTomorrow = item;
            }
            if (n == 2) {
                $('.day-tile').removeClass('selected');
                $scope.flightDay = item;
            }
            var tile = $($event.currentTarget);
            tile.addClass('selected');

            $scope.getCrewAbs(item.FlightId, n);
        }
    };
    $scope.crew = null;
    $scope.crewDay = null;
    $scope.crewToday = null;
    $scope.crewTomorrow = null;
    $scope.getCrewAbs = function (fid, n) {
        $scope.crew = null;
        $scope.crewDay = null;
        $scope.crewToday = null;
        $scope.crewTomorrow = null;
        $scope.loadingVisible = true;
      

        $scope.loadingVisible = true;
        flightService.getFlightCrews(fid).then(function (response) {
            $scope.loadingVisible = false;

            if (!n && n!=0) {
                $scope.crew = response;
            } else
                if (n == 0) {
                    $scope.crewToday = response;
                    
                } else
                    if (n == 1) {
                        $scope.crewTomorrow = response;
                    } else
                        if (n == 2) {
                            $scope.crewDay = response;
                        }



        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    //////new flight controls///////////////////////////
    $scope.newFlight = {
        ID: -1,
        TypeID: null,
        CPRegister: null,
        FlightTypeID: 109,
        FlightStatusID: 1,
        AirlineOperatorsID: null,
        FlightNumber: null,
        FromAirportId: null,
        ToAirportId: null,
        STD: null,
        STA: null,
        ChocksOut: null,
        Takeoff: null,
        Landing: null,
        ChocksIn: null,
        PFLR: null,
        CPPositionId: $rootScope.position,
        CPFlightTypeId: 109,
        CPCrewId: $rootScope.employeeId,
        CPDH: 0,
        CPFDPId: $scope.id,
        CPInstructor: null,
        CPP1: null,
        CPP2: null,
        CPISCCM: null,
        CPSCCM: null,
        NightTime: null,
    };
    $scope.fillflight = function (item) {
        console.log(item);
        $scope.newFlight.ID = item.ID;
        $scope.newFlight.TypeID = item.TypeId;
        $scope.newFlight.CPRegister = item.CPRegister;
        $scope.newFlight.FlightTypeID = 109;
        $scope.newFlight.FlightStatusID = item.FlightStatusID;
        $scope.newFlight.AirlineOperatorsID = item.AirlineOperatorsID;
        $scope.newFlight.FlightNumber = item.FlightNumber;
        $scope.newFlight.FromAirportId = item.FromAirport;
        $scope.newFlight.ToAirportId = item.ToAirport;
        $scope.newFlight.STD = item.STD;
        $scope.newFlight.STA = item.STA;
        $scope.newFlight.ChocksOut = item.ChocksOut;
        $scope.newFlight.Takeoff = item.Takeoff;
        $scope.newFlight.Landing = item.Landing;
        $scope.newFlight.ChocksIn = item.ChocksIn;
        $scope.newFlight.PFLR = item.PFLR;
        $scope.newFlight.CPPositionId = $rootScope.getPosition(item.CPPositionId);
        $scope.newFlight.CPFlightTypeId = 109;
        $scope.newFlight.CPCrewId = $rootScope.employeeId;
        $scope.newFlight.CPDH = item.CPDH;
        $scope.newFlight.CPFDPId = $scope.id;
        $scope.newFlight.CPInstructor = item.CPInstructor;
        $scope.newFlight.CPP1 = item.CPP1;
        $scope.newFlight.CPP2 = item.CPP2;
        $scope.newFlight.CPISCCM = item.CPISCCM;
        $scope.newFlight.CPSCCM = item.CPSCCM;
        $scope.newFlight.NightTime = item.NightTime;

        $scope.departure = new Date($scope.newFlight.STD);
        $scope.arrival = new Date($scope.newFlight.STA);
    };
    $scope.nextFlight = function () {

        var std = (new Date($scope.newFlight.STA)).addMinutes(60);

        $scope.newFlight.FromAirportId = $scope.newFlight.ToAirportId;
        $scope.newFlight.ToAirportId = null;
        $scope.newFlight.ChocksOut = null;
        $scope.newFlight.ChocksIn = null;
        $scope.newFlight.Takeoff = null;
        $scope.newFlight.Landing = null;
        $scope.newFlight.STD = std;
        $scope.newFlight.STA = null;
        $scope.newFlight.FlightNumber = null;
        $scope.newFlight.FlightStatusID = 1;
        $scope.newFlight.CPDH = 0;
        $scope.newflight.NightTime = null;

    };
    $scope.clearNewFlight = function () {
        $scope.newFlight = {
            ID: -1,
            TypeID: null,
            CPRegister: null,
            FlightTypeID: 109,
            FlightStatusID: 1,
            AirlineOperatorsID: null,
            FlightNumber: null,
            FromAirportId: null,
            ToAirportId: null,
            STD: null,
            STA: null,
            ChocksOut: null,
            Takeoff: null,
            Landing: null,
            ChocksIn: null,
            PFLR: null,
            CPPositionId: $rootScope.position,
            CPFlightTypeId: 109,
            CPCrewId: $rootScope.employeeId,
            CPDH: 0,
            CPFDPId: $scope.id,
            CPInstructor: null,
            CPP1: null,
            CPP2: null,
            CPISCCM: null,
            CPSCCM: null,
            NightTime: null,
        };
    };
   
    $scope.btn_sunflight = {
        icon: "fas fa-moon",
        type: "default",
        text: "",

        //useSubmitBehavior: true,
        onClick: function (e) {

            if (!$scope.newFlight.STD || !$scope.newFlight.STA || !$scope.newFlight.ChocksOut || !$scope.newFlight.ChocksIn || !$scope.newFlight.Takeoff || !$scope.newFlight.Landing)
                return;
            $scope.getSunFlight();

        }
    };
    $scope.num_night = {
        // placeholder: "Enter Flight Number",
        showClearButton: false,
        min: 0,
        bindingOptions: {
            value: 'newFlight.NightTime'
        }
    };
    $scope._txt_flightNo = {
        // placeholder: "Enter Flight Number",
        showClearButton: false,
        bindingOptions: {
            value: 'newFlight.FlightNumber'
        }
    };
    $scope._txt_register = {
        // placeholder: "Enter Flight Number",
        showClearButton: false,
        bindingOptions: {
            value: 'newFlight.CPRegister'
        }
    };
    $scope._flightDate = new Date();
    $scope._departure = new Date();
    $scope._arrival = new Date();
    $scope._date_departure = {
        //placeholder: "Enter Flight Date",
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        bindingOptions: {
            value: 'departure'
        }
    };
    $scope._date_arrival = {
        //placeholder: "Enter Flight Date",
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        bindingOptions: {
            value: 'arrival'
        }
    };
    $scope._rtdate = null;
    $scope._rttime = null;
    $scope._date_rt = {
        //placeholder: "Enter Flight Date",
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        bindingOptions: {
            value: 'rtdate'
        }
    };
    $scope._time_rt = {
        type: "time",
        pickerType: "rollers",
        onValueChanged: function (e) {
            $scope.stdChanged();
        },
        bindingOptions: {
            value: 'rttime',
        }
    };

    //////////select apt//////////////////////
    $scope.dg_apt_columns = [
        
        { dataField: 'IATA', caption: 'IATA', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, },
          { dataField: 'ICAO', caption: 'ICAO', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, },
               { dataField: 'SortIndex', caption: 'Index', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, visible: false },
          // { dataField: 'Name', caption: 'Name', allowResizing: true, dataType: 'string', allowEditing: false, width: 300 },

    ];

    $scope.dg_apt_selected = null;
    $scope.dg_apt_instance = null;
    $scope.dg_apt_ds = null;
    $scope.dg_apt = {
        headerFilter: {
            visible: false
        },
        keyExpr: 'Id',
        filterRow: {
            visible: false,
            showOperationChooser: true,
        },
        searchPanel: {
            visible: true,
            width: 280,
            placeholder: "Search..."
        },
        showRowLines: true,
        showColumnLines: true,
        sorting: { mode: 'none' },

        noDataText: '',

        allowColumnReordering: true,
        allowColumnResizing: true,
        scrolling: { mode: 'infinite' },
        paging: { pageSize: 100 },
        showBorders: true,
        selection: { mode: 'single' },

        columnAutoWidth: false,
        //height: $(window).height() - 160,
        height:300,
        columns: $scope.dg_apt_columns,
        onContentReady: function (e) {
            if (!$scope.dg_apt_instance)
                $scope.dg_apt_instance = e.component;

        },
        onSelectionChanged: function (e) {
            var data = e.selectedRowsData[0];
            $scope.dg_apt_selected = data;
            


        },
        dataSource: $rootScope.getDatasourceAirport(),
         
        //bindingOptions: {
        //    dataSource: 'dg_apt_ds'
        //}
    };

    //////////////
    $scope.selectAptMode = 0;
    $scope.popup_apt_visible = false;
    $scope.popup_apt = {
         shading:false,
        title: 'Airport',
        width: 350,
        height:420,
        showTitle: true,
        dragEnabled: false,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: '', icon: 'check',   
                    onClick: function (e) {
                        if (!$scope.dg_apt_selected)
                            return;
                        if ($scope.selectAptMode == 0)
                            $scope.newFlight.FromAirportId = $scope.dg_apt_selected.Id;
                        else
                            $scope.newFlight.ToAirportId = $scope.dg_apt_selected.Id;
                        $scope.popup_apt_visible = false;


                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: '', icon: 'remove', onClick: function (e) {
                        $scope.popup_apt_visible = false;
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
            
            $scope.dg_apt_instance.clearSelection();
            $scope.dg_apt_instance.clearFilter();
        },
        bindingOptions: {
            visible: 'popup_apt_visible',
        }
    };


    /////////////////////////////////////
    $scope.fromItem = null;
    $scope._sb_from = {
        openOnFieldClick: false,
        showDropDownButton:false,
        showClearButton: false,
        searchEnabled: false,
        dataSource: $rootScope.getDatasourceAirport(),
        onFocusIn: function (e) {
            $scope.selectAptMode = 0;
            $scope.popup_apt_visible = true;
        },
        onSelectionChanged: function (arg) {

            // $scope.getIrRoute();
        },
        searchExpr: ["IATA", "Country", "SortName", "City"],
        displayExpr: "IATA",
        valueExpr: 'Id',
        bindingOptions: {
            value: 'newFlight.FromAirportId',

            selectedItem: 'fromItem',
        }
    };
    $scope.toItem = null;
    $scope._sb_to = {
        openOnFieldClick: false,
        showDropDownButton: false,
        showClearButton: false,
        searchEnabled: false,
        dataSource: $rootScope.getDatasourceAirport(),
        onFocusIn: function (e) {
            $scope.selectAptMode = 1;
            $scope.popup_apt_visible = true;
        },
        onSelectionChanged: function (arg) {

            // $scope.getIrRoute();
        },
        searchExpr: ["IATA", "Country", "SortName", "City"],
        displayExpr: "IATA",
        valueExpr: 'Id',
        bindingOptions: {
            value: 'newFlight.ToAirportId',
            selectedItem: 'toItem',
        }
    };
    $scope._sb_position = {
        showClearButton: false,
        searchEnabled: false,
        dataSource: $rootScope.getDatasourcePosition(),

        onSelectionChanged: function (arg) {

            // $scope.getIrRoute();
        },
       
        bindingOptions: {
            value: 'newFlight.CPPositionId',


        }
    };
    $scope._sb_airline = {
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
            value: 'newFlight.AirlineOperatorsID',


        }
    };
    $scope.dsACTypes = null;
    $scope._sb_actype = {

        showClearButton: false,
        width: '100%',
        searchEnabled: false,
        
        searchExpr: ['Type'],
        dataSource: $rootScope.getDatasourceAircrafts(),
        displayExpr: "Type",
        valueExpr: 'Id',

        onSelectionChanged: function (arg) {

        },
        bindingOptions: {
            value: 'newFlight.TypeID',
            dataSource: 'dsACTypes',

        }
    };
    $rootScope.getDatasourceEmployeeACTypes(function (ds) { $scope.dsACTypes = ds; });
    $scope._sb_status = {
        showClearButton: false,
        searchEnabled: false,
        dataSource: Enumerable.From(Flight.statusDataSource).Where('$.selectable').ToArray(),
        onSelectionChanged: function (e) {
           
            var bg = 'rgb(238, 238, 238)';
            var color = '#000';
            if (e && e.selectedItem) {
                bg = e.selectedItem.bgcolor;
                color = e.selectedItem.color;
            }

        },
        displayExpr: "title",
        valueExpr: 'id',
        bindingOptions: {
            value: 'newFlight.FlightStatusID',

        }
    };
    $scope._stdChanged = function () {
        $scope.newFlight.ChocksOut = $scope.newFlight.STD;
        $scope.newFlight.Takeoff = $scope.newFlight.STD;
    };
    $scope._staChanged = function () {
        $scope.newFlight.ChocksIn = $scope.newFlight.STA;
        $scope.newFlight.Landing = $scope.newFlight.STA;
    };
    $scope._time_std = {
        type: "time",
        pickerType: "rollers",
        onValueChanged: function (e) {
            $scope._stdChanged();
        },
        bindingOptions: {
            value: 'newFlight.STD',
        }
    };
    $scope._time_sta = {
        type: "time",
        pickerType: "rollers",
        onValueChanged: function (e) {
            $scope._staChanged();
        },
        bindingOptions: {
            value: 'newFlight.STA',
        }
    };
    $scope._time_offBlock = {
        type: "time",
        pickerType: "rollers",
        bindingOptions: {
            value: 'newFlight.ChocksOut',
        }
    };
    $scope._time_onBlock = {
        type: "time",
        pickerType: "rollers",
        bindingOptions: {
            value: 'newFlight.ChocksIn',
        }
    };
    $scope._time_takeoff = {
        type: "time",
        pickerType: "rollers",
        bindingOptions: {
            value: 'newFlight.Takeoff',
        }
    };
    $scope._time_landing = {
        type: "time",
        pickerType: "rollers",
        bindingOptions: {
            value: 'newFlight.Landing',
        }
    };
    $scope._chb_dh = {
        hoverStateEnabled: false,
        text: 'Positioning (D/H)',
        bindingOptions: {
            value: 'newFlight.CPDH',

        }
    };
    $scope.txt_instructor = {
        // placeholder: "Enter Flight Number",
        showClearButton: false,
        bindingOptions: {
            value: 'newFlight.CPInstructor'
        }
    };
    $scope.txt_p1 = {
        // placeholder: "Enter Flight Number",
        showClearButton: false,
        bindingOptions: {
            value: 'newFlight.CPP1'
        }
    };
    $scope.txt_p2 = {
        // placeholder: "Enter Flight Number",
        showClearButton: false,
        bindingOptions: {
            value: 'newFlight.CPP2'
        }
    };
    $scope.txt_isccm = {
        // placeholder: "Enter Flight Number",
        showClearButton: false,
        bindingOptions: {
            value: 'newFlight.CPISCCM'
        }
    };
    $scope.txt_sccm = {
        // placeholder: "Enter Flight Number",
        showClearButton: false,
        bindingOptions: {
            value: 'newFlight.CPSCCM'
        }
    };
    //////////////////////////////////////////
    $scope.getSunFlight = function () {
        var _std = $scope.newFlight.STD;
        var _sta = $scope.newFlight.STA;
        var _offblock = $scope.newFlight.ChocksOut;
        var _onblock = $scope.newFlight.ChocksIn;
        var _takeoff = $scope.newFlight.Takeoff;
        var _landing = $scope.newFlight.Landing;

        var std_dates = (new Date($scope.departure)).getDatePartArray();
        var std_times = (new Date(_std)).getTimePartArray();
        var std = new Date(std_dates[0], std_dates[1], std_dates[2], std_times[0], std_times[1], 0, 0);

        var sta_dates = (new Date($scope.arrival)).getDatePartArray();
        var sta_times = (new Date(_sta)).getTimePartArray();
        var sta = new Date(sta_dates[0], sta_dates[1], sta_dates[2], sta_times[0], sta_times[1], 0, 0);

        var off_dates = (new Date($scope.departure)).getDatePartArray();
        var off_times = (new Date(_offblock)).getTimePartArray();
        var offblock = new Date(off_dates[0], off_dates[1], off_dates[2], off_times[0], off_times[1], 0, 0);

        var on_dates = (new Date($scope.arrival)).getDatePartArray();
        var on_times = (new Date(_onblock)).getTimePartArray();
        var onblock = new Date(on_dates[0], on_dates[1], on_dates[2], on_times[0], on_times[1], 0, 0);

        var to_dates = (new Date($scope.departure)).getDatePartArray();
        var to_times = (new Date(_takeoff)).getTimePartArray();
        var takeoff = new Date(to_dates[0], to_dates[1], to_dates[2], to_times[0], to_times[1], 0, 0);

        var la_dates = (new Date($scope.arrival)).getDatePartArray();
        var la_times = (new Date(_landing)).getTimePartArray();
        var landing = new Date(la_dates[0], la_dates[1], la_dates[2], la_times[0], la_times[1], 0, 0);
        $scope.loadingVisible = true;
        flightService.getSunFlight(takeoff, landing, $scope.fromItem.IATA, $scope.toItem.IATA).then(function (response) {
            $scope.loadingVisible = false;
            console.log(response);
            $scope.newFlight.NightTime = response.total_minutes_night;

        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    ////////////////////////////////////////////
    $scope.popup_newflight_visible = false;

    $scope.popup_newflight = {
        title: 'Flight',
        fullScreen: true,
        showTitle: true,
        dragEnabled: false,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Save', icon: 'check', useSubmitBehavior: true, validationGroup: 'add_new_flight3',
                    onClick: function (e) {
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            //   General.ShowNotify('Please fill in all required fields.', 'error');
                            return;
                        }
                        $scope.doRefresh = true;
                        var _std = $scope.newFlight.STD;
                        var _sta = $scope.newFlight.STA;
                        var _offblock = $scope.newFlight.ChocksOut;
                        var _onblock = $scope.newFlight.ChocksIn;
                        var _takeoff = $scope.newFlight.Takeoff;
                        var _landing = $scope.newFlight.Landing;

                        var std_dates = (new Date($scope.departure)).getDatePartArray();
                        var std_times = (new Date(_std)).getTimePartArray();
                        var std = new Date(std_dates[0], std_dates[1], std_dates[2], std_times[0], std_times[1], 0, 0);

                        var sta_dates = (new Date($scope.arrival)).getDatePartArray();
                        var sta_times = (new Date(_sta)).getTimePartArray();
                        var sta = new Date(sta_dates[0], sta_dates[1], sta_dates[2], sta_times[0], sta_times[1], 0, 0);

                        var off_dates = (new Date($scope.departure)).getDatePartArray();
                        var off_times = (new Date(_offblock)).getTimePartArray();
                        var offblock = new Date(off_dates[0], off_dates[1], off_dates[2], off_times[0], off_times[1], 0, 0);

                        var on_dates = (new Date($scope.arrival)).getDatePartArray();
                        var on_times = (new Date(_onblock)).getTimePartArray();
                        var onblock = new Date(on_dates[0], on_dates[1], on_dates[2], on_times[0], on_times[1], 0, 0);

                        var to_dates = (new Date($scope.departure)).getDatePartArray();
                        var to_times = (new Date(_takeoff)).getTimePartArray();
                        var takeoff = new Date(to_dates[0], to_dates[1], to_dates[2], to_times[0], to_times[1], 0, 0);

                        var la_dates = (new Date($scope.arrival)).getDatePartArray();
                        var la_times = (new Date(_landing)).getTimePartArray();
                        var landing = new Date(la_dates[0], la_dates[1], la_dates[2], la_times[0], la_times[1], 0, 0);


                        var _flight = JSON.parse(JSON.stringify($scope.newFlight));
                        _flight.STD = (new Date(std)).toUTCString();
                        _flight.STA = (new Date(sta)).toUTCString();
                        _flight.Takeoff = (new Date(takeoff)).toUTCString();
                        _flight.Landing = (new Date(landing)).toUTCString();
                        _flight.ChocksOut = (new Date(offblock)).toUTCString();
                        _flight.ChocksIn = (new Date(onblock)).toUTCString();

                        _flight.CPPositionId = $rootScope.getPositionId($scope.newFlight.CPPositionId);


                        $scope.loadingVisible = true;
                        flightService.updateFlightFDPDirect(_flight).then(function (response) {
                            console.log(response);
                            $scope.loadingVisible = false;
                            $rootScope.clearcacheFDPS();
                            $rootScope.clearCacheFTL();
                           
                            
                            switch ($scope.tabId) {
                                case 'today':
                                    $scope.ds_today = null;
                                    $scope.bindToday();

                                    break;
                                case 'tomorrow':
                                    $scope.ds_tomorrow = null;
                                    $scope.bindTomorrow();
                                    break;
                                case 'all':
                                    if ($scope.appoinmentDay) {
                                        $scope.bindDay($scope.appoinmentDay);
                                    }
                                    break;
                                default:
                                    break;
                            }
                           

                           
                            $scope.popup_newflight_visible = false;

                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });




                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
                        $scope.popup_newflight_visible = false;
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
            $scope.clearNewFlight();
            if ($scope.doRefresh) {
                $scope.doRefresh = false;

            }

        },
        bindingOptions: {
            visible: 'popup_newflight_visible',



        }
    };
    ///////////////////////////////////////
    //////////////////////////////////
    $scope.popup_flight_visible = false;
    $scope.popup_flight_title = 'Flight';
    $scope.popup_flight = {
        width: 300,
        height: 260,
        //position: 'left top',
        fullScreen: true,
        showTitle: true,
        dragEnabled: false,
        toolbarItems: [

             {
                 widget: 'dxButton', location: 'after', options: {
                     type: 'success', text: 'Edit', icon: 'check', useSubmitBehavior: true, 
                     onClick: function (e) {
                         
                         var offset = -1 * (new Date()).getTimezoneOffset();
                         $scope.loadingVisible = true;
                         flightService.getFlight($scope.flight.FlightId).then(function (response) {
                             $scope.loadingVisible = false;
                             $scope.fillflight(response);
                             $scope.popup_flight_visible = false;
                             $scope.popup_newflight_visible = true;
                             

                         }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

                     }
                 }, toolbar: 'bottom'
             },


            { widget: 'dxButton', location: 'after', options: { type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) { $scope.popup_flight_visible = false; } }, toolbar: 'bottom' }
        ],

        visible: false,

        closeOnOutsideClick: false,
         
        onShown: function (e) {
            $scope.getCrewAbs($scope.flight.FlightId);
        },
        onHiding: function () {

            
        },
        onHidden: function () {

            $scope.flight = null;
            $scope.crew = null;
        },
        bindingOptions: {
            visible: 'popup_flight_visible',
            //width: 'pop_width',
            //height: 'pop_height',
            title: 'popup_flight_title',
            'toolbarItems[0].visible': 'flight.CPCrewId',
        }
    };

    
    //////////////////////////////////////
    
    $scope.bindToday = function () {
        if ($scope.ds_today)
            return;
        $scope.loadingVisible = true;

        var dt = new Date();
        var df = new Date();
        // $scope.getCrewFlights($rootScope.employeeId, df, dt);
        var id = $rootScope.employeeId;
        var offset = -1 * (new Date()).getTimezoneOffset();
        $scope.loadingVisible = true;
        flightService.getCrewFlights(id, df, dt).then(function (response) {
            $scope.loadingVisible = false;
            
            $scope.ds_today = response;


        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


    };
    $scope.bindTomorrow = function () {
        
        if ($scope.ds_tomorrow)
            return;
        $scope.loadingVisible = true;

        var dt = (new Date()).addDays(1);
        var df = (new Date()).addDays(1);
        // $scope.getCrewFlights($rootScope.employeeId, df, dt);
        var id = $rootScope.employeeId;
        var offset = -1 * (new Date()).getTimezoneOffset();
        
        $scope.loadingVisible = true;
        flightService.getCrewFlights(id, df, dt).then(function (response) {
            $scope.loadingVisible = false;
          
            
            $scope.ds_tomorrow = response;


        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


    };
    $scope.bindAll = function () {
        if ($scope.ds_all)
            return;

        $scope.loadingVisible = true;


        // $scope.getCrewFlights($rootScope.employeeId, df, dt);
        var id = $rootScope.employeeId;
        var offset = -1 * (new Date()).getTimezoneOffset();
        $scope.loadingVisible = true;
        flightService.getCrewFlightsGrouped(id).then(function (response) {
            $scope.loadingVisible = false;

            $scope.ds_all = response;
            if ($scope.sch_instance)
                $scope.sch_instance.repaint();

        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


    };
    $scope.bindDay = function (day) {
        $scope.ds_day = null;
        $scope.loadingVisible = true;

        var dt = new Date(day);
        var df = new Date(day);
        // $scope.getCrewFlights($rootScope.employeeId, df, dt);
        var id = $rootScope.employeeId;
        var offset = -1 * (new Date()).getTimezoneOffset();
        $scope.loadingVisible = true;
        flightService.getCrewFlights(id, df, dt).then(function (response) {
            $scope.loadingVisible = false;
            
            $scope.ds_day = response;


        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


    };

    $scope.bind = function () {
        if ($scope.firstBind)
            $scope.loadingVisible = true;
        
        var dt = new Date(2200, 4, 19, 0, 0, 0);
        var df = new Date(1900, 4, 19, 0, 0, 0);
        // $scope.getCrewFlights($rootScope.employeeId, df, dt);
        var id = $rootScope.employeeId;
        var offset = -1 * (new Date()).getTimezoneOffset();
        $scope.loadingVisible = true;
        flightService.getCrewFlights(id, df, dt).then(function (response) {
            $scope.loadingVisible = false;
            $.each(response, function (_i, _d) {
                _d.Leg = _d.FromAirportIATA + ' - ' + _d.FlightNumber + ' - ' + _d.ToAirportIATA;
                _d.STA = (new Date(_d.STA)).addMinutes(offset);

                _d.STD = (new Date(_d.STD)).addMinutes(offset);
                if (_d.ChocksIn)
                    _d.ChocksIn = (new Date(_d.ChocksIn)).addMinutes(offset);
                if (_d.ChocksOut)
                    _d.ChocksOut = (new Date(_d.ChocksOut)).addMinutes(offset);
                if (_d.Takeoff)
                    _d.Takeoff = (new Date(_d.Takeoff)).addMinutes(offset);
                if (_d.Landing)
                    _d.Landing = (new Date(_d.Landing)).addMinutes(offset);
                _d.DurationH = Math.floor(_d.FlightTime / 60);
                _d.DurationM = _d.FlightTime % 60;
                var fh = _d.FlightH * 60 + _d.FlightM;
                _d.FlightTime2 = pad(Math.floor(fh / 60)).toString() + ':' + pad(fh % 60).toString();
                var bm = _d.ActualFlightHOffBlock * 60 + _d.ActualFlightMOffBlock;
                _d.BlockTime = pad(Math.floor(bm / 60)).toString() + ':' + pad(bm % 60).toString();
                _d.Duty2 = pad(Math.floor(_d.Duty / 60)).toString() + ':' + pad(_d.Duty % 60).toString();
                //poosk
            });
            $scope.dg_flight_ds = response;


        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
         
    };

    $scope.itemClick = function (bookId, employeeId) {
        //alert(bookId+' '+employeeId);
        $location.path('/applibrary/item/' + bookId);
    };

    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'Flights';
        $scope.scroll_height = $(window).height() - 45 - 62 - 100;

        $scope.scroll_height_all = $(window).height() - 505;
        $('#scrollviewall').height($(window).height() - 495);
        $('.col-tablet').height($(window).height() - 45 - 62 - 45);
        $('.div-crew').height($(window).height() - 552);
        $('#tomorrow').height($(window).height() - 45 - 62 - 20);
        $('#today').height($(window).height() - 45 - 62 - 20);
        $('.flight').fadeIn();
       
        // $scope.bindTomorrow();
    }
    //////////////////////////////////////////
    $scope.data = [];

    var priorities = [
        {
            text: "High priority",
            id: 1,
            color: "#cc5c53"
        }, {
            text: "Low priority",
            id: 2,
            color: "#ff9747"
        }
    ];

    $scope.sch_instance = null;
    $scope.scheduler = null;
    $scope.sch_current = new Date();
    $scope.appoinmentDay = null;
    $scope.schedulerOptions = {
        // dataSource:  $scope.data,
        textExpr: 'Total',
        startDateExpr: 'Start',
        endDateExpr: 'End',
        appointmentTemplate: 'appointmentTemplate',
        views: ["month"],
        adaptivityEnabled: false,
        currentView: "month",
        startDayHour: 0,
        currentDate: new Date(),
        height: 340,
        bindingOptions: {
            dataSource: 'ds_all', //'dg_employees_ds',
            currentDate: 'sch_current',
            // height: 'dg_employees_height'
        },
        onContentReady: function (e) {
            if (!$scope.sch_instance)
                $scope.sch_instance = e.component;

        },
        onAppointmentClick: function (e) {
            $scope.flight = null;
            $scope.flightDay = null;
            $scope.appoinmentDay = e.appointmentData.Start;
            $scope.bindDay(e.appointmentData.Start);
            e.cancel = true;
            return;
            var $el = $(e.event.target);
            if ($el.hasClass('cellposition')) {
                e.cancel = true;
                return;
            }
        },

    };

    $scope.speedDialActionOptions = {
        icon: "plus",
        onClick: showAppointmentPopup
    }

    function showAppointmentPopup() {
        var scheduler = $('#scheduler').dxScheduler('instance');
        scheduler.showAppointmentPopup();
    }
    //////////////////////////////////////////
    $scope.accToggle = function ($event) {
       
        $scope.scroll_all_instance.beginUpdate();
        $scope.scroll_height_all = 1000;
        // $scope.scroll_all_instance.repaint();
        $scope.scroll_all_instance.endUpdate();
       

    };
    //////////////////////////////////////////
    $scope.accBuilt = false;
    $scope.accActive = false;
    $scope.buildAcc = function () {

        //  $scope.scroll_height_all = $(window).height() - 525;
        if ($scope.accBuilt)
            return;
        $scope.accBuilt = true;
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {


            acc[i].addEventListener("click", function () {

                this.classList.toggle("active");
                $scope.accActive = !$scope.accActive;
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {

                    //$scope.scroll_height_all = $(window).height() - 505;
                    $('#scrollviewall').height($(window).height() - 505 + 340);
                    $('.col-tablet2').height($(window).height() - 505 + 330);

                    panel.style.maxHeight = null;
                } else {
                    //alert(panel.scrollHeight);
                    $('#scrollviewall').height($(window).height() - 495);
                    $('.col-tablet2').height($(window).height() - 515);
                    //doof
                    //$scope.scroll_height_all = $(window).height() - 505 + 340;

                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
        for (i = 0; i < acc.length; i++) {
            var acc = acc[i];
            acc.classList.toggle("active");
            $scope.accActive = true;
            var _panel = acc.nextElementSibling;
            if (_panel.style.maxHeight) {
                $('#scrollviewall').height($(window).height() - 505 + 340);
                $('.col-tablet2').height($(window).height() - 505 + 330);
                _panel.style.maxHeight = null;
            } else {
                $('#scrollviewall').height($(window).height() - 495);
                $('.col-tablet2').height($(window).height() - 515);
                _panel.style.maxHeight = _panel.scrollHeight + "px";
            }
        }
    };
    //////////////////////////////////////////
    $scope.$on('PageLoaded', function (event, prms) {
        //footerbook
        if (prms == 'footer')
            $('.footer' + $scope.active).addClass('active');
 

    });
    var vhHeight = $("body").height();
    var chromeNavbarHeight = vhHeight - window.innerHeight;
    window.addEventListener("orientationchange", function (event) {
        //   alert(chromeNavbarHeight);
        //var _height = screen.height-100;

        //no-rotate
        setTimeout(function () {
            //alert(window.outerHeight);
            var _height = window.outerHeight;
            // alert(screen.height);
            $('.col-tablet').height(_height - 45 - 62 - 45);
            var tb2 = _height - 515;
            if (!$scope.accActive)
                tb2 = _height - 505 + 330;
            $('.col-tablet2').height(tb2);
            $('.div-crew').height(_height - 552);
            $('#tomorrow').height(_height - 45 - 62 - 20);
            $('#today').height(_height - 45 - 62 - 20);
            if (screen.height < screen.width && !detector.tablet()) {
                $('.no-rotate').hide();
                $('.yes-rotate').show();
            }
            else { $('.no-rotate').show(); $('.yes-rotate').hide(); }
        },200);

    }, false);

    function reportWindowSize() {
        //heightOutput.textContent = window.innerHeight;
        //widthOutput.textContent = window.innerWidth;
       
    }

    window.onresize = function (event) {
        return;
        setTimeout(function () {
            //alert(window.outerHeight);
            var _height = window.outerHeight;
            // alert(screen.height);
            $('.col-tablet').height(_height - 45 - 62 - 45);
            var tb2 = _height - 515;
            if (!$scope.accActive)
                tb2 = _height - 505 + 330;
            $('.col-tablet2').height(tb2);
            $('.div-crew').height(_height - 552);
            $('#tomorrow').height(_height - 45 - 62 - 20);
            $('#today').height(_height - 45 - 62 - 20);
            if (screen.height < screen.width && !detector.tablet()) {
                $('.no-rotate').hide();
                $('.yes-rotate').show();
            }
            else { $('.no-rotate').show(); $('.yes-rotate').hide(); }
        }, 200);
    };
    //$(window).on("orientationchange", function (event) {
    //    // alert("This device is in " + event.orientation + " mode!");
    //    console.log(event);
    //});
    

    $scope.$on('new_flight', function (event, prms) {
        $scope.popup_newflight_visible = true;


    });

    $rootScope.$broadcast('AppLibraryLoaded', null);
    $rootScope.$broadcast('ActiveFooterItem', 'footerflightcalendar');


}]);