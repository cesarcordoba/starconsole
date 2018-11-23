const _ = require('lodash');

module.exports = (documento, modelo, nivel) => {
return new Promise(resolve => {
documento.write(`
@import  '../../../`+ _.repeat('../', nivel) + `defaults.styl'

.autocomplete
    mat-form-field
       background-color white
       @extend .boxshadow

    form, mat-form-field
       height 36px
       width 400px
       padding 0 50px

       .mat-form-field-wrapper
           padding 0px !important
           height 36px
           .mat-form-field-flex
               height 36px
               .mat-form-field-infix
                   padding 0px
                   margin 0px
                   border 0px
                   input
                       height 36px
                   // .mat-form-field-label-wrapper
           .mat-form-field-underline
               bottom 0px


`)
documento.write(``, (algo) => resolve(true))
    })
}
