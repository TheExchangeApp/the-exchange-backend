'use strict'

const Schema = use('Schema')

class RemoveAddressTableSchema extends Schema {

  up () {
    this.table('groups', (table) => {
      table.dropColumn('address_id')
    })
  }

  up () {
    this.table('addresses', (table) => {
      table.integer('group_id')
    })
  }

}

module.exports = RemoveAddressTableSchema
