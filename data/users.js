var user_data = {
		table: 'users',
		values: [
			{
				id: 1,
				name: 'Oscar',
				email: 'janoone52@gmail.com',
				age: 26
			},
			{
				id: 2,
				name: 'Luis',
				email: 'janoone52@gmail.com',
				age: 26
			},
			{
				id: 3,
				name: 'Luna',
				email: 'janoone52@gmail.com',
				age: 26
			},
			{
				id: 4,
				name: 'Kalel',
				email: 'janoone52@gmail.com',
				age: 26
			},
			{
				id: 5,
				name: 'Nico',
				email: 'janoone52@gmail.com',
				age: 26
			},
			{
				id: 6,
				name: 'lalal',
				email: 'janoone52@gmail.com',
				age: 26
			},
		]
};

var user_select = {
	name: 'users',
	fields: ['id', 'name', 'email', 'age'],
	filters: {id: 6, name: 'lalal'}
}

var user_update = {
	name: 'users',
	sets: {name: 'timoteo'},
	filters: {id: 6, name: 'name'}
}