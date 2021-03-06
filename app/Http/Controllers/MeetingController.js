'use strict'

const Group = use("App/Model/Group")
const Address = use("App/Model/Address")
const Membership = use("App/Model/Membership")
const Meeting = use("App/Model/Meeting")
const MeetingAttendee = use("App/Model/MeetingAttendee")
const User = use("App/Model/User")
const Note = use("App/Model/Note")

class MeetingController {
  * detail (request, response) {
    let meetingId = request.param('id')
    let mtg = yield Meeting.query()
      .with('users', 'notes', 'notes.users', 'group')
      .where('id', meetingId).fetch()

    response.json(mtg)
  }

  * join (request, response) {
    let user = request.authUser
    let meetingId = request.param('id')
    let mtg = yield Meeting.findOrFail(meetingId)

    let alreadyAttending = {
      user_id: user.id,
      meeting_id: meetingId
    }
    console.log(alreadyAttending)

    let attending = yield MeetingAttendee.query()
      .where(alreadyAttending).fetch()

    if (attending.value().length > 0) {
      response.status(400).json({error: "User already in meeting"})
    } else {
      yield mtg.meetingAttendees().create({ user_id: user.id })
      response.status(202).json({success: "User added to meeting"})
    }
  }

  * deleteMtg (request, response) {
    let user = request.authUser
    let meetingId = request.param('id')
    let mtg = yield Meeting.find(meetingId)
    if (user.id === mtg.group.organizer_id) {
      yield mtg.delete()

      response.status(204).json({success: "Successfully deleted"})
    } else {
      response.status(403).json({error: "Unauthorized User"})
    }
  }

  * note (request, response) {
    let user = request.authUser
    let meetingId = request.param('id')
    let meeting = yield Meeting.find(meetingId)

    let data = request.only('note', 'private', 'user_id')
    let newNote = yield meeting.notes().create(data)

    response.json(newNote)
  }

  * deleteNote (request, response) {
    let user = request.authUser
    let meetingId = request.param('id')
    let note = yield Note.query().with('meetings').where('id', meetingId).fetch()
    if (user.id === mtg.organizer_id) {
      yield note.delete()

      response.status(204).json({ success: "Successfully deleted" })
    } else {
      response.status(403).json({error: "Unauthorized User"})
    }
  }

  * index (request, response) {
    let meetingId = request.param('id')
    let notes = yield Note.all(meetingId)

    response.json(notes)
  }

  * postObj (request, response) {
    let user = request.authUser
    let meetingId = request.param('id')
    let mtg = yield Meeting.find(meetingId)

    mtg.fill(request.only('objective', 'question', 'note'))
    yield mtg.save()
    response.status(202).json(mtg)
  }

  * getObj (request, response) {
    let meetingId = request.param('id')
    let mtg = yield Meeting.find(meetingId)

    response.json(mtg)
  }
}

module.exports = MeetingController
