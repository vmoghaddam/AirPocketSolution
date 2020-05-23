'use strict';
app.factory('tokensManagerService', ['$http','ngAuthSettings', function ($http,ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    
    var tokenManagerServiceFactory = {};

    var _getRefreshTokens = function () {

        return $http.get(serviceBase + 'api/refreshtokens').then(function (results) {
            return results;
        });
    };

    var _deleteRefreshTokens = function (tokenid) {

        return $http.delete(serviceBase + 'api/refreshtokens/?tokenid=' + tokenid).then(function (results) {
            return results;
        });
    };

    tokenManagerServiceFactory.deleteRefreshTokens = _deleteRefreshTokens;
    tokenManagerServiceFactory.getRefreshTokens = _getRefreshTokens;

    return tokenManagerServiceFactory;

}]);

//////////////////////////////
app.factory('activityService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope) {



    var serviceFactory = {};
    var _getMain = function (cid, uid,eid) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/dashboard/total/' + cid + '/' + mid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };


    var _getDashboard = function (cid, mid) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/dashboard/total/' + cid + '/' +    mid ).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getAppDashboard = function (cid, eid) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/dashboard/app/' + cid + '/' + eid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getAppDashboardFTL = function ( eid) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/dashboard/app/ftl/'  + eid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getMenuHits = function (cid,uid,mid,top) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/menuhits/top/'+cid+'/'+uid+'/'+mid+'/'+top  ).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getLastActivities = function (cid,   mid, uid,top) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/useractivities/top/'+cid+'/'+mid+'/'+uid+'/'+top).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
     
    var _save = function (entity) {
        
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/useractivities/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            
            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
        
        
    };

    var _hitMenu = function (key,url,remark,moduleId) {
        var entity = {
            Id: -1,
            Date: null,
            UserId: $rootScope.userId,
            Key: key,
            Url: url,
            ModuleId: moduleId ? moduleId: $rootScope.moduleId,
            IsMain: 1,
            CustomerId: Config.CustomerId,
            Remark: remark,
        };
        _save(entity);
    };
    var _visitMessage = function (id) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/visitmessage/' + id  ).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _visitLibrary = function (employeeId,itemid  ) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/visitlibrary/' + employeeId + '/' + itemid ).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _visitFile = function (employeeId, fileId) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/visitfile/' + employeeId + '/' + fileId).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _signFile = function (employeeId, bookId,code) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/sign/book/' + employeeId + '/' + bookId+'/'+code).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _downloadLibrary = function (employeeId, itemid) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/downloadlibrary/' + employeeId + '/' + itemid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    
    serviceFactory.save = _save;
    serviceFactory.hitMenu = _hitMenu;
    serviceFactory.getMenuHits = _getMenuHits;
    serviceFactory.getLastActivities = _getLastActivities;
    serviceFactory.getDashboard = _getDashboard;
    serviceFactory.getAppDashboard = _getAppDashboard;
    serviceFactory.getAppDashboardFTL = _getAppDashboardFTL;
    serviceFactory.visitLibrary = _visitLibrary;
    serviceFactory.visitFile = _visitFile;
    serviceFactory.signFile = _signFile;
    serviceFactory.visitMessage = _visitMessage;
    serviceFactory.downloadLibrary = _downloadLibrary;
    //serviceFactory.delete = _delete;
    return serviceFactory;

}]);
/////////////////////////////////////
app.factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        
  

        if (authData) {

            config.headers.Authorization = 'Bearer ' + authData.token;
        }
      
        return config;
    }

    var _responseError = function (rejection) {
        
        if (rejection.status === 401) {
             
            var authService = $injector.get('authService');
            var authData = localStorageService.get('authorizationData');

            //if (authData) {
            //    if (authData.useRefreshTokens) {
            //        $location.path('/refresh');
            //        return $q.reject(rejection);
            //    }
            //}
            authService.logOut();
            $location.path('/login');
        }
        return $q.reject(rejection);
    }



    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;
  

    return authInterceptorServiceFactory;
}]);
///////////////////////////////////////////////////
app.factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', '$location', '$rootScope', function ($http, $q, localStorageService, ngAuthSettings, $location, $rootScope) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: false
    };

    var _externalAuthData = {
        provider: "",
        userName: "",
        externalAccessToken: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&scope=" + (loginData.scope);

        if (loginData.useRefreshTokens) {
            data = data + "&client_id=" + ngAuthSettings.clientId;
        }

        var deferred = $q.defer();


        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
            console.log('token');
            console.log(response);
            var responseData = response.data;
            console.log(responseData);
            if (loginData.useRefreshTokens) {
                localStorageService.set('authorizationDataApp', {
                    token: responseData.access_token, userName: loginData.userName, refreshToken: responseData.refresh_token, expires: responseData['.expires'], useRefreshTokens: true
                });
            }
            else {
                localStorageService.set('authorizationDataApp', { token: responseData.access_token, userName: loginData.userName, refreshToken: "", expires: responseData['.expires'], useRefreshTokens: false });
            }

            localStorageService.set('userData', {
                Name: responseData.Name, UserId: responseData.UserId, EmployeeId: responseData.EmployeeId
                , JobGroup: responseData.JobGroup
                , Position: responseData.Position
                , PositionCode: responseData.PositionCode
            });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            _authentication.useRefreshTokens = loginData.useRefreshTokens;
            $rootScope.userName = loginData.userName;
            $rootScope.userTitle = responseData.Name;
            $rootScope.userId = responseData.UserId;
            $rootScope.employeeId = responseData.EmployeeId;
            $rootScope.jobGroup = responseData.JobGroup;
            $rootScope.position = responseData.Position;
            $rootScope.positionCode = responseData.PositionCode;

            var dto = {
                userName: $rootScope.userName,
                userTitle: $rootScope.userTitle,
                userId: $rootScope.userId,
                employeeId: $rootScope.employeeId,
                jobGroup: $rootScope.jobGroup,
                roles: '',
                claims: '',
                type: 'loginData',

            };
            // exportLoginData(dto);

            invokeCSCode(JSON.stringify(dto));
            deferred.resolve(response);

        }, function (err, status) {

            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationDataApp');
        localStorageService.remove('userData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.useRefreshTokens = false;
        exportLogoutData();
        $location.path('/login');
    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationDataApp');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;

            _authentication.useRefreshTokens = authData.useRefreshTokens;

            $rootScope.userName = authData.userName;
            var userData = localStorageService.get('userData');
            if (userData) {
                $rootScope.userTitle = userData.Name;
                $rootScope.userId = userData.UserId;
                $rootScope.employeeId = userData.EmployeeId;
                $rootScope.jobGroup = userData.JobGroup;
                $rootScope.jobGroup = userData.JobGroup;
                $rootScope.position = userData.Position;
                $rootScope.positionCode = userData.PositionCode;
            }
        }



    };


    var _refreshToken = function () {
        var deferred = $q.defer();

        var authData = localStorageService.get('authorizationDataApp');

        if (authData) {

            if (authData.useRefreshTokens) {

                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                localStorageService.remove('authorizationDataApp');

                //$http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                //    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                //    deferred.resolve(response);

                //}).error(function (err, status) {
                //    _logOut();
                //    deferred.reject(err);
                //    });


                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
                    var responseData = response.data;
                    console.log('refresh');
                    console.log(responseData);
                    localStorageService.set('authorizationDataApp', { token: responseData.access_token, userName: responseData.userName, refreshToken: responseData.refresh_token, useRefreshTokens: true });

                    deferred.resolve(response);

                }, function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });


            }
        }

        return deferred.promise;
    };

    var _obtainAccessToken = function (externalData) {

        var deferred = $q.defer();

        $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

            localStorageService.set('authorizationDataApp', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _registerExternal = function (registerExternalData) {

        var deferred = $q.defer();

        $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {

            localStorageService.set('authorizationDataApp', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _isAuthorized = function () {
        var authData = localStorageService.get('authorizationDataApp');
        if (!authData)
            return false;
        var expires = new Date(authData.expires);
        if (new Date() > expires)
            return false;

        return true;

    };
    var _redirectToLogin = function () {
        localStorageService.remove('authorizationDataApp');
        $location.path('/login');
    }
    var _checkAuth = function () {
        var authData = localStorageService.get('authorizationDataApp');


        if (!authData) {
            localStorageService.remove('authorizationDataApp');
            $location.path('/login');
            return;
        }
        var expires = new Date(authData.expires);
        // alert(expires);
        // alert(new Date());
        if (new Date() > expires) {
            alert('expire');
            localStorageService.remove('authorizationDataApp');
            $location.path('/login');
            return;
        }

    };

    var _setModuleProperties = function (moduleId) {
        var module = { id: Number(moduleId) };
        switch (Number(moduleId)) {
            case 1:
                module.title = 'Profile';
                module.remark = 'Lorem ipsum dolor sit amet';
                module.theme = 'material.steel-light';
                module.color = '#2f7899';
                module.class = 'theme-steel';
                break;
            case 2:
                module.title = 'Library';
                module.remark = 'Lorem ipsum dolor sit amet';
                module.theme = 'material.purple-light';
                module.color = '#9C27B0';
                module.class = 'theme-purple';
                break;
            case 3:
                module.title = 'Flight Management';
                module.remark = 'Lorem ipsum dolor sit amet';
                module.theme = 'material.blue-light';
                module.color = '#03A9F4';
                module.class = 'theme-blue';
                break;
            case 4:
                module.title = 'Basic Information';
                module.remark = 'Lorem ipsum dolor sit amet';
                module.theme = 'material.gray-light';
                module.color = '#97a1a6';
                module.class = 'theme-gray';
                break;
            default:
                break;
        }
        return module;

    }
    var _fillModuleData = function () {

        var data = localStorageService.get('module');

        if (data) {
            $rootScope.module = data.title;
            $rootScope.moduleId = data.id;
            $rootScope.moduleRemark = data.remark;
            $rootScope.theme = data.theme;
            $rootScope.color = data.color;
            $rootScope.class = data.class;

            //  $rootScope.headerClasses.push(data.class);
        }

    };
    var _setModule = function (moduleId) {
        var module = _setModuleProperties(moduleId);
        localStorageService.set('module', module);
        _fillModuleData();

    };

    var _setPassword = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/users/password', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _changePassword = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/users/password/change', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage2(err));
        });

        return deferred.promise;
    };


    authServiceFactory.setModule = _setModule;
    authServiceFactory.fillModuleData = _fillModuleData;
    authServiceFactory.checkAuth = _checkAuth;
    authServiceFactory.isAuthorized = _isAuthorized;
    authServiceFactory.redirectToLogin = _redirectToLogin;
    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.refreshToken = _refreshToken;

    authServiceFactory.obtainAccessToken = _obtainAccessToken;
    authServiceFactory.externalAuthData = _externalAuthData;
    authServiceFactory.registerExternal = _registerExternal;
    authServiceFactory.changePassword = _changePassword;
    authServiceFactory.setPassword = _setPassword;
    authServiceFactory.IsAuthurized = function () {

        return authServiceFactory.authentication.isAuth;
    };


    return authServiceFactory;
}]);
//////////////////////////////////////////////
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
///////////////////////////////////////
app.factory('generalService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope){

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var ordersServiceFactory = {};

    var _getOrders = function () {

        return $http.get(serviceBase + 'odata/options/all/1').then(function (results) {
            console.log('orders');
            console.log(results);

            return results;
        }
            //    , function (error) { console.log('errors'); console.log(error); }
        );
    };
    var _saveJournal = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/journals/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _saveOption = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/option/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _deleteJournal = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/journals/delete', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _deleteOption = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/option/delete', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getEmployee = function (id) {


        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employee/' +  id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getProfile = function (id) {


        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employee/profile/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getExpiringCertificates = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employees/expiringcertificates/last/' + id ).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getExpiringCertificates2 = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/crew/expires/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getExpiringCertificates3 = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/crew/expiring/certificates/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getLastCertificates = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employees/certificates/last/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getAllCertificates = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employees/certificates/all/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getPersonActiveCourse = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employees/activecourses/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getPersonPendingCourse = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employees/pendingcourses/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getNotification = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/notification/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getNotifications = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/notifications/employee/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    //"odata/employee/certificates/{id}"
    var _getCertifications = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employee/certificates/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _saveCertification = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/certificate/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _deleteCertification = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/certificate/delete', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _updateProfile = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/app/employee/update', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };


    var _getUserAcTypes = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employee/actypes/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    ordersServiceFactory.getEmployee = _getEmployee;
    ordersServiceFactory.getProfile = _getProfile;
    ordersServiceFactory.getExpiringCertificates = _getExpiringCertificates;
    ordersServiceFactory.getExpiringCertificates2 = _getExpiringCertificates2;
    ordersServiceFactory.getExpiringCertificates3 = _getExpiringCertificates3;
    ordersServiceFactory.getLastCertificates = _getLastCertificates;
    ordersServiceFactory.getAllCertificates = _getAllCertificates;
    ordersServiceFactory.getPersonActiveCourse = _getPersonActiveCourse;
    ordersServiceFactory.getPersonPendingCourse = _getPersonPendingCourse;
    ordersServiceFactory.getNotifications = _getNotifications;
    ordersServiceFactory.getNotification = _getNotification;
    ordersServiceFactory.getOrders = _getOrders;
    ordersServiceFactory.saveOption = _saveOption;
    ordersServiceFactory.saveJournal = _saveJournal;
    ordersServiceFactory.deleteJournal = _deleteJournal;
    ordersServiceFactory.deleteOption = _deleteOption;
    ordersServiceFactory.updateProfile = _updateProfile;


    ordersServiceFactory.saveCertification = _saveCertification;
    ordersServiceFactory.deleteCertification = _deleteCertification;
    ordersServiceFactory.getCertifications = _getCertifications;
    ordersServiceFactory.getUserAcTypes = _getUserAcTypes;

    return ordersServiceFactory;

}]);
//////////////////////////////////////
app.factory('libraryService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope) {



    var serviceFactory = {};
    var _getKeywords = function () {



        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/library/keywords'  ).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getBook = function (id) {

         
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/library/book/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
var _getEmployeeBook = function (id,itemId) {

         
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employees/library/item/' + id+"/"+itemId).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getBookApplicableEmployees = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/library/books/applicable/employees/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getPersonLibrary = function (id,type) {
         
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employees/library/' + id+(type?'/'+type:'')).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewPIFs = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/pifs/' + id  ).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewMemos = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/memos/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getLastExposed = function (cid,   top) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/library/exposed/' + cid +'?orderby=DateExposure desc&top='+top).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _exposeBook = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/library/book/expose', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _save = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/library/book/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    //var _delete = function (entity) {
    //    var deferred = $q.defer();
    //    $http.post($rootScope.serviceUrl + 'odata/locations/delete', entity).then(function (response) {
    //        deferred.resolve(response.data);
    //    }, function (err, status) {

    //        deferred.reject(Exceptions.getMessage(err));
    //    });

    //    return deferred.promise;
    //};

    //serviceFactory.getEmployee = _getEmployee;
    var _getFoldersItems = function (uid, fid,pid) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/base/library/employee/folder/' + uid+'/'+fid+'/'+pid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    serviceFactory.save = _save;
    serviceFactory.exposeBook = _exposeBook;
    serviceFactory.getBook = _getBook;
    serviceFactory.getEmployeeBook=_getEmployeeBook;
    serviceFactory.getPersonLibrary = _getPersonLibrary;
    serviceFactory.getCrewPIFs = _getCrewPIFs;
    serviceFactory.getCrewMemos = _getCrewMemos;
    serviceFactory.getKeywords = _getKeywords;
    serviceFactory.getBookApplicableEmployees = _getBookApplicableEmployees;
    serviceFactory.getLastExposed = _getLastExposed;
    serviceFactory.getFoldersItems = _getFoldersItems;
    //serviceFactory.delete = _delete;
    return serviceFactory;

}]);
//////////////////////////////////////////
app.factory('notificationService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope) {



    var serviceFactory = {};
     
    var _getNotification = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/notification/' +  id  ).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
     
    var _notify = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/notifications/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
        
        
    };
    
    serviceFactory.notify = _notify;
    serviceFactory.getNotification = _getNotification;
    //serviceFactory.delete = _delete;
    return serviceFactory;

}]);
/////////////////////////////////////////////////
app.factory('ordersService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var ordersServiceFactory = {};

    var _getOrders = function () {
        
        return $http.get(serviceBase + 'odata/options/all/1').then(function (results) {
            console.log('orders');
            console.log(results);
            
            return results;
        }
        //    , function (error) { console.log('errors'); console.log(error); }
        );
    };

    ordersServiceFactory.getOrders = _getOrders;

    return ordersServiceFactory;

}]);
//////////////////////////////////////////////
app.factory('testService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var testServiceFactory = {};

    //var _getOrders = function () {

    //    return $http.get(serviceBase + 'api/orders').then(function (results) {

    //        return results;
    //    });
    //};

    //ordersServiceFactory.getOrders = _getOrders;

    return testServiceFactory;

}]);