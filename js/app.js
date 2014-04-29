App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.FixtureAdapter.extend({

});

App.Table = DS.Model.extend({
  name: DS.attr('string'),
  total: DS.attr('float')
});

App.Food = DS.Model.extend({
  name: DS.attr('string'),
  price: DS.attr('float'),
  table_id: DS.attr('integer')
});

//ROUTER----------------------------------------
App.Router.map(function() {
  this.resource("index", { path: '/' });
});

//ROUTES----------------------------------------
App.IndexRoute = Ember.Route.extend({
  model: function() {
     return this.store.find('table');
  },
   setupController: function(controller, model) {
    this._super(controller, model);
    this.store.find('food').then(function(foods) {
      controller.set('modelfoods', foods)
    });
  }

});

App.TablesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('table');
  }
});

App.FoodsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('food');
  }
});

//CONTROLLERS----------------------------------------



//FIXTURES----------------------------------------



