'use strict'

const Schema = use('Schema')

class AddUserIdTableSchema extends Schema {

  up () {
    this.table('meetingAttendees', (table) => {
      table.integer('user_id')
    })
  }

  down () {
    this.table('meetingAttendees', (table) => {
      table.integer('user_id')
    })
  }

}

module.exports = AddUserIdTableSchema
