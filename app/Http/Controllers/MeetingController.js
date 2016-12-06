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
    let meeting = yield Group.query().with('meetings').where('id', meetingId).fetch()

    response.json({ meeting: meeting })
  }

  * join (request, response) {
    let user = request.authUser
    let meetingId = request.param('id')
    let mtg = yield Meeting.find(meetingId)
    console.log("hi", mtg)

    yield mtg.meetingAttendees().create({ user_id: user.id })

    response.json({success: "User added to meeting"})
  }

  * post (request, response) {
    let user = request.authUser
    let data = request.only('note')
    yield Note.create(data)

    response.status(202).json({ success: "Note posted" })
  }

  * index (request, response) {
    let meetingId = request.param('id')
    let notes = yield Note.all(meetingId)

    response.json(notes)
  }


}

module.exports = MeetingController
