Model & Collection Exporting/Importing
====================
Original by Henrik (http://andyet.net/blog/henrik/) 
Updated by Francis Tseng (yadonchow.com / @yadonchow)
Collection Exporting/Importing added by Francis Tseng (yadonchow.com / @yadonchow) 

A set of functions allowing easy exporting and importing of Backbone models and collections.

The main use of this is moving models back-and-forth between the client-side and the backend (when using something like Node.js, for instance).

While you could pass models through URLs such as mysite.com/model.json without using .mport(), it won't preserve collections included within a model. These functions make that possible.

You must first instantiate a new model or collection to import to.

When importing to a collection, you must specify the prototype as the second parameter (see the collections example below).

**Example with Models**
  var model = new myModel({ foo: 'bar' });
  var export = model.xport();

  var newModel = new myModel();
  newModel.import( xportedModel );
  newModel.get('foo');
  // => returns 'bar'

**Example with Collections**
  var models = [ ... some models ... ];
  var collection = new myCollection( models );
  var exports = collection.xport();

  var newCollection = new myCollection();
  newCollection.mport( exports, myCollection() );
