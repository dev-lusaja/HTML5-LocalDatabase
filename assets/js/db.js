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
					console.log(self.connection);
				}
			} catch(e) {
				if (e == 2) {
			        console.log(self.db_invalidVersion);
			    } else {
			        console.log("Unknown error: " + e);
			    }
			    return;
			}
		},

		self.createTable = function(table_schema) {
			self.connection.transaction(
				function(transaction) {
					var sql = 'CREATE TABLE IF NOT EXISTS ' + table_schema.table_name + ' (';
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
					console.log(sql);
					transaction.executeSql(sql, [], null, null);
				}
			)
		}

	}
})();