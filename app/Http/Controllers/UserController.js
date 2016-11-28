'use strict'

const Hash = use('Hash')
const User = use("App/Model/User")

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

  * edit (request, response) {
    let user = request.authUser
    let userId = request.param('id')
    let updateUser = yield User.findBy('id', userId)
    updateUser.fill(request.only('img_url', 'password', 'email'))
    yield updateUser.save()

    response.status(202).json({ success: "Changes Accepted" })
  }

  * delete (request, response) {
    let user = request.authUser
    let userId = request.param('id')
    let removeUser = yield User.findBy('id', userId)
    yield removeUser.delete()

    response.status(204).json({ success: "Successfully deleted" })
  }

}

module.exports = UserController
