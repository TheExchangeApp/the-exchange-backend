'use strict'

const Group = use("App/Model/Group")
const Address = use("App/Model/Address")
const Membership = use("App/Model/Membership")
const Meeting = use("App/Model/Meeting")
const MeetingAttendee = use("App/Model/MeetingAttendee")
const User = use("App/Model/User")
const Database = use("Database")

class GroupController {
  * add (request, response) {
    let user = request.authUser
    let data = request.only('title', 'description', 'category', 'day', 'childcare')
    let address = request.only('street', 'city', 'state', 'zip','lat','lng')

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
    let address = request.only('street', 'city', 'state', 'zip', 'lat', 'lng')
    let searchedData = yield Group.query().with('address').where(data).fetch()

    console.log(data)
    response.json({ results: searchedData })
  }

  * nearby (request, response) {
    let user = request.authUser
    let start = request.only('lat', 'lng', 'miles')
    let distanceQuery = `point(${start.lng}, ${start.lat}) <@> point(lng, lat)::point`

    let nearbyQuery = yield Database.raw(`SELECT *, ${distanceQuery} AS userDistance FROM addresses
    WHERE ${distanceQuery} < 10 ORDER BY userDistance`);
    console.log(nearbyQuery);

    let nearbyGroups = yield Group.query().with('address').whereIn('id', nearbyQuery.rows.map(loc => loc.group_id)).fetch()
    response.status(200).json(nearbyGroups)
  }

  * detail (request, response) {
    let groupId = request.param('id')
    let group = yield Group.query().with('users', 'meetings', 'address').where('id', groupId).fetch()

    response.json({ group: group })
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
    if (user.id === group.organizer_id) {
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
    let grp = yield Group.findOrFail(groupId)

    let alreadyMember = {
      user_id: user.id,
      group_id: groupId
    }
    let attending = yield Membership.query()
      .where(alreadyMember).fetch()

    if (attending.value().length > 0) {
      response.status(400).json({error: "User already in group"})
    } else {
      yield grp.memberships().create({ user_id: user.id })
      response.status(202).json({success: "User added to group"})
    }

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
    let meeting = request.only('curriculum', 'time', 'group_id')

    console.log("meeting obj: ", meeting);

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

  * joinMeeting (request, response) {
    let user = request.authUser
    let groupId = request.param('id')
    let group = yield Group.find(groupId)
    yield group.memberships().create({ user_id: user.id })

    response.json({success: "User added to meeting"})
  }

}

module.exports = GroupController
