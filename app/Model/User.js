'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  static get hidden() {
    return ['password']
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  groups () {
    return this.belongsToMany('App/Model/Group', 'memberships')
  }

  myGroups () {
    return this.hasMany('App/Model/Group', 'id', 'organizer_id')
  }

  meetingAttendees () {
    return this.hasMany('App/Model/MeetingAttendee')
  }

  meetings () {
    return this.belongsToMany('App/Model/Meeting', 'meeting_attendees')
  }

  notes () {
    return this.hasMany('App/Model/Note')
  }

}

module.exports = User
