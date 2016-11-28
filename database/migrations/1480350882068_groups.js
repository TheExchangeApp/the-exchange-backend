'use strict'

const Schema = use('Schema')

class GroupsTableSchema extends Schema {

  up () {
    this.create('groups', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.string('description')
      table.integer('address_id')
      table.string('day')
      table.string('category')
      table.boolean('childcare')
      table.integer('organizer_id').references('users.id')
    })
  }

  down () {
    this.drop('groups')
  }

}

module.exports = GroupsTableSchema
