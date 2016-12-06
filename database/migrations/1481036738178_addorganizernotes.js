'use strict'

const Schema = use('Schema')

class AddorganizernotesTableSchema extends Schema {

  up () {
    this.table('meetings', (table) => {
      table.text('objective')
      table.text('question')
      table.text('note')
    })
  }

  down () {
    this.table('meetings')
  }

}

module.exports = AddorganizernotesTableSchema
