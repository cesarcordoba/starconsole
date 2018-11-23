const _ = require('lodash');

module.exports = (documento, modelo, nivel) => {
return new Promise(resolve => {
documento.write(`
@import  '../../../`+ _.repeat('../', nivel) + `defaults.styl'`)
documento.write(`

.boxshadow
	box-shadow 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12)

.detalles
	p
		margin 0px

.slider
	height 300px
	display flex
	align-items center
ngx-slick
	width 100%
.slick-slider
	.slick-arrow
		height 100px !important
		width 50px !important
		z-index 1
		background-color white !important
		@extends .boxshadow
		&:hover
			background-color azul
			color white
		&:before
			color azul
		&.slick-prev
			left 25px
			@media mobile
				left -25px
			&:before
				font-family "Material Icons"
				content "keyboard_arrow_left"
				color black
		&.slick-next
			right 25px
			@media mobile
				right -25px
			&:before
				font-family "Material Icons"
				content "keyboard_arrow_right"
				color black
`)
documento.write(``, (algo) => resolve(true))
	})
}
