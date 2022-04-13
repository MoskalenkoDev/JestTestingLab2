import { Store } from "./Store";

export class User {

    #userId;
    constructor(country, {balance, currency} ) {
        this.country = country;
        this.accountBalance = {balance, currency};
        this.#userId = `f${(+new Date).toString(16)}`;
    }

    get userId() { return this.#userId }

    buyGoods = async(purchaseInfo) => { // purchaseInfo : [{itemId, count}]
        let answer = await Store.buyGoods(this, purchaseInfo);
        // if(answer) console.log("Item bought successfully");
    }

    returnGoods = async(purchaseId, itemId, count) => {
        let answer = await Store.returnGoods(this, purchaseId, itemId, count );
        // if(answer) console.log("Item returned successfully");
    }

    static getGoodsList = () => {
       let goodsList = Store.getGoodsList();
       return goodsList;
    }

    getUserPurchaseHistoryNotes = () => {
       const history = Store.getUserPurchaseHistoryNotes(this.userId);
       return history;
    }

    getReturnedGoodsHistory = (purchaseId) => {
        const history = Store.getReturnedGoodsHistory(purchaseId);
        return history;
    }
}
