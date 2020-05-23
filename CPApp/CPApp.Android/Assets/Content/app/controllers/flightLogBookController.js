'use strict';
app.controller('appFlightLogBookController', ['$scope', '$location', '$routeParams', '$rootScope', 'flightService', 'authService', 'notificationService', '$route', function ($scope, $location, $routeParams, $rootScope, flightService, authService, notificationService, $route) {
    $scope.prms = $routeParams.prms;
    $scope.firstBind = true;
    $scope.isContentVisible = false;
    $scope.typeId = null;
    $scope.title = "Log Book";
    $scope.tabDetailVisible = false;
    $scope.tabTotalVisible = false;
    $scope.tabAirlineVisible = false;
    $scope.selectedItem = null;
   // $('.tablbcx').hide();
    //////////////////////////////
    $scope.gridVisible = true;
    $scope.tileVisible = false;
    $scope.layVisible = false;
    ////////////////////////////
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
    $scope.btn_tile = {
        text: '',
        width: 30,
        height: 30,
        type: 'default',
        icon: 'fas fa-th-large',
        // width: '100%', //37,

        onClick: function (e) {
            $scope.selectedItem = null;            
            $('.lib-fdp-flight').removeClass('tile-selected');
            $rootScope.$broadcast('HideGoFDP', null);
            $scope.dg_flight_instance.clearSelection();

            $scope.tileVisible = false;
            $scope.gridVisible = true;
        },
        bindingOptions: {
            visible: 'tileVisible'
        }
    };
    $scope.btn_grid = {
        text: '',
        width: 30,
        height: 30,
        type: 'default',
        icon: 'fas fa-th-list',
        //width: '100%', //37,

        onClick: function (e) {
            $scope.selectedItem = null;
            $('.lib-fdp-flight').removeClass('tile-selected');
            $rootScope.$broadcast('HideGoFDP', null);
            $scope.dg_flight_instance.clearSelection();

            $scope.tileVisible = true;
            $scope.gridVisible = false;
            if ($scope.dg_flight_instance)
                $scope.dg_flight_instance.refresh();
        },
        bindingOptions: {
            visible: 'gridVisible'
        }
    };

    ////////////////////////////
    var tabs = [
      { text: "Total", id: 'total' },
      { text: "Airline", id: 'airline' },
      { text: "Detail", id: 'detail' },
    ];
    $scope.tabs = tabs;
    $scope.showTab = function (id) {
        try {
            $scope.tabDetailVisible = false;
            $scope.tabTotalVisible = false;
            $scope.tabAirlineVisible = false;
                switch (id) {
                    case 'total':
                        $scope.tabTotalVisible = true;
                        break;
                    case 'airline':
                        $scope.tabAirlineVisible = true;
                        break;
                    case 'detail':
                        $scope.tabDetailVisible = true;
                        break;
                    default:
                        $scope.tabTotalVisible = true;
                        break;
                }

                $scope.layVisible = id == 'detail';
            //var hts = Enumerable.From(tabs).Where("$.id!='" + id + "'").Select('$.id').ToArray();
            //$.each(hts, function (_i, _d) {
            //    console.log(_d + '   ' + $('#' + _d).length);
            //    $('#' + _d).hide();
            //});
            //$('#' + id).fadeIn(400, function () {
            //    var scroll_total = $("#scroll_total").dxScrollView().dxScrollView("instance");
            //    scroll_total.scrollBy(1);

            //    var scroll_detail = $("#scroll_detail").dxScrollView().dxScrollView("instance");
            //    if (scroll_detail)
            //        scroll_detail.scrollBy(1);

            //    var scroll_airline = $("#scroll_airline").dxScrollView().dxScrollView("instance");
            //    scroll_airline.scrollBy(1);


            //    //$scope.$apply(function () {
            //    //    $scope.layVisible = id == 'detail';


            //    //});

            //});
        }
        catch (e) {
            alert(e);
        }
        //  $('.tablbcx').hide();
       
        
    };
    $scope.$watch("selectedTabIndex", function (newValue) {
         
        
        var id = tabs[newValue].id;
        $scope.showTab(id);
        $location.search('tab', id);
        //$location.path('/appflightlogbook/' + id).replace();

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
    if ($routeParams.tab) {
        switch ($routeParams.tab) {
            case 'total':
                $scope.selectedTabIndex = 0;
                break;
            case 'airline':
                $scope.selectedTabIndex = 1;
                break;
            case 'detail':
                $scope.selectedTabIndex = 2;
                break;
            default:
                $scope.selectedTabIndex = 0;
                break;
        }
        
    }
    else
        $scope.selectedTabIndex = 0;
    /////////////////////////
    $scope.scroll_height = 200;
    $scope.scroll_total = {
        width: '100%',
        bounceEnabled: true,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        // useNative:false,
        refreshingText: 'Updating...',
        onPullDown: function (options) {
            console.log('puull');
            //Alert.getStartupNots(null, function (arg) {
            //    options.component.release();
            //    // refreshCarts(arg);
            //});
            options.component.release();

        },
        bindingOptions: { height: 'scroll_height', }
    };
    ///////////////////////////////
    
    $scope.scroll_height2 = 200;
    $scope.scroll_airline = {
        width: '100%',
         
        bounceEnabled: true,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        // useNative:false,
        refreshingText: 'Updating...',
        onPullDown: function (options) {
            console.log('puull');
            //Alert.getStartupNots(null, function (arg) {
            //    options.component.release();
            //    // refreshCarts(arg);
            //});
            options.component.release();

        },
        bindingOptions: { height: 'scroll_height2', }
    };
    ///////////////////////////
    $scope.scroll_height = 200;
    $scope.scroll_detail = {
        width: '100%',
        bounceEnabled: true,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        // useNative:false,
        refreshingText: 'Updating...',
        onPullDown: function (options) {
            console.log('puull');
            //Alert.getStartupNots(null, function (arg) {
            //    options.component.release();
            //    // refreshCarts(arg);
            //});
            options.component.release();

        },
        bindingOptions: { height: 'scroll_height2', visible: 'gridVisible' }
    };
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

        return "fa fa-circle " + item.FlightStatus.toLowerCase();
    };
    $scope.getStatus = function (item) {

        switch (item) {
            case 'OffBlocked':
                return 'Block Off';
            case 'OnBlocked':
                return 'Block On';
            case 'Departed':
                return 'Take Off';
            case 'Arrived':
                return 'Landing';

            default:
                return item;
        }
    };
    function formatTime2(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();

        //hours = hours % 12;
        //hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes;
        return strTime;
    }
    $scope.getTimeFormated = function (dt) {
        if (!dt)
            return "-";
        //if ($rootScope.userName.toLowerCase() == 'shamsi')
        //    alert(dt);
        if (dt.toString().indexOf('T') != -1) {
            var prts = dt.toString().split('T')[1];
            var tm = prts.substr(0, 5);
            return (tm);
        }
        var _dt = new Date(dt);
        //new Date(year, month, day, hours, minutes, seconds, milliseconds)
        return formatTime2(_dt);
    };
    $scope.formatMinutes = function (mm) {
        return pad(Math.floor(mm / 60)).toString() + ':' + pad(mm % 60).toString();
    };


   
    $scope.showAptFlight = function (item) {

    };



    $scope.flightClick = function ($event, x) {

        $scope.selectedItem = null;
        var has = $($event.currentTarget).hasClass('tile-selected');
        $('.lib-fdp-flight').removeClass('tile-selected');
        if (!has) {

            $($event.currentTarget).addClass('tile-selected');
            $scope.selectedItem = x;
        }


        if ($scope.selectedItem)
        { $rootScope.$broadcast('ShowGoFDP', null); }
        else
        { $rootScope.$broadcast('HideGoFDP', null); }
    };
    $scope.$on('go_fdp', function (event, prms) {
       
         $location.path("/fdp/" + $scope.selectedItem.FDPId);
    });
    $scope.$on('edit_flightdirect', function (event, prms) {
        if (!$scope.selectedItem.CPCrewId)
            return;
        var offset = -1 * (new Date()).getTimezoneOffset();
        $scope.loadingVisible = true;
        flightService.getFlight($scope.selectedItem.FlightId).then(function (response) {
            $scope.loadingVisible = false;
            $scope.fillflight(response);
            $scope.popup_newflight_visible = true;

        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

    });
    $scope.scroll_popup_flight = {
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
        heigh: '100%',
        //  bindingOptions: { height: 'scroll_height_all', }
    };
    $scope.crew = null;
    $scope.getCrewAbs = function (fid) {
        $scope.crew = null;
         


        $scope.loadingVisible = true;
        flightService.getFlightCrews(fid).then(function (response) {
            $scope.loadingVisible = false;

            
                $scope.crew = response;
            

        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
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




            { widget: 'dxButton', location: 'after', options: { type: 'danger', text: 'Close', icon: 'remove', }, toolbar: 'bottom' }
        ],

        visible: false,

        closeOnOutsideClick: false,
        onShowing: function (e) {


        },
        onShown: function (e) {
            $scope.getCrewAbs($scope.selectedItem.FlightId);
        },
        onHiding: function () {

            $scope.flight = null;
            $scope.crew = null;
        },
        bindingOptions: {
            visible: 'popup_flight_visible',
            //width: 'pop_width',
            //height: 'pop_height',
            title: 'popup_flight_title',

        }
    };

    //close button
    $scope.popup_flight.toolbarItems[0].options.onClick = function (e) {

        $scope.popup_flight_visible = false;

    };
    ////////////////////////////////////
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
        NightTime:null,
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
        $scope.newFlight.NightTime = null;

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
    //$scope.txt_airline = {
    //    //placeholder: "Enter Airline",
    //    showClearButton: false,
    //    bindingOptions: {
    //        value: 'newFlight.AirlineOperatorsID'
    //    }
    //};
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
          { dataField: 'SortIndex', caption: 'Index', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false,visible:false },
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
        height: 300,
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
        shading: false,
        title: 'Airport',
        width: 350,
        height: 420,
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
        showDropDownButton: false,
        showClearButton: false,
        searchEnabled: false,
        dataSource: $rootScope.getDatasourceAirport(),

        onSelectionChanged: function (arg) {

            // $scope.getIrRoute();
        },
        onFocusIn: function (e) {
            $scope.selectAptMode = 0;
            $scope.popup_apt_visible = true;
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
        //searchExpr: ["IATA", "Country", "SortName", "City"],
        // displayExpr: "IATA",
        //valueExpr: 'Id',
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
            //$scope.IsOffBlockReadOnly = true;
            //$scope.IsTakeOffReadOnly = true;
            //$scope.IsLandingReadOnly = true;
            //$scope.IsOnBlockReadOnly = true;
            /////////////////////////////
            var bg = 'rgb(238, 238, 238)';
            var color = '#000';
            if (e && e.selectedItem) {
                bg = e.selectedItem.bgcolor;
                color = e.selectedItem.color;
            }



            ///////////////////////////

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
                    type: 'success', text: 'Save', icon: 'check', useSubmitBehavior: true, validationGroup: 'add_new_flight2',
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
                                $scope.selectedItem = null;
                                $rootScope.$broadcast('HideGoFDP', null);
                                $scope.dg_flight_instance.clearSelection();
                                
                                $scope.getCrewFlights($rootScope.employeeId, $rootScope.bindFrom, $rootScope.bindTo, $rootScope.bindAirline, $rootScope.bindFromAirport, $rootScope.bindToAirport, $rootScope.bindStatus);
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
    $scope.$on('show_flightinfo', function (event, prms) {
        //FlightId
        console.log($scope.selectedItem);
        $scope.popup_flight_visible = true;
       // $location.path("/fdp/" + $scope.selectedItem.FDPId);
    });

    $scope.getFdpFlightClassXs = function (x) {
        var cls = 'lib-fdp-flight hidden-sm hidden-lg hidden-md';
        if (x.IsPositioning)
            cls += ' lib-fdp-flight-dh hidden-sm hidden-lg hidden-md';
        return cls;
    }
    $scope.getFdpFlightClassLg = function (x) {
        var cls = 'lib-fdp-flight hidden-xs';
        if (x.IsPositioning)
            cls += ' lib-fdp-flight-dh hidden-xs';
        return cls;
    }
    //////////////////////////////////
    //////////////////////////////////////////////////
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
                         $rootScope.bindFrom = new Date($scope.filterFrom);
                         $rootScope.bindTo = new Date($scope.filterTo);
                         $rootScope.bindAirline = $scope.filterAirline;
                         $rootScope.bindFromAirport =$scope.filterFromAirport;
                         $rootScope.bindToAirport = $scope.filterToAirport;
                         $rootScope.bindStatus = $scope.filterstatus;
                        // $scope.bind();
                         $scope.getCrewFlights($rootScope.employeeId, $rootScope.bindFrom, $rootScope.bindTo, $rootScope.bindAirline, $rootScope.bindFromAirport, $rootScope.bindToAirport, $rootScope.bindStatus);
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
    //////////////////////////////////////////////////
    //zool
    $scope.dg_flight_columns = [

                  {
                      cellTemplate: function (container, options) {
                          $("<div style='text-align:center'/>")
                              .html(options.rowIndex + 1)
                              .appendTo(container);
                      }, name: 'row', caption: '#', width: 50, fixed: true, fixedPosition: 'left', allowResizing: false, cssClass: 'rowHeader'
                  },
                   { dataField: 'IsPositioning', caption: 'DH', allowResizing: true, alignment: 'center', dataType: 'boolean', allowEditing: false, width: 60 },

                   {
                       caption: 'FLIGHT', columns: [
                           { dataField: 'STDDay', caption: 'DATE', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'yy-MMM-dd' },

         { dataField: 'Route', caption: 'ROUTE', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 90 },
           { dataField: 'FlightStatus', caption: 'STATUS', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 90 },
           { dataField: 'FlightNumber', caption: 'No', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 80, fixed: false, fixedPosition: 'left' },
           { dataField: 'Airline', caption: 'Airline', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 90, fixed: false, fixedPosition: 'left' },

                       ]
                   },



        {
            caption: 'DEPARTURE', alignment: 'center', columns: [
                  // { dataField: 'FromAirportIATA', caption: 'PLACE', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 100 },
                   { dataField: 'ChocksOutLocal', caption: 'O/B', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm' },
                   { dataField: 'TakeOffLocal', caption: 'TO', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm' },
                    { dataField: 'NightTakeOff', caption: 'Night', allowResizing: true, alignment: 'center', dataType: 'boolean', allowEditing: false, width: 70 },
                    { dataField: 'DayTakeOff', caption: 'Day', allowResizing: true, alignment: 'center', dataType: 'boolean', allowEditing: false, width: 70 },
            ]
        },
         {
             caption: 'ARRIVAL', alignment: 'center', columns: [
                   // { dataField: 'ToAirportIATA', caption: 'PLACE', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 100 },

                   { dataField: 'LandingLocal', caption: 'LDG', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm' },
                      { dataField: 'ChocksInLocal', caption: 'O/B', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm' },
                       { dataField: 'NightLanding', caption: 'Night', allowResizing: true, alignment: 'center', dataType: 'boolean', allowEditing: false, width: 70 },
                    { dataField: 'DayLanding', caption: 'Day', allowResizing: true, alignment: 'center', dataType: 'boolean', allowEditing: false, width: 70 },
             ]
         },

      //  { dataField: 'STD', caption: 'Dep.', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm', sortIndex: 0, sortOrder: 'asc' },
        // { dataField: 'STA', caption: 'Arr.', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm' },


//        { dataField: 'ScheduledFlightTime2', caption: 'Sch. FLT Time', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 120, fixed: false, fixedPosition: 'right' },
             {
                 caption: 'TOTAL TIME', alignment: 'center', columns: [
                     {
                         dataField: 'BlockTime', caption: 'BLOCK', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 90, fixed: false, fixedPosition: 'right',
                         customizeText: function (e) {
                             return $rootScope.formatMinutes(e.value);
                         }
                     },
                 {
                     dataField: 'FlightTimeActual', caption: 'FLIGHT', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 90, fixed: false, fixedPosition: 'right',
                     customizeText: function (e) {
                         return $rootScope.formatMinutes(e.value);
                     }
                 },
                  {
                      dataField: 'DayTime', caption: 'Day', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 90, fixed: false, fixedPosition: 'right',
                      customizeText: function (e) {
                          return $rootScope.formatMinutes(e.value);
                      }
                  },
                   {
                       dataField: 'NightTime', caption: 'Night', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 90, fixed: false, fixedPosition: 'right',
                       customizeText: function (e) {
                           return $rootScope.formatMinutes(e.value);
                       }
                   },

                 {
                     dataField: 'Fixtime', caption: 'FIX', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 90, fixed: false, fixedPosition: 'right',
                     customizeText: function (e) {
                         return $rootScope.formatMinutes(e.value);
                     }
                 },
                 ]
             },






    ];

    $scope.dg_flight_selected = null;
    $scope.dg_flight_instance = null;
    $scope.dg_flight_ds = null;
    $scope.dg_flight = {
        headerFilter: {
            visible: false
        },
        keyExpr:'FlightId',
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

        columnAutoWidth: false,
        height: $(window).height() - 160,

        columns: $scope.dg_flight_columns,
        onContentReady: function (e) {
            if (!$scope.dg_flight_instance)
                $scope.dg_flight_instance = e.component;

        },
        onSelectionChanged: function (e) {
            var data = e.selectedRowsData[0];

            if (!data) {
                $scope.dg_flight_selected = null;
                $scope.selectedItem = null;
                $rootScope.$broadcast('HideGoFDP', null);
    

            }
            else {
                $scope.dg_flight_selected = data;
                $scope.selectedItem = data;
                $rootScope.$broadcast('ShowGoFDP', null);
            }


        },
        summary: {
            totalItems: [{
                name: "BlockTimeTotal",
                showInColumn: "BlockTime",
                displayFormat: "{0}",

                summaryType: "custom"
            }, {
                name: "FlightTimeTotal",
                showInColumn: "FlightTime",
                displayFormat: "{0}",

                summaryType: "custom"
            },
                {
                    name: "SITATimeTotal",
                    showInColumn: "SITATime2",
                    displayFormat: "{0}",

                    summaryType: "custom"
                }
                ,
                {
                    name: "FixTimeTotal",
                    showInColumn: "Fixtime",
                    displayFormat: "{0}",

                    summaryType: "custom"
                },
                {
                    name: "DayTimeTotal",
                    showInColumn: "DayTime",
                    displayFormat: "{0}",

                    summaryType: "custom"
                },
                {
                    name: "NightTimeTotal",
                    showInColumn: "NightTime",
                    displayFormat: "{0}",

                    summaryType: "custom"
                },
            ],

            calculateCustomSummary: function (options) {
                if (options.name === "FlightTimeTotal") {
                    if (options.summaryProcess === "start") {
                        options.totalValueMinutes = 0;
                        options.totalValue = '';

                    }
                    if (options.summaryProcess === "calculate") {

                        options.totalValueMinutes = options.totalValueMinutes + options.value.FlightTimeActual;
                        options.totalValue = pad(Math.floor(options.totalValueMinutes / 60)).toString() + ':' + pad(options.totalValueMinutes % 60).toString();



                    }
                }
                if (options.name === "DayTimeTotal") {
                    if (options.summaryProcess === "start") {
                        options.totalValueMinutes = 0;
                        options.totalValue = '';

                    }
                    if (options.summaryProcess === "calculate") {

                        options.totalValueMinutes = options.totalValueMinutes + options.value.DayTime;
                        options.totalValue = pad(Math.floor(options.totalValueMinutes / 60)).toString() + ':' + pad(options.totalValueMinutes % 60).toString();



                    }
                }
                if (options.name === "NightTimeTotal") {
                    if (options.summaryProcess === "start") {
                        options.totalValueMinutes = 0;
                        options.totalValue = '';

                    }
                    if (options.summaryProcess === "calculate") {

                        options.totalValueMinutes = options.totalValueMinutes + options.value.NightTime;
                        options.totalValue = pad(Math.floor(options.totalValueMinutes / 60)).toString() + ':' + pad(options.totalValueMinutes % 60).toString();



                    }
                }

                if (options.name === "SITATimeTotal") {
                    if (options.summaryProcess === "start") {
                        options.totalValueMinutes = 0;
                        options.totalValue = '';

                    }
                    if (options.summaryProcess === "calculate") {

                        options.totalValueMinutes = options.totalValueMinutes + options.value.SITATime;
                        options.totalValue = pad(Math.floor(options.totalValueMinutes / 60)).toString() + ':' + pad(options.totalValueMinutes % 60).toString();



                    }
                }

                if (options.name === "FixTimeTotal") {
                    if (options.summaryProcess === "start") {
                        options.totalValueMinutes = 0;
                        options.totalValue = '';

                    }
                    if (options.summaryProcess === "calculate") {

                        options.totalValueMinutes = options.totalValueMinutes + options.value.Fixtime;
                        options.totalValue = pad(Math.floor(options.totalValueMinutes / 60)).toString() + ':' + pad(options.totalValueMinutes % 60).toString();



                    }
                }
                if (options.name === "BlockTimeTotal") {
                    if (options.summaryProcess === "start") {
                        options.totalValueMinutes = 0;
                        options.totalValue = '';

                    }
                    if (options.summaryProcess === "calculate") {

                        options.totalValueMinutes = options.totalValueMinutes + options.value.BlockTime;
                        options.totalValue = pad(Math.floor(options.totalValueMinutes / 60)).toString() + ':' + pad(options.totalValueMinutes % 60).toString();



                    }
                }


            }
        },
        "export": {
            enabled: true,
            fileName: "Flights",
            allowExportSelectedData: false
        },
        //onToolbarPreparing: function (e) {
        //    e.toolbarOptions.items.unshift({
        //        location: "before",
        //        template: function () {
        //            return $("<div/>")
        //               // .addClass("informer")
        //                .append(
        //                   "<span style='color:white;'>Legs</span>"
        //                );
        //        }
        //    });
        //},
        onExporting: function (e) {
            e.component.beginUpdate();
            e.component.columnOption("row", "visible", false);
        },
        onExported: function (e) {
            e.component.columnOption("row", "visible", true);
            e.component.endUpdate();
        },
        onRowPrepared: function (e) {
            if (e.data && e.data.IsPositioning)
                e.rowElement.css('background', '#ffccff');

        },
        onCellPrepared: function (e) {
            if (e.rowType === "data" && e.column.dataField == "FlightStatus") {
                //FlightStatus.toLowerCase()
                e.cellElement.addClass(e.data.FlightStatus.toLowerCase() + '-bg');
            }
            //e.cellElement.css("backgroundColor", "#ffcccc");




        },
        bindingOptions: {
            dataSource: 'dg_flight_ds'
        }
    };
    //////////////////////////////////
    //zool
   // $scope.dt_from = new Date().addDays(-28);
   // $scope.dt_to = new Date();
    $scope.data = null;
    //$scope.getCrewFlights($rootScope.employeeId, $rootScope.bindFrom, $rootScope.bindTo, $rootScope.bindAirline, $rootScope.bindFromAirport, $rootScope.bindToAirport, $rootScope.bindStatus);
    $scope.getCrewFlights = function (id, df, dt,airline,fromapt,toapt,status) {
        $scope.dg_flight_ds = null;
        var offset = -1 * (new Date()).getTimezoneOffset();
        $scope.loadingVisible = true;
        flightService.getCrewFlightsReport(id, df, dt, airline, fromapt, toapt, status).then(function (response) {
            console.log(response);
            $scope.data = response;
            $.each(response.flights, function (_i, _d) {
                _d.Route = _d.FromAirportIATA + '-' + _d.ToAirportIATA;
            });
            $scope.data.bl2 = $scope.formatMinutes($scope.data.bl);
            $scope.data.fix2 = $scope.formatMinutes($scope.data.fix);
            $scope.data.apt_pie_ds = [];
            $.each($scope.data.apts, function (_i, _d) {
                _d.bl2 = $scope.formatMinutes(_d.bl);
                _d.fix2 = $scope.formatMinutes(_d.fix);

            });
            $scope.dg_flight_ds = $scope.data.flights;
            $scope.loadingVisible = false;
            //$.each(response, function (_i, _d) {
            //    _d.Route = _d.FromAirportIATA + '-' + _d.ToAirportIATA;
            //    _d.STA = (new Date(_d.STA)).addMinutes(offset);

            //    _d.STD = (new Date(_d.STD)).addMinutes(offset);
            //    if (_d.ChocksIn)
            //        _d.ChocksIn = (new Date(_d.ChocksIn)).addMinutes(offset);
            //    if (_d.ChocksOut)
            //        _d.ChocksOut = (new Date(_d.ChocksOut)).addMinutes(offset);
            //    if (_d.Takeoff)
            //        _d.Takeoff = (new Date(_d.Takeoff)).addMinutes(offset);
            //    if (_d.Landing)
            //        _d.Landing = (new Date(_d.Landing)).addMinutes(offset);
            //    _d.DurationH = Math.floor(_d.FlightTime / 60);
            //    _d.DurationM = _d.FlightTime % 60;
            //    var fh = _d.FlightH * 60 + _d.FlightM;

            //    _d.FlightTime2 = pad(Math.floor(fh / 60)).toString() + ':' + pad(fh % 60).toString();
            //    _d.ScheduledFlightTime2 = $scope.formatMinutes(_d.ScheduledFlightTime);

            //    var bm = _d.ActualFlightHOffBlock * 60 + _d.ActualFlightMOffBlock;

            //    _d.BlockTime2 = $scope.formatMinutes(_d.BlockTime);
            //    _d.SITATime2 = $scope.formatMinutes(_d.SITATime);
            //    _d.FixTime2 = $scope.formatMinutes(_d.FixTime);
            //    _d.Duty2 = pad(Math.floor(_d.Duty / 60)).toString() + ':' + pad(_d.Duty % 60).toString();

            //});
            // $scope.dg_flight_ds = response;

            $scope.isContentVisible = true;
            //////////////////////
            //var tmp = $scope.selectedTabIndex;
            //$scope.selectedTabIndex = -1;
            //$scope.selectedTabIndex = tmp;
            ////////////////////////
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    //////////////////////////////

    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'Flight > ' + $scope.title;
        $scope.scroll_height = $(window).height() - 45 - 50 - 65;
        $scope.scroll_height2 = $(window).height() - 45 - 50 - 65;
        $('.flightlogbook').fadeIn();
        $scope.getCrewFlights($rootScope.employeeId, $rootScope.bindFrom, $rootScope.bindTo, $rootScope.bindAirline, $rootScope.bindFromAirport, $rootScope.bindToAirport, $rootScope.bindStatus);
        // $scope.bindTomorrow();
    }
    /////////////////////////////////

    $scope.$on('PageLoaded', function (event, prms) {
        //footerbook
        if (prms == 'footer')
            $('.footer' + $scope.active).addClass('active');


    });
    var vhHeight = $("body").height();
    var chromeNavbarHeight = vhHeight - window.innerHeight;
    window.addEventListener("orientationchange", function (event) {

        //setTimeout(function () {

        //    var _height = window.outerHeight;

        //    $('.col-tablet').height(_height - 45 - 62 - 45);
        //    var tb2 = _height - 515;
        //    if (!$scope.accActive)
        //        tb2 = _height - 505 + 330;
        //    $('.col-tablet2').height(tb2);
        //    $('.div-crew').height(_height - 552);
        //    $('#tomorrow').height(_height - 45 - 62 - 30);
        //    $('#today').height(_height - 45 - 62 - 30);
        //    if (screen.height < screen.width && !detector.tablet()) {
        //        $('.no-rotate').hide();
        //        $('.yes-rotate').show();
        //    }
        //    else { $('.no-rotate').show(); $('.yes-rotate').hide(); }
        //},200);

    }, false);

    window.onresize = function (event) {
        return;
        setTimeout(function () {

            //var _height = window.outerHeight;

            //$('.col-tablet').height(_height - 45 - 62 - 45);
            //var tb2 = _height - 515;
            //if (!$scope.accActive)
            //    tb2 = _height - 505 + 330;
            //$('.col-tablet2').height(tb2);
            //$('.div-crew').height(_height - 552);
            //$('#tomorrow').height(_height - 45 - 62 - 30);
            //$('#today').height(_height - 45 - 62 - 30);
            //if (screen.height < screen.width && !detector.tablet()) {
            //    $('.no-rotate').hide();
            //    $('.yes-rotate').show();
            //}
            //else { $('.no-rotate').show(); $('.yes-rotate').hide(); }
        }, 200);
    };



    $rootScope.$broadcast('ActiveFooterItem', 'footerflightstatistics');


}]);