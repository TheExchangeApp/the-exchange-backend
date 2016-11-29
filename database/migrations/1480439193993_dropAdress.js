'use strict'

const Schema = use('Schema')

class DropAdressTableSchema extends Schema {

  up () {
    this.table('groups', (table) => {
      table.dropColumn('address_id')
    })
  }

  down () {
    this.table('groups', (table) => {
      table.dropColumn('address_id')
    })
  }

}

module.exports = DropAdressTableSchema
