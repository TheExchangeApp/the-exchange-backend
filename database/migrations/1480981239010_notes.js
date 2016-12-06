'use strict'

const Schema = use('Schema')

class NotesTableSchema extends Schema {

  up () {
    this.create('notes', (table) => {
      table.increments()
      table.timestamps()
      table.string('note')
      table.integer('user_id')
      table.integer('meeting_id')
    })
  }

  down () {
    this.drop('notes')
  }

}

module.exports = NotesTableSchema
