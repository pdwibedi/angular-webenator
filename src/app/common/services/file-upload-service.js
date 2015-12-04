angular.module('angularTest')
    .service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data){
                debugger;
            })
            .error(function(error){
                debugger;
            });
        }
    }]
);