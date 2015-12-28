module.exports = {
    port: 3000,
    client: {
        assets: {
            js: [
                'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
                'http://code.jquery.com/ui/1.10.3/jquery-ui.js',
                'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js',
                'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js',
                'https://rawgithub.com/angular-ui/ui-sortable/master/src/sortable.js',
                'http://code.angularjs.org/1.2.13/angular-cookies.js',
                'http://maps.googleapis.com/maps/api/js',
                'vendor/js/jquery.minicolors.js',
                'vendor/js/angular-ui-router.min.js',
                'app/router.js',
                'app/common/common.js',
                'app/common/models/home-model.js',
                'app/common/models/edit-model.js',
                'app/common/services/auth-service.js',
                'app/common/services/flash-service.js',
                'app/common/services/user-service.js',
                'app/login/login-controller.js',
                'app/register/register-controller.js',
                'assets/scripts/carousel.js',
                'app/common/models/static-template-model.js',
                'app/common/services/file-upload-service.js',
                'app/home/home-controller.js',
                'app/edit/edit-controller.js',
                'app/directive/renderTemplate/renderTemplate-directive.js',
                'app/directive/editableContent/editableContent-directive.js',
                'app/directive/renderTemplateMiniature/renderTemplateMiniature-directive.js',
                'app/directive/limitCharacterRender/limitCharacterRender-directive.js',
                'app/directive/flexibleSection/flexibleSection-directive.js',
                'app/directive/overlay/overlayComponent-directive.js',
                'app/directive/accordionMenu/accordionMenu-directive.js',
                'app/directive/uploadWidget/uploadWidget-directive.js',
                'app/directive/bubbleInfo/bubbleInfo-directive.js',
                'app/directive/colorPicker/minicolors-directive.js'
            ],
            css: [
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css',
                'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
                'assets/css/styles.css',
                'assets/css/miniature.css',
                'assets/css/edit.css',
                'assets/css/theme.css',
                'vendor/css/jquery.minicolors.css'
            ],
            fonts: [
                'https://fonts.googleapis.com/css?family=Open+Sans'
            ]
        }
    }
};