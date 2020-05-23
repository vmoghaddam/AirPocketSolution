'use strict';
app.factory('flightService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope) {
    var serviceFactory = {};

    //"odata/fdp/crew/dates"
    var _getCrewFDPs = function (id, df, dt) {
        var _df = moment(df).format('YYYY-MM-DDTHH:mm:ss');
        var _dt = moment(dt).format('YYYY-MM-DDTHH:mm:ss');
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/fdp/crew/dates/' + id + '?from=' + _df + '&to=' + _dt).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewFDPsDuties = function (id, df, dt) {
        var _df = moment(df).format('YYYY-MM-DDTHH:mm:ss');
        var _dt = moment(dt).format('YYYY-MM-DDTHH:mm:ss');
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/duties/crew/dates/' + id + '?from=' + _df + '&to=' + _dt).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewFDPsFlights = function (id, df, dt) {
        var _df = moment(df).format('YYYY-MM-DDTHH:mm:ss');
        var _dt = moment(dt).format('YYYY-MM-DDTHH:mm:ss');
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/flights/crew/dates/' + id + '?from=' + _df + '&to=' + _dt).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewFDPsFTL = function (id, df, dt) {
        var _df = moment(df).format('YYYY-MM-DDTHH:mm:ss');
        var _dt = moment(dt).format('YYYY-MM-DDTHH:mm:ss');
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/ftl/crew/dates/' + id + '?from=' + _df + '&to=' + _dt).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewFDP = function (id) {
        
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/fdp/crew/single/' + id ).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };


    var _getCrewFlights = function (id, df, dt) {
        var _df = moment(df).format('YYYY-MM-DDTHH:mm:ss');
        var _dt = moment(dt).format('YYYY-MM-DDTHH:mm:ss');
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/crew/flights/app/' + id + '?from=' + _df + '&to=' + _dt).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    //[Route("odata/crew/flights/crew/fdp/{crewid}/{fdpid}")]
    var _getCrewFlightsByFDP = function (cid,fid) {
        
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/crew/flights/crew/fdp/' + cid + '/'+fid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewFlightsReport = function (id, df, dt, airline, fromapt, toapt, status) {
        var _df = moment(df).format('YYYY-MM-DDTHH:mm:ss');
        var _dt = moment(dt).format('YYYY-MM-DDTHH:mm:ss');
        //public async Task<IHttpActionResult> GetCrewFlightsReportApp2(DateTime from, DateTime to, int id,int? airline=null,int? status=null,int? fromAirport=null,int? toAirport=null)
        var deferred = $q.defer();
        var url = serviceBase + 'odata/crew/report/flights/app2/' + id + '?from=' + _df + '&to=' + _dt;
        if (airline)
            url += '&airline=' + airline;
        if (status)
            url += '&status=' + status;
        if (fromapt)
            url += '&fromAirport=' + fromapt;
        if (toapt)
            url += '&toAirport=' + toapt;
        $http.get(url).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewFlightsGrouped = function (id ) {
       
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/crew/report/flights/app/grouped/' + id ).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getFlightCrews = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/flight/crews/new/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _saveFDP = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/create', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _saveDuty = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/duty/create', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _addFlightToFDP = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/flight/add', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _updateCPFDP = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/update', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _updateFlightFDP = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/flight/update', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _updateFlightFDPDirect = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/flight/update/direct', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _removeFlightFromFDP = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/flight/remove', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _updateFlightStatus = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/flight/status', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _updateFDPTimes = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/rt', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getFlight = function (id) {
        var offset = -1 * (new Date()).getTimezoneOffset();
        var url = serviceBase + 'odata/cp/flight/' + id + '/' + offset;

        var deferred = $q.defer();
        $http.get(url).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };


    var _getSun = function () {
        var offset = -1 * (new Date()).getTimezoneOffset();
        var url = 'https://api.sunrise-sunset.org/json?lat=35.715298&lng=51.404343';

        var deferred = $q.defer();
        $http.get(url).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _getSunFlight = function (df,dt,fid,tid) {
        var _df = moment(df).format('YYYY-MM-DDTHH:mm:ss');
        var _dt = moment(dt).format('YYYY-MM-DDTHH:mm:ss');
        //public async Task<IHttpActionResult> GetCrewFlightsReportApp2(DateTime from, DateTime to, int id,int? airline=null,int? status=null,int? fromAirport=null,int? toAirport=null)
        var deferred = $q.defer();
        var url = serviceBase + 'odata/time/sunflight/' + '?dep=' + _df + '&arr=' + _dt+'&fid='+fid+'&tid='+tid;
        //public async Task<IHttpActionResult> GetSunFlight (DateTime dep, DateTime arr,string fid,string tid)
        $http.get(url).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    serviceFactory.getSun = _getSun;
    serviceFactory.getSunFlight = _getSunFlight;
    serviceFactory.getFlight = _getFlight;
    serviceFactory.updateFDPTimes = _updateFDPTimes;
    serviceFactory.removeFlightFromFDP = _removeFlightFromFDP;
    serviceFactory.updateFlightStatus = _updateFlightStatus;
    serviceFactory.getCrewFDPs = _getCrewFDPs;
    serviceFactory.getCrewFDP = _getCrewFDP;
    serviceFactory.getCrewFlights = _getCrewFlights;
    serviceFactory.getCrewFlightsByFDP = _getCrewFlightsByFDP;
    serviceFactory.getCrewFlightsReport = _getCrewFlightsReport;
    serviceFactory.getCrewFlightsGrouped = _getCrewFlightsGrouped;
    serviceFactory.getFlightCrews = _getFlightCrews;
    serviceFactory.addFlightToFDP = _addFlightToFDP;
    serviceFactory.updateCPFDP = _updateCPFDP;
    serviceFactory.updateFlightFDP = _updateFlightFDP;
    serviceFactory.updateFlightFDPDirect = _updateFlightFDPDirect;
    serviceFactory.saveFDP = _saveFDP;
    serviceFactory.saveDuty = _saveDuty;
    serviceFactory.getCrewFDPsFTL = _getCrewFDPsFTL;
    serviceFactory.getCrewFDPsFlights = _getCrewFDPsFlights;
    serviceFactory.getCrewFDPsDuties = _getCrewFDPsDuties;
    return serviceFactory;

}]);