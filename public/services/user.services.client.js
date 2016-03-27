(function(){
    angular
        .module("WhiteBoardApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            login: login,
            logout: logout,
            register: register,
            findAllUsers: findAllUsers,
            deleteUser: deleteUser,
            updateUser: updateUser,
            createUser: createUser
        };
        return api;

        function logout() {
            return $http.post("/logout");
        }

        function createUser(user) {
            return $http.post('/rest/user', user);
        }

        function updateUser(userId, user) {
            return $http.put('/rest/user/'+userId, user);
        }

        function deleteUser(userId) {
            return $http.delete('/rest/user/'+userId);
        }

        function findAllUsers() {
            return $http.get("/rest/user");
        }

        function register(user) {
            return $http.post("/register", user);
        }

        function login(user) {
            return $http.post("/login", user);
        }
    }
})();