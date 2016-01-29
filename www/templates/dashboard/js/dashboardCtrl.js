// Controller of menu dashboard page.
appControllers.controller('dashboardCtrl', function ($scope, $mdToast, $timeout, $mdUtil, $mdSidenav, $mdBottomSheet, $log, $ionicHistory, $state, ionicMaterialInk,ionicMaterialMotion, $ionicNativeTransitions) {

  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');


  // Set Header
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);

  // Set Motion
  $timeout(function() {
    ionicMaterialMotion.slideUp({
      selector: '.slide-up'
    });
  }, 300);

  $timeout(function() {
    ionicMaterialMotion.fadeSlideInRight({
      startVelocity: 3000
    });
  }, 700);

  // Set Ink
  ionicMaterialInk.displayEffect();



  // buildToggler is for create menu toggle.
  // Parameter :
  // navID = id of navigation bar.
  function buildToggler(navID) {
    var debounceFn = $mdUtil.debounce(function () {
      $mdSidenav(navID).toggle();
    }, 0);
    return debounceFn;
  };// End buildToggler.

  // navigateTo is for navigate to other page
  // by using targetPage to be the destination state.
  // Parameter :
  // stateNames = target state to go
  $scope.navigateTo = function (stateName) {
    $timeout(function () {
      $mdSidenav('left').close();
      if ($ionicHistory.currentStateName() != stateName) {
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $state.go(stateName);
      }
    }, ($scope.isAndroid == false ? 300 : 0));
  };// End navigateTo.

  //ShowToast for show toast when user press button.
  $scope.showToast = function (menuName) {
    //Calling $mdToast.show to show toast.
    $mdToast.show({
      controller: 'toastController',
      templateUrl: 'toast.html',
      hideDelay: 800,
      position: 'top',
      locals: {
        displayOption: {
          title: 'Going to ' + menuName + " !!"
        }
      }
    });
  }// End showToast.

  // For show show List Bottom Sheet.
  $scope.showListBottomSheet = function ($event) {
    $mdBottomSheet.show({
      templateUrl: 'ui-list-bottom-sheet-template',
      targetEvent: $event,
      scope: $scope.$new(false)
    });
  };// End of showListBottomSheet.

  // For show Grid Bottom Sheet.
  $scope.showGridBottomSheet = function ($event) {
    console.log("showing bottomsheet from dashboardCtrl");
    $mdBottomSheet.show({
      templateUrl: 'ui-grid-bottom-sheet-template',
      targetEvent: $event,
      scope: $scope.$new(false)
    });
  };// End of showGridBottomSheet.

  // For close list bottom sheet.
  $scope.closeListBottomSheet = function () {
    $mdBottomSheet.hide();
  } // End of closeListBottomSheet.


});// End of controller menu dashboard.

