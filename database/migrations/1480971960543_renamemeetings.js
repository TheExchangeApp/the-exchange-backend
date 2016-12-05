'use strict'

const Schema = use('Schema')

class RenamemeetingsTableSchema extends Schema {

  up () {
    this.rename('meetingAttendees', 'meeting_attendees')
  }

  down () {
    this.rename('meetingAttendees', 'meeting_attendees')
  }

}

module.exports = RenamemeetingsTableSchema
