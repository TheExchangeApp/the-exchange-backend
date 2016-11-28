'use strict'

const Schema = use('Schema')

class MeetingsTableSchema extends Schema {

  up () {
    this.create('meetings', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('meetings')
  }

}

module.exports = MeetingsTableSchema
