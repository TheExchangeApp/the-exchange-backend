'use strict'

const Lucid = use('Lucid')

class Group extends Lucid {

  addresses () {
    return this.hasMany('App/Model/Address')
  }

  users () {
    return this.hasManyThrough('App/Model/User', 'App/Model/Membership')
  }

  meetings () {
    return this.hasMany('App/Model/Meeting')
  }

  organizer () {
    return this.belongsTo('App/Model/User', 'id', 'organizer_id')
  }

}

module.exports = Group
