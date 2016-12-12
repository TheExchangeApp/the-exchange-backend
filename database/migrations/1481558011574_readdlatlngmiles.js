'use strict'

const Schema = use('Schema')

class ReaddlatlngmilesTableSchema extends Schema {

  up () {
    this.table('addresses', (table) => {
      table.decimal('lat', 11, 8)
      table.decimal('lng', 11, 8)
      table.integer('miles')
    })
  }

  down () {
    this.table('addresses')
  }

}

module.exports = ReaddlatlngmilesTableSchema
