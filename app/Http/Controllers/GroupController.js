'use strict'

const Group = use("App/Model/Group")
const Address = use("App/Model/Address")

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
    let group = yield Group.find(groupId).with('users')
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
    yield group.memberships().create({ user_id: user.id })

    response.json({success: "User added to group"})
  }

}

module.exports = GroupController
