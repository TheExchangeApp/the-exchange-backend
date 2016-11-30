'use strict'

const Group = use("App/Model/Group")
const Address = use("App/Model/Address")

class GroupController {
  * add (request, response) {
    let user = request.authUser
    let data = request.only('title', 'description', 'day', 'childcare')
    let address = request.only('street', 'city', 'state', 'zip')

    let newGroup = yield user.myGroups().create(data)
    let newAddress = yield newGroup.addresses().create(address)

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
    // if (address == {}) address = undefined
    // console.log('address is: ', address)
    let searchedData = yield Group.query().where(data)

    let searchedAddress = [];
    // let group;
    //
    // for (var i = 0; i < searchedData.length; i++) {
    //   group = yield Group.find(searchedData[i].id);
    //   console.log('group is: ', group.addresses().fetch())
    //   searchedAddress.push(group.addresses().fetch())
    // }
    //
    // console.log(searchedAddress);

    response.json({ group: searchedData, address: searchedAddress })
  }

  * detail (request, response) {
    let groupId = request.param('id')
    let group = yield Group.find(groupId)
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
    // let removeAddress = yield Address.query().where('group_id', groupId)
    // yield removeAddress.delete()
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
    yield group.users().create(user)
  }

}

module.exports = GroupController
