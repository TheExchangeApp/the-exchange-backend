'use strict'

const Group = use("App/Model/Group")
const Address = use("App/Model/Address")
const Membership = use("App/Model/Membership")
const Meeting = use("App/Model/Meeting")
const MeetingAttendee = use("App/Model/MeetingAttendee")
const User = use("App/Model/User")

class GroupController {
  * add (request, response) {
    let user = request.authUser
    let data = request.only('title', 'description', 'day', 'childcare')
    let address = request.only('street', 'city', 'state', 'zip')

    let newGroup = yield user.myGroups().create(data)
    let newAddress = yield newGroup.address().create(address)

    response.status(201).json({ group: newGroup, address: newAddress })
  }

  * index (request, response) {
    let groupId = request.param('id')
    let group = yield Group.all()

    response.json(group)
  }

  * search (request, response) {
    let data = request.only('title', 'description', 'category', 'day', 'childcare')
    let address = request.only('street', 'city', 'state', 'zip')
    let searchedData = yield Group.query().with('address').where(data).fetch()

    console.log(data)
    response.json({ results: searchedData })
  }

  * detail (request, response) {
    let groupId = request.param('id')
    let group = yield Group.query().with('users').where('id', groupId)
    let address = yield Address.query().where('group_id', groupId)

    response.json({ group: group, address: address })
  }

  * edit (request, response) {
    let user = request.authUser
    let groupId = request.param('id')
    let updateGroup = yield Group.find(groupId)

    if (user.id === updateGroup.organizer_id) {
      updateGroup.fill(request.only('title', 'description', 'day', 'category', 'childcare'))
      yield updateGroup.save()

      response.status(202).json({ success: "Changes Accepted" })
    } else {

      response.status(403).json({error: "Unauthorized User"})
    }
  }

  * delete (request, response) {
    let user = request.authUser
    let groupId = request.param('id')
    let group = yield Group.find(groupId)
    if (user.id === removeGroup.organizer_id) {
      yield group.address().delete()
      yield group.delete()

      response.status(204).json({ success: "Successfully deleted" })
    } else {
      response.status(403).json({error: "Unauthorized User"})
    }
  }

  * join (request, response) {
    let user = request.authUser
    let groupId = request.param('id')
    let group = yield Group.find(groupId)
    let memberId = yield group.memberships().where('user_id', user.id)
    console.log(memberId)

    if (memberId.length) {
      response.status(403).json({error: "Already a member"})
    } else {
      yield group.memberships().create({ user_id: user.id })
      response.json({success: "User added to group"})

    };
  }

  * members (request, response) {
    let groupId = request.param('id')
    let group = yield Group.find(groupId);
    let memberlist = yield Membership.query().with('users').where('group_id', groupId).fetch()
    console.log(memberlist)

    response.json(memberlist)
  }

  * meeting (request, response) {
    let user = request.authUser
    let groupId = request.param('id')
    let group = yield Group.find(groupId)
    let meeting = request.only('curriculum', 'time', groupId)

    if (user.id === group.organizer_id) {
      let newMeeting = yield group.meetings().create(meeting)

      response.status(201).json({ meeting: newMeeting })
    } else {

      response.status(403).json({error: "Unauthorized User"})
    }
  }

  * indexMeeting (request, response) {
    let groupId = request.param('id')
    let group = yield Group.find(groupId)

    if (group) {
        let meetings = yield Meeting.query().where('group_id', groupId)
        response.json(meetings)
    } else {
      response.status(404).json({ error: "No such group" })
    }
  }

}

module.exports = GroupController
