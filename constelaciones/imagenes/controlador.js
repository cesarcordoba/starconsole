const _ = require('lodash');
const { planeta, meteoro } = require('../../ovnis/relaciones.js')

module.exports = (documento, componente, nivel) => {
return new Promise(resolve => {
documento.write(`
import { Component, OnInit, Input} from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmDelDialogComponent } from '../../fragments/confirm-del-dialog/confirm-del-dialog.component';
`)
console.log(componente)

Promise.all([
    componente.getPlaneta({include: [{model: planeta, as: 'SubPlanetas'}]}),
    // componente.getSubConstelaciones() 
]).then(response => {

    let planeta = response[0]
    console.log('Las el planeta es!!: ', planeta.SubPlanetas)



if(planeta){
documento.write(`
import {AWSService,`+ _.capitalize(planeta.singular) + `Service, `+_.capitalize(planeta.SubPlanetas[0].singular)+`Service } from '../../`+ _.repeat('../', nivel) + `servicios';`)
}

documento.write(`

interface Files {
	tamano: number
	archivo: File
}
@Component({
  selector: '` + componente.nombre + `',
  templateUrl: './` + componente.nombre + `.component.pug',
  styleUrls: ['./` + componente.nombre + `.component.styl'],
providers: [AWSService, Ng2ImgMaxService]
})
export class `+ _.capitalize(componente.nombre) + `Component implements OnInit {

    borde = ` +  _.isEqual( componente.status, 1 )  + ` ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    @Input() id: number;
`)


if(planeta)
documento.write(`

    @Input() ` + planeta.plural + `: any[] = [];
    file: File
	files: Files[] = [];

	carga = false;
`)

documento.write(`
    constructor(
		private _aws: AWSService,
		private _n2m: Ng2ImgMaxService,
		public snack: MatSnackBar,
		public _dialog: MatDialog
    ) {}
`)

documento.write(`
    guardar() {
        for (let i = 0; i <= 4; i++) {
            switch (i) {
                case 0:
                    this.rezise(i, 400);
                    break;
                case 1:
                    this.rezise(i, 200);
                    break;
                case 2:
                    this.rezise(i, 100);
                    break
                case 3:
                    this.rezise(i, 50);
                    break
            }
        }
    }

    private rezise(index, width) {
        this._n2m.resizeImage(this.file, width, width).subscribe(result => {
            this.files.push({
                tamano: width,
                archivo: new File([result], index + '-' + result.name)
            })
            if (this.files.length == 4) {
                this.subir();
            }
        }, error => {
            console.log('😢 Oh no!', error)
        })
    }
	private subir() {
		this.files.forEach(file => {
			this._aws.subirArchivo(file.archivo, 'bull-imagenes', 'tryadd-portadas/').subscribe(archivo => {
				if (archivo == true) {
					this.carga = true;
				} else {
					if (archivo == false) {
						this.carga = false;
						this.snack.open('Error al subir algunos de los archivos', '', {
							duration: 2000,
						});
					}
					else {
						`+ _.capitalize(planeta.singular) + `Service.crear({
							url: archivo[0],
							key: archivo[1],
							tamano: file.tamano.toString() + 'x' + file.tamano.toString()
						})
						.then(portadota => `+_.capitalize(planeta.SubPlanetas[0].singular)+`Service.ligar`+planeta.singular+`(this.id, portadota.id)
						.then(portada => this.`+planeta.plural+`.push(portadota)))
						.then(algomas => this.carga = false)
					}
				}
			})
		})
	}    

    ngOnInit() {
        this.`+planeta.plural+` ? null : this.`+planeta.plural+` = [];
    }

	borrar() {
		this._dialog.open(ConfirmDelDialogComponent, {
			disableClose: true,
		}).afterClosed().subscribe(result => {
			if (result) {
				this.empezandoBorrado()
			}
		});
    }
    
	private empezandoBorrado() {
		this.`+planeta.plural+`.forEach((portada, index) => {
			this._aws.borrarArchivo(portada.key, 'bull-imagenes', 'tryadd-portadas/').subscribe(eliminado => {
				this.carga = true;
				if (eliminado && index == 3) {
					this.carga = false;
					this.`+planeta.plural+` = [];
				}

				if (eliminado == true) {
					`+ _.capitalize(planeta.singular) + `Service.eliminar(portada.id)
				} else {
					this.carga == false
					this.snack.open('Error al eliminar algunos de los archivos', '', {
						duration: 2000,
					});
				}
			})
		})
	}    
}`, (algo) => resolve(true))
    })
})
}
