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

}

module.exports = User
