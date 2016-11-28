'use strict'

const Lucid = use('Lucid')

class Token extends Lucid {

  users () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = Token
