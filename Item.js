export class Item {

    #price;
    constructor( name, price, currency) {
        this.name = name;
        this.price = price;
        this.currency = currency;
    }
    
    get price(){return this.#price }

    set price(newPrice){
        if(newPrice <= 0) throw new Error("The price of goods may not be less than or equal to zero");
        else if(typeof newPrice !== "number") throw new Error("Price type must be a number!");
        else this.#price = newPrice;
    }
    
}
