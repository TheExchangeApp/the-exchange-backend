'use strict'

const Lucid = use('Lucid')

class MeetingAttendee extends Lucid {

  memberships () {
    return this.belongsTo('App/Model/Membership')
  }

  meetings () {
    return this.belongsTo('App/Model/Meeting')
  }

}

module.exports = MeetingAttendee
