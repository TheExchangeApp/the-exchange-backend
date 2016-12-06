'use strict'

const Lucid = use('Lucid')

class Note extends Lucid {

  users () {
    return this.belongsTo('App/Model/User')
  }

  meetings () {
    return this.belongsTo('App/Model/Meeting')
  }

}

module.exports = Note
