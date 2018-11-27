const _ = require('lodash');


const { planeta } = require('../../ovnis/relaciones.js')

module.exports = (documento, constelacion, nivel) => {
return new Promise(resolve => {
constelacion.getPlaneta()
.then(planeta => {


documento.write(`
mat-card.componente
	.inputs(*ngIf="`+planeta.plural+`.length<=0")
		dropify([(ngModel)]="file")
		button(mat-icon-button, (click)="guardar()", *ngIf="carga==false")
			mat-icon save
		mat-spinner(*ngIf="carga==true")
	.imagen(*ngIf="`+planeta.plural+`.length>0")
		.portada(*ngFor="let item of `+planeta.plural+`")
			.imagen(*ngIf="item.tamano === '400x400'")
				img( [src]="item.url")
		button(mat-icon-button, color="warn", (click)="borrar()")
			mat-icon delete
		mat-spinner(*ngIf="carga==true")

`
)
})





constelacion.getSubConstelaciones()
.then(constelaciones => {

    constelaciones.forEach(constelacion => {
documento.write(`
    `+ constelacion.nombre)
    })
})
.then(() => resolve(true))

    })
}
