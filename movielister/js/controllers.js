// var jsonfile = require('jsonfile');
// var util = require('util');

// 필터 - search 필터
(function(){
  var searchFor = function(){
    return function(arr, searchString) {
      if(!searchString) {
        return arr;
      }
      var result = [];
      searchString = searchString.toLowerCase();
      angular.forEach(arr, function(item){
        if(item.movie.title[0].toLowerCase().indexOf(searchString) !== -1) {
          result.push(item);
        }
      });
      return result;
    };
  };

  angular.module('myApp').filter('searchFor', searchFor);
}());


// 팩토리 -- sharedMoviesFactory --  무비 data 공유를 위한 팩토리
(function(){
  var sharedMoviesFactory = function($http){
    var sharedMovies = {};

    sharedMovies.getMoviesData = function() {
      return $http.get('moviedata.json');
    };

    return sharedMovies;
  };

  sharedMoviesFactory.$inject = ['$http'];
  angular.module('myApp').factory('sharedMoviesFactory', sharedMoviesFactory);
}());

// 컨트롤러 - ListController
(function(){
  var ListController = function($scope, $http, $rootScope, sharedMoviesFactory) {
    // $scope.movies;
    $rootScope.ngShowLists = true;
    $scope.ngShowLists = $rootScope.ngShowLists;

    getMovies();
    function getMovies() {
      sharedMoviesFactory.getMoviesData().success(function(data){
        $scope.movies = data;
      }).error(function(error){
        console.log('error occured when loading movies data');
      });
    }

    // Using electron jsonfile module
    // var file = __dirname + '\\moviedata.json';
    // $scope.movies=jsonfile.readFileSync(file);
  };

  // 인젝트 - ListController
  ListController.$inject = ['$scope', '$http','$rootScope','sharedMoviesFactory'];

  angular.module('myApp').controller('ListController', ListController);
}());



// 컨트롤러 - DetailsController
(function(){
  // 컨트롤러 이름으로 펑션 정의
  var DetailsController = function($scope, $routeParams, $location, $rootScope, sharedMoviesFactory){
    // factory 에서 sharedMovies 를 공유하는 방식으로 수정

    // $http.get('moviedata.json').success(function(data){
    //   $scope.movies = data;
    // });

    // 라우터 파라미터에서 값을 가져와서 whichItem 에 저장
    $scope.whichItem = $routeParams.itemId;


    $rootScope.ngShowLists = false;
    $scope.ngShowLists = $rootScope.ngShowLists;

    // $scope.movies;
    getMovies();
    function getMovies() {
      sharedMoviesFactory.getMoviesData().success(function(data){
        $scope.movies=data;
        // 카루셀 갯수
        // $scope.carouselCounts = $scope.movies[$scope.whichItem].movie.fanart[0].thumb.length;
        // console.log($scope.movies[$scope.whichItem].movie.fanart[0].thumb.length);
        $scope.thumbs = $scope.movies[$scope.whichItem].movie.fanart[0].thumb;
      }).error(function(error){
        console.log('error occured when loading movies data');
      });
    }


    // $location url
    $scope.currentURL = $location.url();
    console.log($scope.currentURL);

    // Using electron jsonfile module
    // var file2 = __dirname + '\\moviedata.json';
    // $scope.movies=jsonfile.readFileSync(file2);
  };


  // 인젝트 - DetailsController
  DetailsController.$inject = ['$scope','$routeParams','$location','$rootScope', 'sharedMoviesFactory'];
  angular.module('myApp').controller('DetailsController', DetailsController);
}());
