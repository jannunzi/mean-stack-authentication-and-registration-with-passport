(function()
{
    angular
        .module("PassportApp")
        .controller('ProfileCtrl', ProfileCtrl);
    
    function ProfileCtrl($scope, UserService)
    {
        $scope.update = update;

        function update(user)
        {
            UserService
                .updateUser(user._id, user)
                .then(
                    function(response) {
                        $scope.users = response.data;
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();
