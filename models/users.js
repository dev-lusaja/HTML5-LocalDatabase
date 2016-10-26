var user_model = {
		name: 'users',
		fields: [
			{
				primary_key: true,
				field_name: 'id',
				field_type: 'integer',
				not_null: true
			},
			{
				primary_key: false,
				field_name: 'name',
				field_type: 'text',
				not_null: true
			},
			{
				primary_key: false,
				field_name: 'email',
				field_type: 'text',
				not_null: false
			},
			{
				primary_key: false,
				field_name: 'age',
				field_type: 'integer',
				not_null: true
			}
		]
};