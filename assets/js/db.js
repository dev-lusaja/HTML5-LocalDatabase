(function() {
	self.Database = function(db_name, db_maxSize) {
		self = this;

		// Config parameters
		self.db_name = db_name || 'localDb',
		self.db_maxSize = db_maxSize || 100000,
		self.opendb_version = '1.0',

		// Messages
		self.db_displayName = 'Local Database.',
		self.db_notSupported = 'Databases are not supported in this browser.',
		self.db_invalidVersion = 'Invalid database version.',

		// Connection
		self.connection = null,

		// Methods
		self.connect = function() {
			try {
				if (!window.openDatabase) {
					alert(self.db_notSupported);
				} else {
					self.connection = openDatabase(self.db_name, self.opendb_version, self.db_displayName, self.db_maxSize);
					console.log('Connection stablished');
				}
			} catch(e) {
				if (e == 2) {
			        console.log(self.db_invalidVersion);
			    } else {
			        console.log('Unknown error: ' + e);
			    }
			    return;
			}
		},

		self.dataResultHandler = function (transaction, result) {
			console.log(result);
		},

		self.dataErrorHandler = function (transaction, error) {
			console.log(error);
		},

		self.createTable = function(table_schema) {
			try {
				self.connection.transaction(
					function(transaction) {
						var sql = 'CREATE TABLE IF NOT EXISTS ' + table_schema.name + ' (';
						var len = table_schema.fields.length;
						for (var i = 0; i < len; i++) {
							sql = sql + ' ' + table_schema.fields[i].field_name.toUpperCase();
							sql = sql + ' ' + table_schema.fields[i].field_type.toUpperCase();

							if (table_schema.fields[i].not_null) {
								sql = sql + ' NOT NULL';
							} else {
								sql = sql + ' NULL';
							}

							if (table_schema.fields[i].primary_key) {
								sql = sql + ' PRIMARY KEY';
							}

							if (i + 1 < len) {
								sql = sql + ', '
							}
						}
						sql = sql + ');';

						transaction.executeSql(sql, [], self.dataResultHandler, self.dataErrorHandler);
						console.log('Table created');		
					}
				)
			} catch(e) {
				console.log('create table error: ' + e);
				return;
			}
		},

		self.insert = function(data) {
			try {
				self.connection.transaction(
				    function (transaction) {
						var len = data.values.length;
						for (var i = 0; i < len; i++) {
							keys = Object.keys(data.values[i]);
							var sql = 'INSERT INTO ' + data.table;
							sql = sql + ' (' + keys.join() + ') VALUES ( ';

							var datalen = keys.length;
							var values_to_insert = [];
							for (var j = 0; j < datalen; j++) {
								sql = sql + '?';

								if (j + 1 < datalen) {
									sql = sql + ', '
								}

								key = keys[j];
								values_to_insert.push(data.values[i][key]);
							}
							sql = sql + ' );';
							transaction.executeSql(sql, values_to_insert, self.dataResultHandler, self.dataErrorHandler);
							console.log('register inserted');
						}
				    }
				);
			} catch(e){
				console.log('insert error: ' + e);
				return;
			}
		},

		self.selectAll = function(table) {
			try {
				self.connection.transaction(
				    function (transaction) {
				        transaction.executeSql('SELECT * FROM ' + table + ';', [], self.dataResultHandler, self.dataErrorHandler);
				    }
				);
			} catch(e) {
				console.log('selectAll error: ' + e);
				return;
			}
		},

		self.select = function(table) {
			try {
				self.connection.transaction(
				    function (transaction) {
				    	var fields = table.fields.join();
				    	var sql = 'SELECT ' + fields + ' FROM ' + table.name;
				    	var key_filters = Object.keys(table.filters);
				    	var filters = [];

				    	if (key_filters) {
				    		sql = sql + ' WHERE ';
				    		var len = key_filters.length;
					    	for (var i = 0; i < len; i++) {
					    		if (i != 0 && i < len) {
					    			sql = sql + ' AND ';
					    		}
					    		var key = key_filters[i];
					    		sql = sql + key + ' = ' + '"' + table.filters[key] + '"';
					    	}
				    	}
				    	sql = sql + ';';
				        transaction.executeSql(sql, [], self.dataResultHandler, self.dataErrorHandler);
				    }
				);
			} catch(e) {
				console.log('select error: ' + e);
				return;
			}
		},

		self.update = function(table) {
			try {
				self.connection.transaction(
					function(transaction) {
						var key_sets = Object.keys(table.sets);
						var key_filters = Object.keys(table.filters);
						var len = key_sets.length;
						var sql = 'UPDATE ' + table.name + ' SET ';
						var update_values = [];

						for (var i = 0; i < len; i++) {
							var key = key_sets[i]
							sql = sql + key + ' = ?';
							update_values.push(table.sets[key]);
						}
						if (key_filters) {
							sql = sql + ' WHERE ';
							var key_len = key_filters.length;
							for (var i = 0; i < key_len; i++) {
								var key = key_filters[i];
								sql = sql + key + ' = "' + table.filters[key] + '"';
								if (i + 1 < key_len) {
									sql = sql + ' AND ';
								}
							}
						}
				    	sql = sql + ';';
				        transaction.executeSql(sql, update_values, self.dataResultHandler, self.dataErrorHandler);
					}
				);
			} catch(e) {
				console.log('select error: ' + e);
				return;
			}
		}
	}

})();