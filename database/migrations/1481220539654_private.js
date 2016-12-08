'use strict'

const Schema = use('Schema')

class PrivateTableSchema extends Schema {

  up () {
    this.table('notes', (table) => {
      table.boolean('private')
    })
  }

  down () {
    this.table('notes', (table) => {
      table.dropColumn('private')
    })
  }

}

module.exports = PrivateTableSchema
