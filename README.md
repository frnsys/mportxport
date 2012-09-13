Model & Collection Exporting/Importing
====================
Original by Henrik (http://andyet.net/blog/henrik/)
Updated by Francis Tseng (yadonchow.com / @yadonchow)
Collection Exporting/Importing added by Francis Tseng (yadonchow.com / @yadonchow) 


A set of functions allowing easy exporting and importing of Backbone models and collections.

The main use of this is moving models back-and-forth between the client-side and the backend (when using something like Node.js, for instance).

While you could pass models through URLs such as mysite.com/model.json without using .mport(), it won't preserve collections included within a model. These functions make that possible.



**How to Use**

You must first instantiate a new model or collection to import to.

When importing to a collection, you must specify the prototype as the second parameter (see the collections example below).

**Example with Models**
```javascript
  var model = new myModel({ foo: 'bar' });
  var anExport = model.xport();

  var newModel = new myModel();
  newModel.import( anExport );
  newModel.get('foo');
  // => returns 'bar'
```

**Example with Collections**
```javascript
  var models = [ ... some models ... ];
  var collection = new myCollection( models );
  var exports = collection.xport();

  var newCollection = new myCollection();
  newCollection.mport( exports, myCollection() );
```
