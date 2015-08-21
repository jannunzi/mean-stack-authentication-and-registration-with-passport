(function()
{
    angular
        .module("WhiteBoardApp")
        .controller("HomeController", HomeController);
    
    function HomeController($scope)
    {
        $scope.hello = "Hello from home controller";
    }
})();