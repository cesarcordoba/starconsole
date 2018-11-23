angular.module('myapp')
.controller('planetaCtrl', function ( $scope, Planeta, $stateParams, Satelite ) {

    const
        id = $stateParams.id,
        self = this

    self.planeta = {
        singular : '',
        plural : ''
    }

    self.nuevo = {

        satelite : {},
        crear : () => {


            Satelite.crear(Object.assign(this.nuevo.satelite, {  IdPlaneta : id  }))
            .then(response => this.satelites.push(new satelite_(response.data)))
            .then(() => self.nuevo.satelite = {})
            .then(() => $scope.$digest())



        }

    }

    class artificial_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            Planeta.one(arg.planeta)
            .then(response => this.planeta = response.data)
            .then(() => $scope.$digest())

        }
    }

    Planeta.one(id)
    .then(response => self.planeta = response.data)
    .then(response => console.log(response))
    .then(() => $scope.$digest())

    Satelite.xPlaneta(id)
    .then(response => self.satelites = response.data.map(n => new satelite_(n)))
    .then(() => $scope.$digest())

    Satelite.artificiales(id)
    .then(response => self.artificiales = response.data.map(n => new artificial_(n)))
    .then(response => console.log(response))
    .then(() => $scope.$digest())

    class satelite_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
        }
        editar(){

            Satelite.editar(this)


        }
    }

    $scope.predefinidos = [
        {
            status : 0,
            nombre : `xNombre`,
            ruta_back : `xNombre`,
            ruta_front : `xNombre/', nombre`,
            tipo : 'put',
            descripcion : `Se buscan los items por el nombre`,
            contenido : `
            .findAll({
                where : {
                    nombre : {
                        $like :  '%' + req.body.nombre + '%',
                    },
                    status : req.body.status
                }
            })

            `,
            params : `nombre`
        }
    ]

    $scope.fijar = (x) => {
        console.log(x)
        self.nuevo.satelite = x


    }



})
