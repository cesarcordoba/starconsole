app.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {

    var template = ( vista ) => new Object({
        name: vista,
        files: [ 'js/frags/' + vista + '.js' ]
    })

    $ocLazyLoadProvider.config({
        debug: false,
        modules: [


            // componentes('main', 'home', ['producto']),
            // componentes('main', 'productos', ['producto']),
			// componentes('main', 'producto', ['producto']),

            template('home'),
            template('planetas'),
            template('constelaciones'),
            template('planeta'),
            template('bitacora'),


        ]
    });


}]);
