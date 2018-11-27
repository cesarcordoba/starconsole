const _ = require('lodash');
const { planeta, meteoro, orbita } = require('../../ovnis/relaciones.js')
module.exports = (documento, componente, nivel) => {
return new Promise(resolve => {
documento.write(`
import { Component, ViewChild, Input, OnInit, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
`)


Promise.all([
    componente.getPlaneta({include: [{model: planeta, as: 'SubPlanetas'}]}),
    // componente.getSubConstelaciones()
]).then(response => {

    let planeta = response[0]


if(planeta){
documento.write(`
import { `+ _.capitalize(planeta.singular) + `Service } from '../../`+ _.repeat('../', nivel) + `servicios';`
)
}


planeta.SubPlanetas.forEach(subPlaneta => {
	if(subPlaneta.orbitas.tipo ==4){
documento.write(`
import { `+ _.capitalize(subPlaneta.singular) + `Service } from '../../`+ _.repeat('../', nivel) + `servicios';`)	
	}


})



documento.write(`
@Component({
  selector: '` + componente.nombre + `',
  templateUrl: './` + componente.nombre + `.component.pug',
  styleUrls: ['./` + componente.nombre + `.component.styl']
})
export class `+ _.capitalize(componente.nombre) + `Component implements OnInit {

    borde = ` +  _.isEqual( componente.status, 1 )  + ` ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

	@Input() chips: any[] = [];
	@Input() id: number;
	visible = true;
	selectable = true;
	removable = true;
	addOnBlur = true;
	separatorKeysCodes: number[] = [ENTER, COMMA];

	fruitCtrl = new FormControl();
	filtered: Observable<string[]>;



	allTags: any[] = [];

	@ViewChild('input') input: ElementRef<HTMLInputElement>;
	@ViewChild('auto') matAutocomplete: MatAutocomplete;

`)
planeta.SubPlanetas.forEach(subPlaneta => {
	if(subPlaneta.orbitas.tipo ==4){
	documento.write(`
	constructor() {
		this.filtered = this.fruitCtrl.valueChanges.pipe(
			startWith(null),
			map((nombre: string | null) => nombre ? this._filter(nombre) : this.allTags.slice()));        
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.allTags.filter(fruit => fruit.nombre.toLowerCase().indexOf(filterValue) === 0);
	}



	// add(event: MatChipInputEvent): void {
	// 	// Add fruit only when MatAutocomplete is not open
	// 	// To make sure this does not conflict with OptionSelected Event
	// 	if (!this.matAutocomplete.isOpen) {
	// 		const input = event.input;
	// 		const value = event.value;

	// 		// Add our fruit
	// 		if ((value || '').trim()) {
	// 			this.chips.push(value.trim());
	// 		}

	// 		// Reset the input value
	// 		if (input) {
	// 			input.value = '';
	// 		}

	// 		this.fruitCtrl.setValue(null);
	// 	}
	// }

	remove(item): void {
		const index = this.chips.indexOf(item);

		if (index >= 0) {
			`+ _.capitalize(subPlaneta.singular) + `Service.desligar`+ planeta.singular + `(this.id, item.id).then(algo => {
				this.chips.splice(index, 1);
			})
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		let item_ = this.chips.find(item => item.nombre == event.option.value)

		if (!item_) {
			let item = this.allTags.find(item => item.nombre == event.option.value)
			`+ _.capitalize(subPlaneta.singular) + `Service.ligar`+ planeta.singular + `(this.id, item.id).then(ligado => {
				this.chips.push(item);
				this.input.nativeElement.value = '';
				this.fruitCtrl.setValue(null);
			})
				;
		} else {
			this.input.nativeElement.value = '';
			this.fruitCtrl.setValue(null);
		}
	}   
	
    ngOnInit() {
        console.log(this.chips)
        `+ _.capitalize(planeta.singular) + `Service.obtener().then(productos => this.allTags = productos).then(algo => console.log(this.allTags))
    }
}	
`)
	}


})




documento.write(`
  

`, (algo) => resolve(true))
    })
})
}
