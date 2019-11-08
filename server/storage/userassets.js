$scope.uploadPic = function (file) {
    Upload.upload({
      url: '/api/containers/userassets/upload',
      file: file
    }).then(function (response) {
      $scope.orgLogo = "/api/containers/userassets/download/" + response.data.result.files.file[0].name;
      file.result = response.data;
      $timeout(function () {
        $scope.result = response.data;
      });
    }, function (response) {
      if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // You can get upload progress here
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }