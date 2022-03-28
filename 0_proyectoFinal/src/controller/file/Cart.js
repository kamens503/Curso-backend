
/* eslint-disable no-undef */
class Cart {
	constructor(id = false) {
		if (!id) {
			throw 'No valid Id';
		}
		this.id = id;
		this.fs = require('fs');
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
		this.data = {};
		this.path = '';
	}
	init() {
		console.log('[File connection] Cart');
		try {
			this.data = this.id
				? this.getFile(__dirname + `/data/cart_${this.id}.json`)
				: {};
			this.path = __dirname + `/data/cart_${this.id}.json`;
			return { done: true, result: 'Cart init successfully' };
		} catch (error) {
			console.log(error);
			return { done: false, result: 'Cart couldnt init:', error };
		}
	}

	getFile(path) {
		if (!this.fs.existsSync(path)) {
			this.fs.writeFileSync(
				path,
				JSON.stringify({
					idPool: 0,
					products: [],
				})
			);
		}
		return JSON.parse(this.fs.readFileSync(path, 'utf-8'));
	}

	syncLocalData = () => {
		try {
			this.fs.writeFileSync(this.path, JSON.stringify(this.data));
			return {
				done: true,
				result: this.on.default.success,
			};
		} catch (error) {
			return {
				done: false,
				result: `Algo salió mal! No se pudo sobreescribir el archivo ${error}`,
			};
		}
	};

	assignCart(id) {
		this.id = id;
        this.path = __dirname + `/data/cart_${this.id}.json`
        console.log({path: this.path});
		try {
			this.data = this.id
				? this.getFile(this.path)
				: {};
			return { done: true, result: id };
		} catch (error) {
			console.log(error);
			return { done: false, result: 'Cart couldnt init:', error };
		}
	}

	isProductInContainer = (id) => {
		const exist = this.data.products.find((product) => product?.id === id)
			? this.data.products.find((product) => product?.id === id)
			: false;

		if ((id && !exist) || (id && exist == undefined)) {
			return false;
		}
		return true;
	};

	addProduct = (product) => {
		const product_id = this.data.idPool++;

		product.id = product_id;
		product.timestamp = Date.now();

		const newProduct = {
			...this.template,
			...product,
		};
		this.data.products.push(newProduct);

		const msg = this.syncLocalData();

		return msg.done
			? {
					done: msg.done,
					result: newProduct,
            }
			: {
					done: false,
					result: msg.result,
            };
	};

	get = (product_id = -1) => {
		const result =
			product_id != -1
				? {
						done: true,
						result: this.data.products.find(
							(product) => product?.id == product_id
						),
                }
				: {
						done: true,
						result: this.data.products,
                };

		if (!result.result) {
			return {
				done: false,
				result: this.on.notFound.product,
			};
		}
		return result;
	};

	getIndex = (id) => {
		const result = this.data.products.findIndex((product) => product.id == id);
		return result;
	};

	getProductByIndex = (index) => {
		const product = this.data.products[index];

		return product
			? { done: true, result: product }
			: { done: false, result: this.on.notFound.product };
	};

	update = (product_id) => {
		const index = this.getIndex(product_id).result;
		if (typeof index !== 'number')
			return { done: false, result: this.on.notFound };
		productObj.timestamp = Date.now();

		this.data.products[index] = {
			...this.data.products[index],
			...productObj,
		};

		const msg = this.syncLocalData();
		return msg.done
			? {
					done: true,
					result: this.data.products[index],
            }
			: {
					done: false,
					result: msg.result,
            };
	};

    disconnect = () => {
        return {done: true}
    }

	delete = (product_id = -1) => {
		if (product_id == -1) {
			try {
				this.fs.unlinkSync(this.path);
			} catch (error) {
				return {
					done: false,
					result: `${this.on.deleted.fail} : ${error}`,
				};
			}
			delete this.data;
			return { done: true, result: this.on.deleted.success };
		}

		const index = this.getIndex(product_id);
        console.log(index);
		if (typeof index != 'number') return { done: false, result: this.on.notFound.product };

		delete this.data.products[index];
		const msg = this.syncLocalData();
		return msg.done
			? {
					done: true,
					result: this.on.deleted.success,
            }
			: {
					done: false,
					result: this.on.deleted.fail,
            };
	};
}

module.exports = Cart;
