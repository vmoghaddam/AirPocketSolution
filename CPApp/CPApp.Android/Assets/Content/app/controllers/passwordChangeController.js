'use strict';
app.controller('passwordChangeController', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', '$route', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, $route) {
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
        CurrentPassword: null,
        ConfirmPassword: null,
        NewPassword:null,
    };
    $scope.txt_currentPassword={
        mode: "password",
        placeholder: "Enter current password",
        showClearButton: true,
        bindingOptions: {
            value:'entity.CurrentPassword'
        }
    };
    $scope.txt_newPassword = {
        mode: "password",
        placeholder: "Enter new password",
        showClearButton: true,
        bindingOptions: {
            value: 'entity.NewPassword'
        }
    };
    $scope.txt_confirmPassword = {
        mode: "password",
        placeholder: "Confirm new password",
        showClearButton: true,
        bindingOptions: {
            value: 'entity.ConfirmPassword'
        }
    };
    $scope.btn_save = {
        icon: "check",
        type: "success",
        text: "Update",
        validationGroup: 'privacypassword',
        //useSubmitBehavior: true,
        onClick: function (e) {
           // DevExpress.ui.notify(JSON.stringify($scope.entity));
            // console.log($scope.entity);
            var result = e.validationGroup.validate();

            if (!result.isValid) {
                //   General.ShowNotify('Please fill in all required fields.', 'error');
                return;
            }
            var dto={UserName:$rootScope.userName,Password:$scope.entity.NewPassword,Old:$scope.entity.CurrentPassword,Confirmed:$scope.entity.ConfirmPassword};
        
            $scope.loadingVisible = true;
            authService.changePassword(dto).then(function (response) {
                $scope.loadingVisible = false;
                $scope.entity = {
                    CurrentPassword: null,
                    ConfirmPassword: null,
                    NewPassword:null,
                };
                


            },
                      function (err) {
                         
                          $scope.loadingVisible = false;
                          $scope.message = err.message;
                          General.ShowNotify(err.message, 'error');

                      });

         
        }
    };
    $scope.currentpasswordValidationRules = {
        validationGroup: 'privacypassword',
        validationRules: [{
            type: "required",
            message: "current Password is required"
        }]
    };
    $scope.newpasswordValidationRules = {
        validationGroup: 'privacypassword',
        validationRules: [{
            type: "required",
            message: "new Password is required"
        }]
    };

    $scope.confirmPasswordValidationRules = {
        validationGroup: 'privacypassword',
        validationRules: [{
            type: "compare",
            comparisonTarget: function () {
                var password = $("#newPasswordprivacy").dxTextBox("instance");
                //entity.NewPassword; //$("#password-validation").dxTextBox("instance");
                if (password) {
                    return password.option("value");
                }
            },
            message: "'Password' and 'Confirm Password' do not match."
        },
        {
            type: "required",
            message: "Confirm Password is required"
        }]
    };

    //$("#newpassword").dxTextBox({
    //    mode: "password",
    //    placeholder: "Enter new password",
    //    showClearButton: true,
    //    value: "f5lzKs0T",
    //});
    //$("#confirmpassword").dxTextBox({
    //    mode: "password",
    //    placeholder: "confirm password",
    //    showClearButton: true,
    //    value: "f5lzKs0T",
    //});


    //////////////////////////////

    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'Privacy Settings';
        $scope.scroll_height = $(window).height() - 45 - 62;
        $('.passwordchange').fadeIn();
       
    }
    //////////////////////////////////////////
    $scope.$on('PageLoaded', function (event, prms) {
        //footerbook
        //  if (prms == 'footer')
        //      $('.footer' + $scope.active).addClass('active');


    });
    $rootScope.$broadcast('AppLibraryLoaded', null);


}]);
