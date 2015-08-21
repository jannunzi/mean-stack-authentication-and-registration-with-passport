(function()
{
    angular
        .module("WhiteBoardApp")
        .controller('ProfileCtrl', ProfileCtrl);
    
    function ProfileCtrl($scope, $http)
    {
        $scope.update = function(user)
        {
            $http.put('/rest/user/'+user._id, user)
            .success(function(users)
            {
                $scope.users = users; 
            });
        }
    }  
})();
