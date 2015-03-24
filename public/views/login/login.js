app.controller("LoginCtrl", function($scope, $http, $location, $rootScope){
    $scope.login = function(user){
        console.log(user);
        $http.post("/login", user)
        .success(function(response){
            console.log(response);
            $rootScope.currentUser = response;
            $location.url("/profile");
        });
    }
});
