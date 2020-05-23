'use strict';
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
    //1186
    var _getACTypeCertifications = function (id) {
         var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employee/certificates/type/' + id+'/5007').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCMCCertifications = function (id) {
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employee/certificates/type/' + id + '/1186').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCertificationByType = function (id,tid) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employee/certificates/' + id+'/'+tid).then(function (response) {
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
    ordersServiceFactory.getCertificationByType = _getCertificationByType;
    ordersServiceFactory.getUserAcTypes = _getUserAcTypes;
    ordersServiceFactory.getACTypeCertifications = _getACTypeCertifications;
    ordersServiceFactory.getCMCCertifications = _getCMCCertifications;

    return ordersServiceFactory;

}]);