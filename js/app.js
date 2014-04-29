App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true
});

App.ApplicationAdapter = DS.FixtureAdapter.extend({

});

App.Table = DS.Model.extend({
  name: DS.attr('string'),
  total: DS.attr('float'),
  foods: DS.hasMany('food')
});

App.Food = DS.Model.extend({
  name: DS.attr('string'),
  price: DS.attr('float'),
  table_id: DS.attr('integer'),
  tables: DS.belongsTo('table')
});

//ROUTER----------------------------------------
App.Router.map(function() {
  this.resource('tables', function() {
    this.resource('table', { path: ':table_id' }, function() {
      this.resource('food');
    });
  });
});

//ROUTES----------------------------------------
App.TablesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('table');
  }
});

App.TableRoute = Ember.Route.extend({
  model: function(params) {
    return tables.findBy('id', params.table_id);
  }
});

App.FoodRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('food');
  }
});


//CONTROLLERS----------------------------------------

App.TablesController = Ember.ArrayController.extend({
  actions: {
    createTable: function() {
      var name = this.get('newName');
      var table = this.store.createRecord('table', {
        name: name
      });
      this.set('newName', '');

      table.save();
    }
  }
});

//FIXTURES----------------------------------------



