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
    return this.hasManyThrough('App/Model/Group', 'App/Model/Membership')
  }

  organizers () {
    return this.hasMany('App/Model/User', {
      foreign_key: organizer_id
    });
  }


}

module.exports = User
