'use strict'

const Schema = use('Schema')

class DroplatlngTableSchema extends Schema {

  up () {
    this.table('addresses', (table) => {
      table.dropColumn('lat')
      table.dropColumn('lng')
    })
  }

  down () {
    this.table('addresses')
  }

}

module.exports = DroplatlngTableSchema
