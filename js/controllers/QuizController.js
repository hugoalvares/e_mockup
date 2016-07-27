app.controller('QuizController', ['$scope', '$http', function($scope, $http){
	$scope.currentStep = 1;

	// step one ----------------------------------------------------------

	$scope.superhero = '';
	$scope.series = '';
	$scope.biscuit = '';
	$scope.quote = '';

	function validateForm(scope) {
		var formOk = true;

		if ((scope.superhero == undefined) || (scope.superhero == '')) {
			alert('Inform your favorite superhero.');
			formOk = false;
		} else if ((scope.series == undefined) || (scope.series == '')) {
			alert('Inform the series that you are currently watching.');
			formOk = false;
		} else if ((scope.biscuit == undefined) || (scope.biscuit == '')) {
			alert('Inform wich one do you use: bolacha or biscoito.');
			formOk = false;
		} else if ((scope.quote == undefined) || (scope.quote == '')) {
			alert('Inform your favorite quote.');
			formOk = false;
		}

		return formOk;
	};

	// step two ----------------------------------------------------------

	$scope.listOfMovies = '';
	getMoviesList('http://www.omdbapi.com/?s=%22Star%20Wars:%20Episode%22');
	$scope.selectedMovie = '';

	function getMoviesList(url) {
		$http.get(url).then(function(response) {
			$scope.listOfMovies = response.data.Search;
		});
	};

	function validateMovie(selectedMovie) {
		if ((selectedMovie == undefined) || (selectedMovie == '')) {
			alert('Select your favorite movie.');
			return false;
		} else {
			return true;
		}
	}

	// step three ----------------------------------------------------------

	$scope.got = '';
	$scope.numberOfSeasons = '';
	$scope.selectedSeason = '';
	$scope.episodes = '';
	
	getGot('http://www.omdbapi.com/?t=Game%20of%20Thrones');

	function getGot(url) {
		$http.get(url).then(function(response) {
			$scope.got = response.data;
			$scope.numberOfSeasons = response.data.totalSeasons;
			$scope.numberOfSeasons = getNumber(parseInt($scope.numberOfSeasons));
		});
	};

	function getNumber(num) {
	    return new Array(num);   
	}

	$scope.getSeasonDetails = function(season) {
		var url = 'http://www.omdbapi.com/?t=Game%20of%20Thrones&season=' + season;

		$http.get(url).then(function(response) {
			$scope.episodes = response.data.Episodes;
		});
	}

	// general ----------------------------------------------------------

	$scope.back = function() {
		if ($scope.currentStep != 1) {
			$scope.currentStep--;
		}
	};

	$scope.next = function() {
		var valid = true;

		if ($scope.currentStep == 1) {
			valid = validateForm($scope);
		} else if ($scope.currentStep == 2) {
			valid = validateMovie($scope.selectedMovie);
		}



		if (($scope.currentStep != 5) && (valid)) {
			$scope.currentStep++;
		}
	};

}]);