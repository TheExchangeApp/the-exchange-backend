'use strict'

const Lucid = use('Lucid')

class Address extends Lucid {

  group () {
    return this.belongsTo('App/Model/Group')
  }

}

module.exports = Address
