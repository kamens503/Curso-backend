class User {
    constructor({mail, isAdmin}){
        this.cart = cart
        this._mail = mail
        this._can = {
            read: {
                product: true,
                cart: true
            },
            update: {
                product: isAdmin ? true : false,
                cart: true
            },
            create: {
                product: isAdmin ? true : false,
                cart: false
            },
            delete: {
                product: isAdmin ? true : false,
                cart: false
            }
        }
        this.can = ({operation, type}) => this._can[operation][type]
    }
}