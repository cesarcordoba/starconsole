async function Nube(cache, tipo, ruta){
	return await new Promise(resolve => {
		_.isUndefined(cache.get(tipo)) ?
			axios(ruta).then(response => resolve(cache.put(tipo, response)) )
			:
			resolve(cache.get(tipo))
	})
}

app.service('Servicio', function() {

});

app.service('Constelacion', function() {

    this.crear = constelacion => axios.post('/data/constelacion', constelacion)
    this.obtener = () => axios('/data/constelacion')
    this.one = id => axios('/data/constelacion/' + id)
    this.eliminar = id => axios.delete('/data/constelacion/' + id)
    this.editar = constelacion => axios.put('/data/constelacion/' + constelacion.id, constelacion)
	this.hierarchy = (id) => axios.get('/data/hierarchy/' + id)

	this.xGalaxia = (id) => axios.get('/data/constelacion/xGalaxia/' + id)

});

app.service('Planeta', function() {

    this.crear = planeta => axios.post('/data/planeta', planeta)
    this.obtener = () => axios('/data/planeta')
    this.one = id => axios('/data/planeta/' + id)
    this.eliminar = id => axios.delete('/data/planeta/' + id)
    this.editar = planeta => axios.put('/data/planeta/' + planeta.id, planeta)

	this.todo = () => axios('/data/planetasysusorbitas')

	this.saltoespacial = (gemasdeldestino) => axios.post('/data/saltoespacial', gemasdeldestino)

});

app.service('Orbitas', function() {

    this.crear = orbita => axios.post('/data/orbita', orbita)
    this.obtener = () => axios('/data/orbita')
    this.one = id => axios('/data/orbita/' + id)
    this.eliminar = id => axios.delete('/data/orbita/' + id)
    this.editar = orbita => axios.put('/data/orbita/' + orbita.id, orbita)

});

app.service('Galaxia', function() {

    this.crear = galaxia => axios.post('/data/galaxia', galaxia)
    this.obtener = () => axios('/data/galaxia')
    this.one = id => axios('/data/galaxia/' + id)
    this.eliminar = id => axios.delete('/data/galaxia/' + id)
    this.editar = galaxia => axios.put('/data/galaxia/' + galaxia.id, galaxia)

});

app.service('Meteoro', function() {

    this.crear = meteoro => axios.post('/data/meteoro', meteoro)
    this.obtener = () => axios('/data/meteoro')
    this.one = id => axios('/data/meteoro/' + id)
    this.eliminar = id => axios.delete('/data/meteoro/' + id)
    this.editar = meteoro => axios.put('/data/meteoro/' + meteoro.id, meteoro)

	this.xPlaneta = id => axios('/data/meteoro/xPlaneta/' + id)

});

app.service('Satelite', function() {

    this.crear = satelite => axios.post('/data/satelite', satelite)
    this.obtener = () => axios('/data/satelite')
    this.one = id => axios('/data/satelite/artificiales/' + id)
	this.contar = id => axios('/data/satelite/' + id)
    this.eliminar = id => axios.delete('/data/satelite/' + id)
    this.editar = satelite => axios.put('/data/satelite/' + satelite.id, satelite)
	this.xPlaneta = id => axios('/data/satelite/xPlaneta/' + id)
	this.artificiales = id => axios('/data/satelite/artificiales/' + id)



});
