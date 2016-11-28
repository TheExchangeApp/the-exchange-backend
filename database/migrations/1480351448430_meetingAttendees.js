'use strict'

const Schema = use('Schema')

class MeetingAttendeesTableSchema extends Schema {

  up () {
    this.create('meetingAttendees', (table) => {
      table.increments()
      table.timestamps()
      table.integer('meeting_id')
      table.integer('membership_id')
    })
  }

  down () {
    this.drop('meetingAttendees')
  }

}

module.exports = MeetingAttendeesTableSchema
