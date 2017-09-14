var myApp = angular.module('myApp',['ngRoute']);

myApp.config(
  ['$routeProvider', function($routeProvider){
  $routeProvider.
    when('/list', {
      templateUrl: 'partials/list.html',
      controller: 'ListController'
    }).
    when('/details/:itemId', {
      templateUrl: 'partials/details.html',
      controller: 'DetailsController'
    }).
    otherwise({
      redirectTo: '/list'
    });
} // function($routeProvider)
] // myconfig array
); // myApp.config ending

// 점보트론 보이기
// -- 이 방법 보다는 sharedMoviesFactory 팩토리를 이용하는게 더 좋다.
// 팩토리 이용방법은 추후에 알아보자
myApp.run(function($rootScope){
$rootScope.ngShowLists = true;
});
