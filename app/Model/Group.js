'use strict'

const Lucid = use('Lucid')

class Group extends Lucid {

  addressses () {
    return this.hasMany('App/Model/Address')
  }

  users () {
    return this.hasManyThrough('App/Model/User', 'App/Model/Membership')
  }

  meetings () {
    return this.hasMany('App/Model/Meeting')
  }

}

module.exports = Group
