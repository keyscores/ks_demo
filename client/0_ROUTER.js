import { Meteor } from 'meteor/meteor'
// Router.onBeforeAction(function () {
//     if (!Meteor.userId()) {
//       this.redirect('/')
//       this.next()
//     } else {
//       this.next()
//     }
//   }
// )

Router.route('/admin', function () {
  var self = this
  if (this.ready()) {
    self.render('dashboardEditor')
    self.layout('layout')
  }
})

Router.route('/edit_dashboard', function () {
  var self = this
  if (this.ready()) {
    self.render('dashboardEditor')
    self.layout('layout')
  }
})

Router.route('/', function () {
  var self = this
  if (this.ready()) {
    self.render('start')
    // self.layout('layout')
  }
})

Router.route('/stream', function () {
  var self = this
  if (this.ready()) {
    self.render('stream')
    self.layout('layout')
  }
})

Router.route('/aggregate', function () {
  var self = this
  if (this.ready()) {
    self.render('aggregate')
    self.layout('layout')
  }
})

Router.route('/lookup', function () {
  var self = this
  if (this.ready()) {
    self.render('lookup')
    self.layout('layout')
  }
})
