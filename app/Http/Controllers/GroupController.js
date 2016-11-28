'use strict'

const Group = use("App/Model/Group")
const Address = use("App/Model/Address")

class GroupController {
  * add (request, response) {
    let user = request.authUser
    let data = request.only('title', 'description', 'day', 'childcare')
    let address = request.only('street', 'city', 'state', 'zip')
    let group = new Group(data)
    let newGroup = yield user.organizers().groups().save(group)
    let newAddress = yield newGroup.addresses().save(address)

    response.status(201).json({ group: newGroup, address: newAddress })
  }

  * index (request, response) {
    let groupId = request.param('id')
    let group = yield Group.all().orderBy('title')

    response.json(group)
  }

  * search (request, response) {
    let data = request.only('title', 'description', 'category', 'day', 'childcare')
    let address = request.only('street', 'city', 'state', 'zip')
    let searchedData = yield Group.query().where(data)
    let searchedAddress = yield Address.query().where(address)

    response.json({ group: searchedData, address: searchedAddress })
  }

  * detail (request, response) {
    let groupId = request.param('id')
    let group = yield Group.find(groupId).with('title', 'description', 'category', 'day', 'childcare')
    let address = yield Address.find(groupId).with('street', 'city', 'state', 'zip')

    response.json({ group: group, address: address })
  }

  * edit (request, response) {
    let groupId = request.param('id')
    let updateGroup = yield Group.findBy('id', groupId)
    updateGroup.fill(request.only('title', 'description', 'day', 'category', 'childcare'))
    yield updateGroup.save()

    response.status(202).json({ success: "Changes Accepted" })
  }

  * delete (request, response) {
    let groupId = request.param('id')
    let removeGroup = yield Group.findBy('id', groupId)
    yield removeGroup.delete()

    response.status(204).json({ success: "Successfully deleted" })
  }

}

module.exports = GroupController
