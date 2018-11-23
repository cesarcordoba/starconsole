angular.module('myapp')
.controller('planetasCtrl', function ( $scope, Planeta, Meteoro, $mdDialog) {

    const self = this

    self.orbitas = [
        { tipo : 2, nombre : 'HasMany' },
        { tipo : 3, nombre : 'HasOne' },
        { tipo : 4, nombre : 'BelongsToMany' },
        { tipo : 5, nombre : 'Especial' },
        { tipo : 6, nombre : 'Recursiva' },
        { tipo : 7, nombre : 'Nodo' }
    ]

    var data = [
        { id: 0, name: 'circle', path: 'M 0, 0  m -5, 0  a 5,5 0 1,0 10,0  a 5,5 0 1,0 -10,0', viewbox: '-6 -6 12 12' },
        { id: 1, name: 'square', path: 'M 0,0 m -5,-5 L 5,-5 L 5,5 L -5,5 Z', viewbox: '-5 -5 10 10' },
        { id: 2, name: 'arrow', path: 'M 0,0 m -5,-5 L 5,0 L -5,5 Z', viewbox: '-5 -5 10 10' },
        { id: 2, name: 'stub', path: 'M 0,0 m -1,-5 L 1,-5 L 1,5 L -1,5 Z', viewbox: '-1 -5 2 10' }
    ]

    class planetas_ {
        constructor() {

            this.obtener()

        }
        crear(){
            console.log($scope.nuevo)
            Planeta.crear($scope.nuevo)
            .then(response => this.obtener())
            .then(() => delete $scope.nuevo)

        }

        obtener(){
            Planeta.todo()
            .then(response => {
                this.items = response.data.map(n => new planeta_(n))
                version4(response)
            })
            .then(() => $scope.$digest())
        }
    }

    self.planetas = new planetas_()

    class planeta_{
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.nuevo = {
                meteoro : {}
            }

            Meteoro.xPlaneta(this.id)
            .then(response => this.meteoros = response.data)
            .then(() => $scope.$digest())
        }
        crearOrbita(){
            Planeta.saltoespacial({
                preplaneta : { id : this.id, nombre : this.singular },
                orbita : this.nuevaorbita,
                subplaneta : { id : this.nuevoplaneta.id, nombre : this.nuevoplaneta.singular }
            })
        }
        nuevoMeteoro(){
            $mdDialog.show({

            parent: angular.element(document.body),
            bindToController: true,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: true,
            template: `
                <form ng-submit="listo()" style="display : flex">
                    <md-input-container>
                        <label> Nombre </label>
                        <input ng-model="meteoro.nombre">
                    </md-input-container>
                    <md-input-container>
                        <label> Tipo de dato </label>
                        <md-select ng-model="meteoro.tipo">
                            <md-option ng-value="'STRING'"> STRING </md-option>
                            <md-option ng-value="'INTEGER'"> INTEGER </md-option>
                            <md-option ng-value="'TEXT'"> TEXT </md-option>
                        </md-select>
                    </md-input-container>
                    <md-button type="submit"> Listo </md-button>
                    <md-button ng-click="cancelar()"> Cancelar </md-button>
                </form>
            `,
            controller: function($scope, $mdDialog) {
                    $scope.listo = () =>  $mdDialog.hide($scope.meteoro)
                    $scope.cancelar = () =>  $mdDialog.hide();
                }
            })
            .then(response => {
                if(response)
                    Meteoro.crear(Object.assign(response, { IdPlaneta : this.id}))
                    .then(response => this.meteoros.push(response.data))
                    .then(() => $scope.$digest())
            })
        }
        eliminarMeteoro(meteoro, idx){
            console.log(meteoro)
            Meteoro.eliminar(meteoro)
            .then(response => this.meteoros.splice(idx, 1))
            .then(() => $scope.$digest())

        }
    }

    function version4(response){

        var width = $('.grafico').width(),
            height = 1400;

        var links = []
        var nodes = []


        response.data.forEach(n => {
            nodes.push({ name : n.singular })
            n.SubPlanetas.forEach(s =>
                links.push({  source : n.singular , target: s.singular })) })


        var simulation = d3.forceSimulation()
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force('collide', d3.forceCollide().radius(d => {
                return 70 } ))
            .force('link', d3.forceLink()
                .id(d => d.name))

        var canvas = d3.select('#total')
            .append('svg')
            .attr('width', width)
            .attr('height', height);


        var puntos = canvas.selectAll('.node')
        var lineas = canvas.selectAll('.link')


        var punto = puntos.data(nodes)
            .enter().append('circle')
            .attr('class', 'node')
            .attr('r', 30)

        var linea = lineas.data(links)
            .enter()
            .append('line')
            .attr('class', (d) => 'link ')
            // .attr('marker-start', function(d,i){ return 'url(#marker_circle)' })
            // .attr('marker-end', function(d,i){ return 'url(#marker_arrow)' })
            .attr('marker-end', (d) => {
                let flecha = response.data
                   .find(n => n.singular === d.source)
                   .SubPlanetas.find(n => n.singular === d.target)
                   .orbitas.nombre



                var resultado

                if(flecha === 'HasMany')
                    resultado = 'url(#marker_arrow)'
                if(flecha === 'BelongsToMany')
                    resultado = 'url(#marker_stub)'
                if(flecha === 'BelongsTo')
                    resultado = 'url(#marker_circle)'
                if(flecha === 'Nodo')
                    resultado = 'url(#marker_square)'
                return resultado

            })

        var texto = puntos.data(nodes)
            .enter()
            .append("text")
            .text((d) => d.name)
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("fill", "black");

        var marker = canvas.selectAll('marker')
            .data(data)
            .enter()
            .append('svg:marker')
            .attr('id', (d) => 'marker_' + d.name )
            .attr('markerHeight', 10)
            .attr('markerWidth', 10)
            .attr('markerUnits', 'strokeWidth')
            .attr('orient', 'auto')
            .attr('refX', 20)
            .attr('refY', 0)
            .attr('viewBox', function(d){ return d.viewbox })
            .append('svg:path')
            .attr('d', function(d){ return d.path })
            .attr('fill', '#c42830');

        console.log(marker)

        simulation.nodes(nodes)
        simulation.force('link')
            .links(links)

        simulation.on('tick', (e) => {

            punto.attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                // .call(force.drag);

            texto.attr('x', function(d) { return d.x; })
                .attr('y', function(d) { return d.y; })
                // .call(force.drag);

            linea.attr('x1', function(d) { return d.source.x; })
                .attr('y1', function(d) { return d.source.y; })
                .attr('x2', function(d) { return d.target.x; })
                .attr('y2', function(d) { return d.target.y; })

        })

    }

})
