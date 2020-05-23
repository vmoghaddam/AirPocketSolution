'use strict';
app.controller('reportViewerController', ['$scope', '$sce', '$location', '$routeParams', '$rootScope', 'libraryService', 'activityService', 'authService', 'notificationService', '$route', function ($scope, $sce, $location, $routeParams, $rootScope, libraryService, activityService, authService, notificationService, $route) {

    $scope.url = $routeParams.url;
    $scope.df = $routeParams.df;
    //alert($scope.df);
    // $scope._url = $sce.trustAsResourceUrl($rootScope.webBase + 'pdfjs/web/viewer.html?file=../../upload/clientsfiles/' + $scope.url);
    var url = $rootScope.reportUrl + '/?type=' + $routeParams.type + '&df=' + $routeParams.df + '&dt=' + $routeParams.dt + '&airline=' + ($routeParams.airline?$routeParams.airline:-1)
    + '&status=15&from=' + ($routeParams.from ? $routeParams.from : -1) + '&to=' + ($routeParams.to ? $routeParams.to : -1) + "&id=" + $rootScope.employeeId;
    $scope._url = $sce.trustAsResourceUrl(url);


    $rootScope.page_title = 'Report';
   
    $('#frame').height($(window).height() - 90);


}]);