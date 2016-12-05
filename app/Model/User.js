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

  meetings () {
    return this.hasMany('App/Model/Meeting')
  }

}

module.exports = User
