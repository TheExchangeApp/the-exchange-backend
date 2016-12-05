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
    return this.belongsToMany('App/Model/Group', 'App/Model/Membership')
  }

  myGroups () {
    return this.hasMany('App/Model/Group', 'id', 'organizer_id')
  }

  MeetingAttendees () {
    return this.hasMany('App/Model/MeetingAttendee')
  }

}

module.exports = User
