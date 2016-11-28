'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.post('/user', 'UserController.register')
Route.post('/login', 'UserController.login')
Route.get('/auth_test', 'UserController.auth_test').middleware('auth')
Route.put('user/:id', 'UserController.edit')
Route.delete('user/:id', 'UserController.delete')

Route.post('/group', 'GroupController.add')
Route.get('/group/search', 'GroupController.search')
Route.get('/group', 'GroupController.index')
Route.get('/group/:id', 'GroupController.detail')
Route.put('/group/:id', 'GroupController.edit')
Route.delete('group/:id', 'GroupController.delete')
