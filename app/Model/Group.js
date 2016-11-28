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

  organizers () {
    return this.belongsTo('App/Model/User', {
      foreign_key: organizer_id;
    });
  }

}

module.exports = Group
