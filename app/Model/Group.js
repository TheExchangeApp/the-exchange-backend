'use strict'

const Lucid = use('Lucid')

class Group extends Lucid {

  address () {
    return this.hasOne('App/Model/Address')
  }

  memberships () {
    return this.hasMany('App/Model/Membership')
  }

  users () {
    return this.belongsToMany('App/Model/User', 'App/Model/Membership')
  }

  meetings () {
    return this.hasMany('App/Model/Meeting')
  }

  organizer () {
    return this.belongsTo('App/Model/User', 'id', 'organizer_id')
  }

}

module.exports = Group
