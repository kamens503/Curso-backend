class User {
	constructor({ name, isAdmin, id }) {
		this._id = id;
		this._name = name;
		this._can = {
			read: {
				product: true,
				cart: true,
			},
			update: {
				product: isAdmin ? true : false,
				cart: true,
			},
			create: {
				product: isAdmin ? true : false,
				cart: true,
			},
			delete: {
				product: isAdmin ? true : false,
				cart: true,
			},
		};
	}
	can = (operation, type) => this._can[operation][type];
	getId = () => this._id;
	getName = () => this._name;
}

module.exports = User;
