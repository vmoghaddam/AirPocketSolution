'use strict';
app.controller('register0Controller', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', '$route', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, $route) {
    //test
    $scope.prms = $routeParams.prms;
    $scope.firstBind = true;

    $scope.title = null;



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

    //// Controls ////////////////
    $scope.entity = {
        MobileNumber: null,
        
       
    };
    $scope.txt_mobileNumber = {
        placeholder: "Enter Mobile Number",
        showClearButton: false,
        mask: "(+\\98) \\9000000000",
        // maskRules: {
        //    X:9 ///[02-9]/
        //},
        maskInvalidMessage: "The phone must have a correct Iran phone format",
        useMaskedValue: true,
        bindingOptions: {
            value: 'entity.MobileNumber'
        }
    };
    $scope.vertificationCode = null;
    $scope.isValidateButtonVisible = false;
    $scope.isSendButtonVisible = true;
    
    $scope.timer = null;
    $scope.code = null;
    $scope.btn_send = {
        icon: "check",
        type: "success",
        text: "Send Vertiication Code",
        width:'100%',
        //useSubmitBehavior: true,
        validationGroup:'mobile',
        onClick: function (e) {

            var result = e.validationGroup.validate();
            if (result.isValid) {
                //////////////////////////
                var str = $scope.entity.MobileNumber;
                str=str.replace("(+98) ", "");
                $scope.loadingVisible = true;
                authService.getRegCode(str).then(function (response) {

                    $scope.loadingVisible = false;
                    $scope.vertificationCodeEntered = response.code;
                    $scope.vertificationCode = response.code;
                    $scope.isValidateButtonVisible = true;
                    $scope.isSendButtonVisible = false;
                    
                    ////////////////////////////////////
                    var c = 30;
                    $scope.timer = setInterval(function () {

                        c--;
                        // if ($scope.isVertificated = false) { clearInterval(x); }
                        //else {
                        if (c < 0) {
                            clearInterval($scope.timer);

                            $scope.$apply(function () {
                                $scope.vertificationCodeEntered = null;
                                $scope.vertificationCode = null;
                                $scope.validateText = "Validate";
                                $scope.isValidateButtonVisible = false;
                                $scope.isSendButtonVisible = true;
                            });
                        }
                        else
                            $scope.$apply(function () {
                                $scope.validateText = "Validate (" + c + ")";
                            });
                        //}

                    }, 1000);
                     
                }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

               
                 

                /////////////////////////////////
            }
           
        }
    };

    $scope.vertificationCodeEntered=null;
    $scope.txt_vertificationCode = {
        validationGroup: 'validate',
        placeholder: "Enter Vertification Code",
        showClearButton: false,
        bindingOptions: {
            value: 'vertificationCodeEntered'
        }
    };
    $scope.validateText = "Validate";
    $scope.btn_validate = {
        icon: "check",
        type: "success",
        text: "Validate",
        width: '100%',
        //useSubmitBehavior: true,
        validationGroup: 'validate',
        bindingOptions: {
            text:'validateText'
        },
        onClick: function (e) {

            var result = e.validationGroup.validate();
            if (result.isValid) {
                var str = $scope.entity.MobileNumber;
                str=str.replace("(+98) ", "");
                $rootScope.updateUserRegistrationData({Mobile:str});
                $scope.validateText = 'Validation is done';
                clearInterval($scope.timer);
                $location.path('/register/s2');
                // DevExpress.ui.notify(JSON.stringify($scope.entity));
                // console.log($scope.entity); }

            }
            else {
                //$scope.isValidateButtonVisible = false;
                //$scope.isSendButtonVisible = true;
            }
        }
    };
 

    $scope.mobileNumberValidationRules = {
        validationGroup:'mobile',
        validationRules: [{
            type: "required",
            message: "Mobile Number is required"
        }]
    };
    $scope.vertificationCodeValidationRules = {
        validationGroup: 'validate',
        validationRules: [{
            type: "compare",
            comparisonTarget: function () {
                //var Code = $scope.vertificationCode;
                //if (Code) {
                return $scope.vertificationCode;
                //}
            },
            //comparisonTarget: 'vertificationCode',
            message: "Vertification Code does not match.",
      
        },
            {
                type: "required",
                message: "Mobile Number is required"
            }
        ]
    };
    $rootScope.page_title = 'Register';
    $scope.scroll_height = $(window).height() - 45 - 62;
    $('.register0').fadeIn();


    //////////////////////////////////////////
    $scope.$on('PageLoaded', function (event, prms) {
        //footerbook
        //  if (prms == 'footer')
        //      $('.footer' + $scope.active).addClass('active');


    });
    $rootScope.$broadcast('AppLibraryLoaded', null);


}]);
