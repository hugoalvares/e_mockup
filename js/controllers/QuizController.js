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

	function validateSeason(selectedSeason) {
		if ((selectedSeason == undefined) || (selectedSeason == '')) {
			alert('Select your favorite season.');
			return false;
		} else {
			return true;
		}
	}

	// step four ----------------------------------------------------------

	$scope.selectedFood = '';

	function validateFood(selectedFood) {
		if ((selectedFood == undefined) || (selectedFood == '')) {
			alert('Select your favorite food.');
			return false;
		} else {
			return true;
		}
	}	

	// step five ----------------------------------------------------------

	// force radio button selection in the step five
	$scope.group1 = 'option1';

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
		} else if ($scope.currentStep == 3) {
			valid = validateSeason($scope.selectedSeason);
		} else if ($scope.currentStep == 4) {
			valid = validateFood($scope.selectedFood);
		}

		if (($scope.currentStep != 5) && (valid)) {
			$scope.currentStep++;
		}
	};

	$scope.restart = function() {
		$scope.superhero = '';
		$scope.series = '';
		$scope.biscuit = '';
		$scope.quote = '';
		$scope.selectedMovie = '';
		$scope.selectedSeason = '';
		$scope.episodes = '';
		$scope.selectedFood = '';

		$scope.currentStep = 1;
	}

}]);