'use strict'

const Schema = use('Schema')

class GroupsTableSchema extends Schema {

  up () {
    this.create('groups', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('groups')
  }

}

module.exports = GroupsTableSchema
