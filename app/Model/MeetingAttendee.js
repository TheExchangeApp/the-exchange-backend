'use strict'

const Lucid = use('Lucid')

class MeetingAttendee extends Lucid {

  memberships () {
    return this.belongsTo('App/Model/Membership')
  }

  meetings () {
    return this.belongsTo('App/Model/Meeting')
  }

  users () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = MeetingAttendee
