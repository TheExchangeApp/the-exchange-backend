'use strict'

const Schema = use('Schema')

class MeetingsTableSchema extends Schema {

  up () {
    this.create('meetings', (table) => {
      table.increments()
      table.timestamps()
      table.integer('group_id')
      table.string('curriculum')
      table.dateTime('time')
    })
  }

  down () {
    this.drop('meetings')
  }

}

module.exports = MeetingsTableSchema
