class Product {
    name:string;
    category:string;
    quantity:number;
    minQuantity:number;

    constructor (name, category, quantity, minQuantity) {
        this.name=name;
        this.category=category;
        this.quantity=quantity;
        this.minQuantity=minQuantity;
    }
    public getQuantity() {
        return this.quantity;
    }
    public getQstatus() {
        return this.quantity <= this.minQuantity ? true : false;
    }
}