(function()
{
    angular
        .module("WhiteBoardApp")
        .controller("LoginCtrl", LoginCtrl);
    
    function LoginCtrl($scope, $http, $location, $rootScope)
    {
        $scope.login = function(user)
        {
            $http.post("/login", user)
            .success(function(response)
            {
                $rootScope.currentUser = response;
                $location.url("/profile");
            });
        }
    }
  
})();
