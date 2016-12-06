'use strict'

const Schema = use('Schema')

class AddnoteagainTableSchema extends Schema {

  up () {
    this.table('meetings', (table) => {
      table.text('note')
    })
  }

  down () {
    this.table('meetings', (table) => {
      table.text('note')
    })
  }

}

module.exports = AddnoteagainTableSchema
