'use strict';

angular.module('kposApp')
  .service('authenticationService', function ($resource, $cookies, $location, $q) {
    var flag = false;

    return {
      logIn: logIn,
      logOut: logOut,
      checkStatus: checkStatus,
      getCookie:getCookie
    };

    function logIn(user, password){
      var deferred = $q.defer();
      //endpoint deberia llamarse login
      var r = $resource('api/login');
      r.save({userName: user, password: password}, function(data){
        if(data && data.result){

          //TODO: arreglar este problema de seguridad
          $cookies.putObject('user', data.result);
          flag = true;
          deferred.resolve(flag);
        }else{
          flag = false;
          deferred.resolve(flag);
        }
      });
      return deferred.promise;
    }

    function logOut(){
      //TODO: al hacer logout se debe llamar al server para que haga el logout y luego
      //de que el server responda algo se debe eliminar la cookie
      $cookies.remove('user');
    }

    function checkStatus(){
      if($cookies.getObject('user') === 'undefined'){
        $location.path('/login');
      }else{
        $location.path('/home');
      }
    }
    function getCookie(){
      //TODO: necesitamos tener a la mano la información del usuario logeado
      //      algo como {user: usuario, nombre: nombre, session_id: 102912012}
      return $cookies.getObject('user');
    }
});
