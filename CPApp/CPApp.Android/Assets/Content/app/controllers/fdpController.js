'use strict';
app.controller('fdpController', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', '$route', '$timeout', 'flightService', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, $route, $timeout, flightService) {
    //test


    $scope.id = $routeParams.id;

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





    $scope.selectedItem = null;
    $scope.flightClick = function ($event, x) {
        if (!x.CPCrewId)
            return;
        //if ($scope.fdp.CP)
        //    //  $rootScope.$broadcast('EditableFDP', null);
        //    $rootScope.linkClicked('EditableFDP');
        //else
        //    $rootScope.linkClicked('ReadOnlyFDP');
        $scope.selectedItem = null;
        var has = $($event.currentTarget).hasClass('tile-selected');
        $('.lib-fdp-flight').removeClass('tile-selected');
        if (!has) {

            $($event.currentTarget).addClass('tile-selected');
            $scope.selectedItem = x;
        }
        // var selected = $('.tile-selected').length;
        // if (selected > 0)

        if ($scope.selectedItem && $scope.selectedItem.CPCrewId == $rootScope.employeeId)
        { $rootScope.$broadcast('ShowEditFDPFlight', null); }
        else
        { $rootScope.$broadcast('HideEditFDPFlight', null); }

    };
    $scope.getFdpFlightClass = function (x) {
        var cls = 'lib-fdp-flight';
        if (x.IsPositioning)
            cls += ' lib-fdp-flight-dh';
        return cls;
    }
    $scope.getOverFDPClass = function (f) {
        var cls = '';
        if (!f || !f.FDP)
            return '';
        if (f.FDP > f.MaxFDPExtended)
            cls='fdp-over';
        return cls;
    };
    $scope.flights = null;
    $scope.fdp = null;
    $scope.finished = function () {
        $scope.IsFlightVisible = true;
        var _sc = $("#scrollviewfdp").dxScrollView().dxScrollView("instance");
        _sc.scrollBy(-100);
        setTimeout(function () {
            
           
        }, 500);
      
    };
    $scope.IsFlightVisible = false;
    $scope.bindFlights = function () {
        $scope.IsFlightVisible = false;
        $scope.flights = [];
        $scope.loadingVisible = true;
        flightService.getCrewFlightsByFDP($rootScope.employeeId, $scope.id).then(function (response) {

            $scope.loadingVisible = false;
            
            $scope.flights = response;
           
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    $scope.UpdateFDP = function (callback) {
        $scope.loadingVisible = true;
        flightService.updateCPFDP({ Id: $scope.id }).then(function (response) {
          
            $scope.loadingVisible = false;
            $scope.fdp = response.viewfdp;
            if ($scope.fdp.CP)
                //  $rootScope.$broadcast('EditableFDP', null);
                $rootScope.linkClicked('EditableFDP');
            else
                $rootScope.linkClicked('ReadOnlyFDP');
            $scope.departure = new Date($scope.fdp.DutyStartLocal);
            $scope.arrival = new Date($scope.fdp.DutyStartLocal);
            if (!$scope.fdp.DutyStartLocal) {
                $scope.departure = new Date();
                $scope.arrival = new Date();
            }

            if (callback)
                callback();

        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    $scope.bindFDP = function () {

        $scope.loadingVisible = true;
        flightService.getCrewFDP($scope.id).then(function (response) {

            $scope.loadingVisible = false;
            console.log(response);
            $scope.fdp = response;

            if ($scope.fdp.CP)
                //  $rootScope.$broadcast('EditableFDP', null);
                $rootScope.linkClicked('EditableFDP');
            else
                $rootScope.linkClicked('ReadOnlyFDP');
            $scope.departure = new Date($scope.fdp.DutyStartLocal);
            $scope.arrival = new Date($scope.fdp.DutyStartLocal);
            if (!$scope.fdp.DutyStartLocal) {
                $scope.departure = new Date();
                $scope.arrival = new Date();
            }
            // $rootScope.$broadcast('ReadOnlyFDP', null);
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };

    $scope.selectedItem = null;
    $scope.itemClick = function ($event, x) {

    };

    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = $scope.id == -1 ? 'New FDP' : 'FDP';
        $scope.scroll_height = $(window).height() - 45 - 42 - 50 - 130;
        $('.fdp').fadeIn();

        //$scope.bind();
    }
    //////////////////////////////////////////
    $scope.$on('PageLoaded', function (event, prms) {
        //footerbook
        //  if (prms == 'footer')
        //      $('.footer' + $scope.active).addClass('active');


    });
    ////////////////////////////
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
    /////////////////////////////
    $scope.doRefresh = false;


    $scope.popup_newflight_visible = false;

    $scope.popup_newflight = {
        title: 'Flight',
        fullScreen: true,
        showTitle: true,
        dragEnabled: false,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Save', icon: 'check', useSubmitBehavior: true, validationGroup: 'add_new_flight',
                    onClick: function (e) {
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            //   General.ShowNotify('Please fill in all required fields.', 'error');
                            return;
                        }
                        $scope.doRefresh = true;
                        $scope.flights = [];
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
                        //df,dt,fid,tid
                       
                        $scope.doFDPUpdate = false;
                        if (!$scope.selectedItem) {
                            $scope.loadingVisible = true;
                            flightService.addFlightToFDP(_flight).then(function (response) {
                                console.log(response);
                                $scope.loadingVisible = false;
                                $scope.doFDPUpdate = true;
                                $rootScope.clearcacheFDPS();
                                $rootScope.clearCacheFTL();
                               // $scope.fdp = JSON.parse(JSON.stringify(response.viewfdp));
                                $scope.nextFlight();

                            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                        }
                        else {
                            $scope.loadingVisible = true;
                            flightService.updateFlightFDP(_flight).then(function (response) {
                                console.log(response);
                                $scope.doFDPUpdate = response.std;
                                $rootScope.clearcacheFDPS();
                                $rootScope.clearCacheFTL();
                                $scope.loadingVisible = false;
                               // $scope.fdp = JSON.parse(JSON.stringify(response.viewfdp));
                                $scope.selectedItem = null;
                                $scope.departure = new Date($scope.fdp.DutyStartLocal);
                                $scope.arrival = new Date($scope.fdp.DutyStartLocal);
                               // $scope.bindFlights();
                                $scope.popup_newflight_visible = false;

                            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                        }
                        


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
          //  if ($scope.doRefresh)
            //    $scope.flights = [];
        },
        onHidden: function () {
            $scope.clearNewFlight();
            if ($scope.doRefresh) {
                $scope.doRefresh = false;
                //$scope.bindFDP();
               

                if ($scope.doFDPUpdate) {

                    $scope.UpdateFDP(function () {
                        $scope.bindFlights();
                    })
                }
                else {
                    $scope.bindFDP();
                    $scope.bindFlights();
                }


            }

        },
        bindingOptions: {
            visible: 'popup_newflight_visible',



        }
    };
    //////////////////////////////////////////////////
    $scope.popup_rt_visible = false;
    $scope.popup_rt = {
        title: 'Reporting Time',
        width: 300,
        height:300,
        showTitle: true,
        dragEnabled: false,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Save', icon: 'check', useSubmitBehavior: true, validationGroup: 'fdprt',
                    onClick: function (e) {
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            //   General.ShowNotify('Please fill in all required fields.', 'error');
                            return;
                        }
                         
                        $scope.doRefresh = true;

                        var dt = (new Date($scope.rtdate)).getDatePartArray();
                        var ti=  (new Date($scope.rttime)).getTimePartArray();
                        var rt = new Date(dt[0], dt[1], dt[2], ti[0], ti[1], 0, 0);
                        rt = (new Date(rt)).toUTCString();
                        var dto = {
                            Id: $scope.fdp.Id,
                            rt:rt,
                        };
                            $scope.loadingVisible = true;
                            flightService.updateFDPTimes(dto).then(function (response) {
                                console.log(response);
                                $scope.loadingVisible = false;
                                $scope.fdp = JSON.parse(JSON.stringify(response.viewfdp));
                                $scope.popup_rt_visible = false;

                            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                        //return;
                        //_flight.STD = (new Date(std)).toUTCString();
                        //_flight.STA = (new Date(sta)).toUTCString();
                        //_flight.Takeoff = (new Date(takeoff)).toUTCString();
                        //_flight.Landing = (new Date(landing)).toUTCString();
                        //_flight.ChocksOut = (new Date(offblock)).toUTCString();
                        //_flight.ChocksIn = (new Date(onblock)).toUTCString();

                        //_flight.CPPositionId = $rootScope.getPositionId($scope.newFlight.CPPositionId);

                        //if (!$scope.selectedItem) {
                        
                        //}
                        //else {
                        //    $scope.loadingVisible = true;
                        //    flightService.updateFlightFDP(_flight).then(function (response) {
                        //        console.log(response);
                        //        $scope.loadingVisible = false;
                        //        $scope.fdp = JSON.parse(JSON.stringify(response.viewfdp));
                        //        $scope.selectedItem = null;
                        //        $scope.departure = new Date($scope.fdp.DutyStartLocal);
                        //        $scope.arrival = new Date($scope.fdp.DutyStartLocal);
                        //        $scope.bindFlights();
                        //        $scope.popup_newflight_visible = false;

                        //    }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                        //}



                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
                        $scope.popup_rt_visible = false;
                    }
                }, toolbar: 'bottom'
            }
        ],

        visible: false,

        closeOnOutsideClick: false,
        onShowing: function (e) {
            if ($scope.fdp.ReportingTimeLocal) {
                $scope.rtdate = new Date($scope.fdp.ReportingTimeLocal);
                $scope.rttime = new Date($scope.fdp.ReportingTimeLocal);
            } else if ($scope.fdp.DutyStartLocal) {
                $scope.rtdate = new Date($scope.fdp.DutyStartLocal);
                $scope.rttime = new Date($scope.fdp.DutyStartLocal);
            }
            else
            {

            }

        },
        onShown: function (e) {

        },
        onHiding: function () {
            $scope.rtdate = null;
            $scope.rttime = null;
            if ($scope.doRefresh) {
                $scope.doRefresh = false;
              //  $scope.bindFDP();
            }

        },
        bindingOptions: {
            visible: 'popup_rt_visible',



        }
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
        CPInstructor : null,
        CPP1 : null,
        CPP2 : null,
        CPISCCM : null,
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
        $scope.newFlight.NightTime = null;
        $scope.newFlight.FlightStatusID = 1;
        $scope.newFlight.CPDH = 0;

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
        min:0,
        bindingOptions: {
            value: 'newFlight.NightTime'
        }
    };
    $scope.txt_flightNo = {
        // placeholder: "Enter Flight Number",
        showClearButton: false,
        bindingOptions: {
            value: 'newFlight.FlightNumber'
        }
    };
    $scope.txt_register = {
        // placeholder: "Enter Flight Number",
        showClearButton: false,
        bindingOptions: {
            value: 'newFlight.CPRegister'
        }
    };
    $scope.flightDate = new Date();
    $scope.departure = new Date();
    $scope.arrival = new Date();
    $scope.date_departure = {
        //placeholder: "Enter Flight Date",
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        bindingOptions: {
            value: 'departure'
        }
    };
    $scope.date_arrival = {
        //placeholder: "Enter Flight Date",
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        bindingOptions: {
            value: 'arrival'
        }
    };
    $scope.rtdate = null;
    $scope.rttime = null;
    $scope.date_rt = {
        //placeholder: "Enter Flight Date",
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        bindingOptions: {
            value: 'rtdate'
        }
    };
    $scope.time_rt = {
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

         { dataField: 'IATA', caption: 'IATA', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false,  },
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
    $scope.sb_from = {
        openOnFieldClick: false,
        showDropDownButton: false,
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
            selectedItem:'fromItem',

        }
    };
    $scope.toItem = null;
    $scope.sb_to = {
        openOnFieldClick: false,
        showDropDownButton: false,
        showClearButton: false,
        searchEnabled: false,
        dataSource: $rootScope.getDatasourceAirport(),
        onFocusIn: function (e) {
            $scope.selectAptMode =1;
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
    $scope.sb_position = {
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
            value: 'newFlight.AirlineOperatorsID',


        }
    };

   

    $scope.dsACTypes = null;
    $scope.sb_actype = {

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



    $scope.sb_status = {
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
    $scope.stdChanged = function () {
        $scope.newFlight.ChocksOut = $scope.newFlight.STD;
        $scope.newFlight.Takeoff = $scope.newFlight.STD;
    };
    $scope.staChanged = function () {
        $scope.newFlight.ChocksIn = $scope.newFlight.STA;
        $scope.newFlight.Landing = $scope.newFlight.STA;
    };
    $scope.time_std = {
        type: "time",
        pickerType: "rollers",
        onValueChanged: function (e) {
            $scope.stdChanged();
        },
        bindingOptions: {
            value: 'newFlight.STD',
        }
    };
    $scope.time_sta = {
        type: "time",
        pickerType: "rollers",
        onValueChanged: function (e) {
            $scope.staChanged();
        },
        bindingOptions: {
            value: 'newFlight.STA',
        }
    };
    $scope.time_offBlock = {
        type: "time",
        pickerType: "rollers",
        bindingOptions: {
            value: 'newFlight.ChocksOut',
        }
    };
    $scope.time_onBlock = {
        type: "time",
        pickerType: "rollers",
        bindingOptions: {
            value: 'newFlight.ChocksIn',
        }
    };
    $scope.time_takeoff = {
        type: "time",
        pickerType: "rollers",
        bindingOptions: {
            value: 'newFlight.Takeoff',
        }
    };
    $scope.time_landing = {
        type: "time",
        pickerType: "rollers",
        bindingOptions: {
            value: 'newFlight.Landing',
        }
    };
    $scope.chb_dh = {
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
    $scope.isNew = true;
    //time_fdpflight
    $scope.$on('time_fdpflight', function (event, prms) {
        if (!$scope.flights || $scope.flights.length == 0) {
            return;
        }
            $scope.popup_rt_visible = true;
         
    });
    $scope.$on('new_fdpflight', function (event, prms) {
        if ($scope.selectedItem) {
            var offset = -1 * (new Date()).getTimezoneOffset();
            $scope.loadingVisible = true;
            flightService.getFlight($scope.selectedItem.FlightId).then(function (response) {
                $scope.loadingVisible = false;
                $scope.fillflight(response);
                $scope.popup_newflight_visible = true;

            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        }
        else
            $scope.popup_newflight_visible = true;
        //$scope.newCertificate.Id = -1;
        //$scope.isNew = true;
        //$scope.popup_newcertificate_visible = true;
    });
    $scope.$on('delete_fdpflight', function (event, prms) {

        General.Confirm(Config.Text_DeleteConfirm, function (res) {
            if (res) {

                var dto = { Id: $scope.selectedItem.FlightId, };
                $scope.loadingVisible = true;
                flightService.removeFlightFromFDP(dto).then(function (response) {
                    $scope.loadingVisible = false;
                    General.ShowNotify(Config.Text_SavedOk, 'success');

                    $rootScope.clearcacheFDPS();
                    $scope.doRefresh = true;
                    $scope.bindFlights();



                }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

            }
        });
    });
    $rootScope.$broadcast('AppLibraryLoaded', null);
    $scope.$on('$viewContentLoaded', function () {
        // alert('fdp');
        // $scope.bindFDP();
        // $scope.bindFlights();
    });
    $scope.$on('FooterLoad', function () {

        $scope.bindFDP();
        $scope.bindFlights();
    });

}]);
