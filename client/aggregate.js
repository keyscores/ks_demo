
Template.aggregate.rendered = function () {
  $('.collapsible').collapsible()
}

Template.aggregate.helpers({
  listPipeline: function () {
    return [1, 2, 3]
  },
  listPipelineSteps: function () {
    return [1, 2, 3]
  }
})
