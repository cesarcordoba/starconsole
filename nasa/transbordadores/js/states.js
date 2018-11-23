// app.run([
//     '$rootScope',
//     '$state',
//     '$stateParams',
//     function($rootScope, $state, $stateParams) {
//         $rootScope.$state = $state;
//         $rootScope.$stateParams = $stateParams;
//     }
// ]);

app.config([
    '$urlRouterProvider',
    '$stateProvider',
    function($urlRouterProvider, $stateProvider) {

        const template = (vista, url) => {
            console.log('si')
            return new Object({
                url: url,
                views: {
                    'main': {
                        templateUrl: '/pages/' + vista,
                        controller: vista + 'Ctrl as ctrl'
                    }
                },
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([vista]);
                        }
                    ]
                }
            })
        }


        $urlRouterProvider.otherwise('/');
        $stateProvider

        .state('home', template('home', '/'))
        .state('planetas', template('planetas', '/planetas'))
        .state('planeta', template('planeta', '/planeta/:id', { id : null}))
        .state('constelaciones', template('constelaciones', '/constelaciones'))
        .state('bitacora', template('bitacora', '/bitacora'))



    }
]);
