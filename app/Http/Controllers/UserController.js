'use strict'

const Hash = use('Hash')
const User = use("App/Model/User")
const Group = use("App/Model/Group")
const Membership = use("App/Model/Membership")
const Meeting = use("App/Model/Meeting")
const MeetingAttendee = use("App/Model/MeetingAttendee")

class UserController {
  * register (request, response) {
    let data = request.only('name', 'username', 'email', 'password', 'img_url')
    data.password = yield Hash.make(data.password)
    let user = yield User.create(data)

    response.status(201).json(user)
  }

  * login (request, response) {
    let data = request.only ('username', 'password')
    let user = yield User.findBy('username', data.username)

    if (user) {
      let verify = yield Hash.verify(data.password, user.password)
      if (verify) {
        let token = yield request.auth.generate(user)
        user.access_token = token

        response.json(user)
      } else {
        response.status(401).json({error: "No such user or password"})
      }
    } else {
        response.status(401).json({error: "No such user or password"})
      }
  }

  * index (request, response) {
    let userId = request.param('id')
    let user = yield User.all()

    response.json(user)
  }

  * profile (request, response) {
    let userId = request.param('id')
    let userProfile = yield User.findBy('id', userId)

    response.json(userProfile)
  }

  * profileGroup (request, response) {
    let profile = yield User.query()
      .with('meetings', 'groups').where('id', request.authUser.id).fetch()

    response.json(profile)
  }

  * profileMeeting (request, response) {
    let user = request.authUser
    let userId = request.param('id')
    let meetingList = yield MeetingAttendee.query().with('meetings').where('user_id', userId).fetch()
    console.log(meetingList)

    response.json(meetingList)
  }

  * edit (request, response) {
    let userId = request.param('id')
    let updateUser = yield User.findBy('id', userId)
    updateUser.fill(request.only('img_url', 'password', 'email'))
    yield updateUser.save()

    response.status(202).json({ success: "Changes Accepted" })
  }

  * delete (request, response) {
    let userId = request.param('id')
    let removeUser = yield User.findBy('id', userId)
    yield removeUser.delete()

    response.status(204).json({ success: "Successfully deleted" })
  }

}

module.exports = UserController
