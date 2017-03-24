
Template.stream.rendered = function () {
  $('.collapsible').collapsible()
}

Template.stream.helpers({
  listSteams: function () {
    return [1, 2, 3]
  }
})
