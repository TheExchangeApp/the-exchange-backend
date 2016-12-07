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
    let mtg = yield Notes.find(meetingId)

    response.json({ meeting: mtg })
  }

  * join (request, response) {
    let user = request.authUser
    let meetingId = request.param('id')
    let mtg = yield Meeting.find(meetingId)
    console.log("hi", mtg)

    yield mtg.meetingAttendees().create({ user_id: user.id })

    response.json({success: "User added to meeting"})
  }

  * note (request, response) {
    let user = request.authUser
    let data = request.only('note')
    let newNote = yield Note.create(data)

    response.status.json(newNote)
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

    // if (user.id === mtg.organizer_id) {
      mtg.fill(request.only('objective', 'question', 'note'))
      yield mtg.save()
      response.status(202).json(mtg)
    // } else {
    //
    //   response.status(403).json({error: "Unauthorized User"})
    // }
  }

  * getObj (request, response) {
    let meetingId = request.param('id')
    let mtg = yield Meeting.find(meetingId)

    response.json(mtg)
  }

}

module.exports = MeetingController
