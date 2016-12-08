'use strict'

const Lucid = use('Lucid')

class Meeting extends Lucid {

  group () {
    return this.belongsTo('App/Model/Group')
  }

  users () {
    // implies a user_id (FK) on meetings
    // return this.belongsTo('App/Model/User')
    return this.belongsToMany('App/Model/User', 'meeting_attendees')
  }

  meetingAttendees () {
    return this.hasMany('App/Model/MeetingAttendee')
  }

  notes () {
    return this.hasMany('App/Model/Note')
  }

}

module.exports = Meeting
