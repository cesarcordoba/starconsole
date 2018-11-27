const _ = require('lodash');


const { planeta } = require('../../ovnis/relaciones.js')

module.exports = (documento, constelacion, nivel) => {
return new Promise(resolve => {


documento.write(`
mat-card.componente
	mat-form-field(class="example-chip-list")
		mat-chip-list(#chipList)
			mat-chip(
				*ngFor="let item of chips",
				[selectable]="selectable",
				[removable]="removable",
				(removed)="remove(item)")
				| {{item.nombre}}
				mat-icon(matChipRemove, *ngIf="removable") cancel
			input(
				placeholder="Relacionar esta division con productos",
				#input,
				[formControl]="fruitCtrl",
				[matAutocomplete]="auto",
				[matChipInputFor]="chipList",
				[matChipInputSeparatorKeyCodes]="separatorKeysCodes",
				[matChipInputAddOnBlur]="addOnBlur",
				)
			mat-autocomplete(#auto="matAutocomplete", (optionSelected)="selected($event)")
				mat-option(*ngFor="let item of filtered | async", [value]="item.nombre")
					| {{item.nombre}}
//- (matChipInputTokenEnd)="add($event)" 
`
)

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
