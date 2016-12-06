'use strict'

const Schema = use('Schema')

class ChangenoteTableSchema extends Schema {

  up () {
    this.table('meetings', (table) => {
      table.dropColumn('note')
    })
  }

  down () {
    this.table('meetings', (table) => {
    table.dropColumn('note')
  })
  }

}

module.exports = ChangenoteTableSchema
