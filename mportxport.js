	// =============================================
	// Model & Collection Exporting/Importing
	// Original by Henrik (http://andyet.net/blog/henrik/) 
	// Updated by Francis Tseng (yadonchow.com / @yadonchow)
  // Collection Exporting/Importing added by Francis Tseng (yadonchow.com / @yadonchow) 
	// =============================================
    
    Backbone.Model.prototype.xport = function(opt) {
      var process, result, settings;
      result = {};
      settings = _({
        recurse: true
      }).extend(opt || {});
      process = function(targetObj, source) {
        targetObj.id = source.id || null;
        targetObj.cid = source.cid || null;
        targetObj.attrs = source;
        return _.each(source, function(value, key) {
          if (settings.recurse) {
            if (key !== 'collection' && source[key] instanceof Backbone.Collection) {
              targetObj.collections = targetObj.collections || {};
              targetObj.collections[key] = {};
              targetObj.collections[key].models = [] || null;
              targetObj.collections[key].id = source[key].id || null;
              return _.each(source[key].models, function(mod, index) {
                return process(targetObj.collections[key].models[index] = {}, mod);
              });
            } else if (source[key] instanceof Backbone.Model) {
              targetObj.models = targetObj.models || {};
              return process(targetObj.models[key] = {}, value);
            }
          }
        });
      };
      process(result, this);
      return result;
    };


    Backbone.Model.prototype.mport = function(data, silent) {
    	var process;
    	process = function(targetObj, data) {
    		// targetObj is the new instance of the model
    		// data is the imported JSON object of the server-side instance of that model
    		targetObj.id = data.id || null;

    		// Load imported instance's attributes into this new instance
    		targetObj.set( data.attrs, { silent: silent } );

    		// If the imported instance contains collections
    		if ( data.collections ) {
    			// Iterate over each collection
    			_.each( data.collections, function(collection, name) {
            targetObj[name].length = 0;
            targetObj[name].models.length = 0;
    				targetObj[name].id = collection.id || null;
    				// Iterate over each model in the collection
    				return _.each( collection.models, function(modelData, index) {
    					// Add a new model to the collection
    					/* Note: as long as a model is explicitly defined in the collection,
								 passing an empty set of params for .add() will create an 
								 and instance of that model */
    					var newObj = targetObj[name].add( {}, { silent: silent } );	
    					return process(newObj.models[index], modelData);
    				});
    			});
    		}
    		if ($.type(data.models) !== "undefined") {
          return _.each(data.models, function(modelData, name) {
            return process(targetObj[name], modelData);
          });
        }
    	}
    	if ($.type(data) == "string") {
        process(this, JSON.parse(data));
      } else {
        process(this, data);
      }
      return this;
    };

    Backbone.Collection.prototype.xport = function() {
      var collection = [];
      _.each( this.models, function(model) {
        collection.push( model.xport() );
      });
      return collection;
    }

    Backbone.Collection.prototype.mport = function(collection, modelPrototype, silent) {
      var silent = silent || null;
      var targetCollection = this;
      _.each( collection, function(model) {
        var newModel = new modelPrototype();
        newModel.mport( model, silent );
        targetCollection.add( newModel );
      });
      return targetCollection;
    }