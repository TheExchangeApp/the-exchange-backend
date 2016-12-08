'use strict'

const Schema = use('Schema')

class PrivateTableSchema extends Schema {

  up () {
    this.table('notes', (table) => {
      this.boolean('private')
    })
  }

  down () {
    this.table('notes', (table) => {
      this.boolean('private')
    })
  }

}

module.exports = PrivateTableSchema
