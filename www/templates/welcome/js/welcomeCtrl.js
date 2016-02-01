// Controller of catalog Page.
appControllers.controller('welcomeCtrl', function ($scope, $mdToast, $mdDialog, $timeout, $mdUtil, $mdSidenav, $log, $ionicHistory, $state, ionicMaterialInk,ionicMaterialMotion, $ionicNativeTransitions) {

  // Set Header
  $scope.$parent.hideHeader();
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

  // showConfirmDialog for show alert box.
  $scope.showConfirmDialog = function ($event) {
    //mdDialog.show use for show alert box for Confirm Order.
    $mdDialog.show({
      controller: 'DialogController',
      templateUrl: 'confirm-dialog.html',
      targetEvent: $event,
      locals: {
        displayOption: {
          title: "Confirm Order",
          content: "Confirm to add Order.",
          ok: "Confirm",
          cancel: "Close"
        }
      }
    }).then(function () {
      //  For confirm button to Order.

      // Showing Item added.! toast.
      $mdToast.show({
        controller: 'toastController',
        templateUrl: 'toast.html',
        hideDelay: 1200,
        position: 'top',
        locals: {
          displayOption: {
            title: "Item added."
          }
        }
      }); // Ends showing toast.
    }, function () {
      // For cancel button to Order.
    });
  }// End showConfirmDialog.

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

});// End of catalog controller.
