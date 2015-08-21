(function()
{
  angular
    .module("WhiteBoardApp")
    .controller("AdminController", AdminController);
    
  function AdminController($scope, $http)
  {
    $http.get("/rest/user")
    .success(function(users)
    {
        $scope.users = users;
    });
    
    $scope.remove = function(user)
    {
        $http.delete('/rest/user/'+user._id)
        .success(function(users){
           $scope.users = users; 
        });
    }
    
    $scope.update = function(user)
    {
        $http.put('/rest/user/'+user._id, user)
        .success(function(users){
            $scope.users = users; 
        });
    }
    
    $scope.add = function(user)
    {
        $http.post('/rest/user', user)
        .success(function(users){
            $scope.users = users; 
        });
    }
    
    $scope.select = function(user)
    {
        $scope.user = user;
    }
  }
})();