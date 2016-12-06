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
Route.get('/user', 'UserController.index')
Route.put('/user/:id', 'UserController.edit').middleware('auth')
Route.get('/user/:id', 'UserController.profile').middleware('auth')
Route.get('/user/:id/groups', 'UserController.profileGroup').middleware('auth')
Route.get('/user/:id/meetings', 'UserController.profileMeeting').middleware('auth')
Route.delete('/user/:id', 'UserController.delete').middleware('auth')

Route.post('/group', 'GroupController.add').middleware('auth')
Route.get('/group', 'GroupController.index')
Route.get('/group/search', 'GroupController.search')
Route.get('/group/:id', 'GroupController.detail')
Route.put('/group/:id', 'GroupController.edit').middleware('auth')
Route.delete('group/:id', 'GroupController.delete').middleware('auth')

Route.post('/group/:id/join', 'GroupController.join').middleware('auth')
Route.get('/group/:id/members', 'GroupController.members').middleware('auth')

Route.post('/group/:id/meeting', 'GroupController.meeting').middleware('auth')
Route.get('/group/:id/meeting', 'GroupController.indexMeeting')

Route.get('/meeting/:id', 'MeetingController.detail')
Route.post('/meeting/:id/join', 'MeetingController.join').middleware('auth')
Route.post('/meeting/:id/note', 'MeetingController.note').middleware('auth')
Route.get('/meeting/:id/note', 'MeetingController.index').middleware('auth')

Route.put('meeting/:id/objective', 'MeetingController.postObj').middleware('auth')
Route.get('meeting/:id/objective', 'MeetingController.getObj').middleware('auth')
