'use strict';
app.controller('register1Controller', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', '$route', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, $route) {
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

    $scope.positions = [
        'TRE', 'TRI', 'LTC', 'P1', 'P2', 'ISCCM', 'SCCM', 'CCM'
    ];

    //// Controls ////////////////
    $scope.entity = {
       
        FirstName: null,
        LastName: null,
        Email:null,
        Password: null,
        Position: null,
        NID:null,
    };
    
    $scope.txt_firstName = {
        placeholder: "Enter First Name",
        showClearButton: true,
        bindingOptions: {
            value: 'entity.FirstName'
        }
    };
    $scope.txt_lastName = {
        placeholder: "Enter Last Name",
        showClearButton: true,
        bindingOptions: {
            value: 'entity.LastName'
        }
    };
    $scope.txt_email = {
        hoverStateEnabled: false,
        placeholder: "Enter Email Address",
        showClearButton: true,
        bindingOptions: {
            value: 'entity.Email'

        }
    };
    $scope.sb_position = {
        dataSource: $scope.positions,
        bindingOptions: {
            value: 'entity.Position'

        }                     
    };
    $scope.txt_password = {
        mode: "password",
        placeholder: "Enter password",
        showClearButton: true,
        bindingOptions: {
            value: 'entity.Password'
        }
    };
    $scope.txt_confirmPassword = {
        mode: "password",
        placeholder: "Confirm Password",
        showClearButton: true,
        bindingOptions: {
            value: 'entity.ConfirmPassword'
        }
    };
    $scope.sb_Base = {

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
            value: 'entity.Home',


        }
    };
    $scope.btn_save = {
       // icon: "check",
        type: "success",
        text: "Save",
        width:'100%',
        useSubmitBehavior: true,
        onClick: function (e) {
            if (!$scope.entity.Home)
                return;
            var reg = $rootScope.getUserRegistrationData();
            $scope.entity.Mobile = reg.Mobile;
            console.log($scope.entity);
            $scope.loadingVisible = true;
            authService.registerCrewPocket($scope.entity).then(function (response) {
                $scope.loadingVisible = false;
                 
                 
                General.Modal("Thank you for registration.You can update your profile or change privacy settings later. Please sign in to your account.", function () {

                    $scope.$apply(function () {
                        authService.logOut();
                    });

                });
            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
        }
    };
    $scope.txt_nid = {

        valueChangeEvent: 'keyup',
        readOnly: false,
        hoverStateEnabled: false,

        mask: "999-999999-9",

        maskInvalidMessage: 'Wrong value',
        bindingOptions: {
            value: 'entity.NID',
            
        }
    };
    $scope.mobileNumberValidationRules = {
        validationRules: [{
            type: "required",
            message: "Mobile Number is required"
        }]
    };
    $scope.firstNameValidationRules = {
        validationRules: [{
            type: "required",
            message: "First Name is required"
        }]
    };
    $scope.homeBaseValidationRules = {
        validationRules: [{
            type: "required",
            message: "Home Base is required"
        }]
    };
    $scope.lastNameValidationRules = {
        validationRules: [{
            type: "required",
            message: "Last Name is required"
        }]
    };
    $scope.nidValidationRules = {
        validationRules: [{
            type: "required",
            message: "National Code is required"
        }]
    };
    $scope.emailValidationRules = {
        validationRules: [{
            type: "required",
            message: "Email is required"
        }, {
            type: "email",
            message: "Email is invalid"
        }//,{
          //  type: "async",
         //   message: "Email is already registered",
         //   validationCallback: function (params) {
         //       return sendRequest(params.value);
         //   }
    //    }
    ]
    };
    $scope.positionValidationRules = {
        validationRules: [{
            type: "required",
            message: "Position is required"
        }]
    };
    $scope.passwordValidationRules = {
        validationRules: [{
            type: "required",
            message: "new Password is required"
        }]
    };

    $scope.confirmPasswordValidationRules = {
        validationRules: [{
            type: "compare",
            comparisonTarget: function () {
                var password = $("#pass").dxTextBox("instance");
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

           $rootScope.page_title = 'Register';
        $scope.scroll_height = $(window).height() - 45 - 28;
        $('.register1').fadeIn();

   
    //////////////////////////////////////////
    $scope.$on('PageLoaded', function (event, prms) {
        //footerbook
        //  if (prms == 'footer')
        //      $('.footer' + $scope.active).addClass('active');


    });
    $rootScope.$broadcast('AppLibraryLoaded', null);


}]);
