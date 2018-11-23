angular.module('myapp')
.controller('constelacionesCtrl', function ( $scope, Constelacion, Planeta, Galaxia ) {


    const self = this

    Galaxia.obtener()
    .then(response => self.galaxias = new galaxias_(response.data))
    .then(() => $scope.$digest())

    Planeta.obtener()
    .then(response => self.planetas = response.data)
    .then(() => $scope.$digest())

    class galaxias_{
        constructor(items){
            this.items = items.map(n => new galaxia_(n))
        }
    }

    class galaxia_{
        constructor(n){
            Object.entries(n).forEach(n => this[n[0]] = n[1])
            this.constelaciones = new constelaciones_(n)
        }
    }

    $scope.crearConstelacion = () => {
        $scope.nuevo.IdGalaxia = $scope.nuevo.galaxia.id
        Constelacion.crear($scope.nuevo)
        .then(response => self.galaxias.items.forEach(n => n.obtener()))
        .then(() => delete $scope.nuevo)
    }

    class constelaciones_ {
        constructor(galaxia) {
            this.galaxia = galaxia
            this.obtener()
            this.grafico()

        }


        obtener(){
            Constelacion.xGalaxia(this.galaxia.id)
            .then(response => this.items = response.data.map(n => new constelacion_(n)))
            .then(response => console.log(response))
        }
        grafico(){
            Constelacion.hierarchy(this.galaxia.id)
            .then(response => {

                console.log(response)

                var width = $('.grafico').width(),
                    height = 500;

                var canvas = d3.select('#total')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);

                var data = {
                    "name": "Top Level",
                    "children": [
                        {
                            "name": "Level 2: A",
                            "children": [
                                { "name": "Son of A" },
                                { "name": "Daughter of A" }
                            ]
                        },
                        { "name": "Level 2: B" }
                    ]
                };

                const margin = { top: 0, right: 50, bottom: 0, left: 75};
                const innerWidth = width - margin.left - margin.right;
                const innerHeight = height - margin.top - margin.bottom;

                const arbol = d3.tree().size([innerHeight, innerWidth]);

                const root = d3.hierarchy({
                    nombre : this.galaxia.nombre,
                    children : response.data
                })
                const links = arbol(root).links();

                // const linkPathGenerator = d3.linkHorizontal().x(d => d.y).y(d => d.x)
                console.log(root)

                canvas.selectAll('path').data(links)
                    .enter()
                    .append('path')
                    .attr('d', d3.linkHorizontal()
                        .x(d => d.y)
                        .y(d => d.x)
                    )


                canvas.selectAll('text').data(root.descendants())
                    .enter().append('text')
                    .attr('x', d => d.y)
                    .attr('y', d => d.x)
                    .attr('dy', '0.32em')
                    .attr('text-anchor', (d) => d.children ? 'middle' : 'start')
                    .attr('font-size', (d) => 2 - (d.depth * .5) + 'em')
                    .text(d => d.data.nombre);
            })
            .then(() => $scope.$digest())
        }
    }




    class constelacion_{
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
        }
        crearOrbita(){
            // Planeta.saltoespacial({
            //     preplaneta : { id : this.id, nombre : this.singular },
            //     orbita : this.nuevaorbita,
            //     subplaneta : { id : this.nuevoplaneta.id, nombre : this.nuevoplaneta.singular }
            // })
            // .then(response => console.log(response))
        }
        eliminar(idx){
            Constelacion.eliminar(this.id)
            .then(response => self.constelaciones.items.splice(idx, 1))
            .then(() => $scope.$digest())

        }
        actualizar(){
            Constelacion.editar(this)
            .then(() => $scope.$digest())
        }
    }




})
