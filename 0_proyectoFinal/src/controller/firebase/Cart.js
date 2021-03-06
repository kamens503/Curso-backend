const admin = require('firebase-admin'),
	test_key = require('./firebase_key.json'),
	{ v4: uuidv1 } = require('uuid');

class Cart {
	constructor(id = false) {
		if (typeof id !== 'string') {
			throw 'Error: Invalid collection id';
		}
		this.id = id;
		this.timestamp = Date.now();
		this.on = {
			denied: 'No tienes permiso para hacer esta acción',
			modified: {
				success: 'Datos cargado con éxito',
				fail: 'Algo salió mal! Carga incorrecta, verifique los datos pruebe nuevamente',
			},
			deleted: {
				success: 'Datos borrados con éxito',
				fail: 'Algo salió mal! No se pude borrar',
			},
			notFound: {
				cart: 'Carrito no encontrado',
				product: 'Producto no encontrado',
			},
			default: {
				success: 'Acción realizada con éxito',
				fail: 'Algo salió mal! Prueba nuevamente',
			},
		};
		this.productTemplate = {
			id: 0,
			timestamp: Date.now(),
			name: '',
			description: '',
			sku: 0,
			img: '',
			price: 0,
			stock: 0,
		};
		this.db;
		this.collection;
		this.data = [];
	}

	async init() {
		console.log('[Firebase connection] Cart');

		try {
			admin.initializeApp({
				credential: admin.credential.cert(test_key),
			});
			this.db = admin.firestore();
			this.collection = this.db.collection(this.id);
			await this.syncLocalData();

			return { done: true, result: 'Cart init sucessfully' };
		} catch (error) {
			return { done: false, result: error };
		}
	}

	async assignCart(id) {
		try {
			this.collection = this.db.collection(this.id);
			await this.syncLocalData();

			return { done: true, result: id };
		} catch (error) {
			console.log(error);
			return { done: false, result: error };
		}
	}

	async syncLocalData() {
		try {
			const raw_data = await this.collection.get();
			raw_data.forEach((doc) => this.data.push(doc.data()));
			this.data.sort((a, b) => a.timestamp > b.timestamp);
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	disconnect() {
		try {
			admin.app().delete();
			return { done: true, result: 'Disconnected' };
		} catch (error) {
			return { done: false, result: error };
		}
	}

	async saveProduct(product) {
		const new_product = product;
		try {
			await this.collection.doc(new_product.id).set(new_product);
		} catch (error) {
			console.log(error);
			return { done: false, result: error };
		}
		await this.syncLocalData();
		return { done: true, result: new_product };
	}

	isProductInContainer = (id) => {
		const exist = this.data.find((product) => product?.id == id)
			? this.data.find((product) => product?.id == id)
			: false;

		if ((id && !exist) || (id && exist == undefined)) {
			return false;
		}
		return true;
	};

	async addProduct(product) {
		product.timestamp = Date.now();

		const newProduct = {
			...this.template,
			...product,
		};
		newProduct.id = uuidv1();

		const msg = await this.saveProduct(newProduct);

		return msg.done
			? {
					done: msg.done,
					result: this.on.modified.success,
            }
			: {
					done: false,
					result: `${this.on.modified.fail} : ${msg.result}`,
            };
	}

	get = async (product_id = -1) => {
		await this.syncLocalData();
		const result =
			product_id !== -1
				? {
						done: true,
						result: this.data.find((product) => product?.id === product_id),
                }
				: {
						done: true,
						result: this.data,
                };

		console.log(result);

		if (!result.result) {
			return {
				done: false,
				result: this.on.notFound.product,
			};
		}
		return result;
	};

	getIndex = (id) => {
		const result = this.data.findIndex((product) => product.id == id);
		return result;
	};

	getProductByIndex = (index) => {
		const end_product = this.data[index];
		return end_product
			? { done: true, result: end_product }
			: { done: false, result: this.on.notFound.product };
	};

	async update(product_id, productObj) {
		const index = this.getIndex(product_id);

		if (typeof index == 'number')
			return { done: false, result: this.on.notFound.product };
		productObj.timestamp = Date.now();

		const newProduct = {
			...this.data[index],
			...productObj,
		};

		const msg = await this.saveProduct(newProduct);

		return msg.done
			? {
					done: msg.done,
					result: msg.result,
            }
			: {
					done: msg.done,
					result: `${this.on.modified.fail} : ${msg.result}`,
            };
	}

	async delete(product_id = -1) {
		if (product_id == -1) {
			console.log('Warning: Deleting all data');
			try {
				const documents = await this.collection.get();
				const batch = this.db.batch();
				documents.docs.forEach((doc) => {
					batch.delete(doc.ref);
				});
				await batch.commit();
				delete this.data;
				return { done: true, result: this.on.deleted.success };
			} catch (error) {
				return {
					done: false,
					result: `${this.on.deleted.fail} : ${error}`,
				};
			}
		}

		const index = this.getIndex(product_id);
		if (typeof index !== 'number')
			return { done: false, result: this.on.notFound.product };

		delete this.data[index];
		try {
			await this.collection.doc(product_id).delete();
			return { done: true, result: this.on.deleted.success };
		} catch (error) {
			return { done: false, result: this.on.deleted.fail + error };
		}
	}
}

module.exports = Cart;
