'use strict'

const Lucid = use('Lucid')

class Membership extends Lucid {

  users () {
    return this.belongsTo('App/Model/User')
  }

  groups () {
    return this.belongsTo('App/Model/Group')
  }

  meetingAttendees () {
    return this.hasMany('App/Model/MeetingAttendee')
  }

}

module.exports = Membership
