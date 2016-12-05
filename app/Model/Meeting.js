'use strict'

const Lucid = use('Lucid')

class Meeting extends Lucid {

  groups () {
    return this.belongsTo('App/Model/Group')
  }

  users () {
    return this.belongsTo('App/Model/User')
  }

  meetingAttendees () {
    return this.hasMany('App/Model/MeetingAttendee')
  }

}

module.exports = Meeting
