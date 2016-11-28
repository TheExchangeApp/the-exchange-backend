'use strict'

const Schema = use('Schema')

class MembershipsTableSchema extends Schema {

  up () {
    this.create('memberships', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id')
      table.integer('group_id')
    })
  }

  down () {
    this.drop('memberships')
  }

}

module.exports = MembershipsTableSchema
