(function()
{
    angular
        .module("WhiteBoardApp")
        .controller("NavCtrl", NavCtrl);
    
    function NavCtrl($scope, $http, $location, $rootScope)
    {
        $scope.logout = function()
        {
            $http.post("/logout")
            .success(function()
            {
                $rootScope.currentUser = null;
                $location.url("/home");
            });
        } 
    }
})();
