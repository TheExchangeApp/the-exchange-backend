'use strict'

const Schema = use('Schema')

class AddresslocatorTableSchema extends Schema {

  up () {
    this.table('addresses', (table) => {
      table.decimal('lat')
      table.decimal('lng')
    })
  }

  down () {
    this.table('addresses')
  }

}

module.exports = AddresslocatorTableSchema
