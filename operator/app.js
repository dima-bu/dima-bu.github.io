;(function(Sandy) {
    Sandy.define('app').require([
        'config.index',
        'connections.services.sip',
        'auth.services.user',
        'auth.controllers.index',
        'operator.controllers.incomeOrderController',
        {
            name: 'angular-locale_ru-ru',
            path: './',
            external: true
        }
    ]).exports(function(scope) {
        // Declare app level module which depends on views, and components
        angular.module('app', [
            'ngRoute',
            'connections',
            'config',
            'operator',
            'auth',
            'ui.bootstrap',
            'ui.bootstrap.tooltip'
        ]).
            config(['$routeProvider', 'SipServiceProvider', 'ConfigurationProvider', 'AuthServiceProvider', function ($routeProvider, SipService, ConfigurationProvider, AuthService) {
                var config = ConfigurationProvider.$get();
                AuthService.$get();
                $routeProvider.otherwise({redirectTo: '/operator/dashboard'});
            }])
            .run(['AuthService', 'Configuration', 'SipService', '$rootScope', function(AuthService, config, Sip, $rootScope) {
                //Global runtime info is stored ONLY here!
                $rootScope.runtime = {
                    incomingCall: false
                };

                window.rc = $rootScope;

                AuthService = AuthService.$get();
                //@TODO: remove on auth
                AuthService.authorize('testuser','abc', function(status, err) {
                    if(status) {
                        var profile = AuthService.userProfile();
                        config.sip = _.defaults({
                            displayName: profile.sip.username,
                            login: profile.sip.username,
                            password: profile.sip.password,
                            publicIdentity: 'sip:'+profile.sip.username+'@'+config.sip.realm
                        }, config.sip);
                        $rootScope.config = config;

                        //TODO: Get from backend
                        $rootScope.params = {
                            arrivalDelta: 15,
                            arrivalDelay: 0
                        };
                        $rootScope.$apply();
                        $rootScope.$emit('userLogin');
                        Sip.setConfig(config.sip);
                        Sandy.EventBus.on('Sip:onIncomingCall', function() {
                            $rootScope.runtime.incomingCall = true;
                            $rootScope.$apply();
                        });

                        Sandy.EventBus.on('Sip:onAcceptCall onHangup onTerminate', function() {
                            if(Sip.calls.length == 1 && Sip.currentCall !== -1) {
                                $rootScope.runtime.incomingCall = false;
                                $rootScope.$apply();
                            }
                        });

                    } else
                        Sandy.debugError(err);
                });
                window.sip = Sip;
                Sandy.setLoadState(true);
                Sandy.debug('Application loaded');
            }])
            .controller('toplineCtrl', ['$rootScope', '$scope', 'SipService', function($rootScope, $scope, Sip) {
                $scope.actions = {
                    answer: function() {
                        if($scope.call)
                            Sip.accept($scope.call.id);
                        $scope.call = false;
                    },
                    reject: function() {
                        if($scope.call)
                            Sip.hangup($scope.call.id);
                        $scope.call = false;
                    }
                }

            }]);
        Sandy.debug('pre-load complete');
        angular.bootstrap(document, ['app']);
    });
})(Sandy);