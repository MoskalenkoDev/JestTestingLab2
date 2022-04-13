import { Currency } from "./Currency";

class Database {

    #itemList = []; // { itemId, name, price, currency, count}

    #purchaseHistory = []; // { purchaseId , userId, purchase : [{itemId , count}] }
    #returnedGoodsHistory = []; // { purchaseId, returnedGoods : [{itemId , count}] }

    addItem = (name,price,currency,count) => {
        let itemId = `i${(+new Date).toString(16)}`;
        if(name && price > 0 && Currency[currency] && count > 0 && Number.isInteger(count)) {
           this.#itemList.push({itemId,name,price,currency,count}); 
        }
        else throw new Error("incorrect input data");
    }

    updateItem = (purchaseInfo, isReturning = false, purchaseId = "") => {
        purchaseInfo.forEach(({itemId, count})=> {
            const currentItem = this.#itemList.find((val)=>(val.itemId === itemId));
            if(isReturning) {
                currentItem.count += count;
                let returnedPurchaseItems = this.#returnedGoodsHistory.find((val) => (val.purchaseId === purchaseId));
                if(returnedPurchaseItems) { 
                    item = returnedPurchaseItems.returnedGoods.find((val) => (val.itemId === itemId));
                    item.count -= count;
                }
                else this.#returnedGoodsHistory.push({purchaseId, returnedGoods : [{itemId, count}]})
            } 
            else currentItem.count -= count;
        })
    }

    getItemsList = () => {
        return this.#itemList;
    }

    getItemInfo = (itemId) => {
        return this.#itemList.find((val) => (val.itemId === itemId));
    }

    removeItem = (itemId) => {
        let index = this.#itemList.findIndex((val)=>(val.itemId === itemId));
        if(index !== -1) this.#itemList.splice(index,1);
        else throw new Error("incorrect itemId");
    }

    addPurchaseHistoryNote = (userId, purchaseInfo) => {
        const purchaseId = `p${(+new Date).toString(16)}`;
        const purchaseDate = new Date().toLocaleString();
        this.#purchaseHistory.push({purchaseId, userId, purchaseDate , purchase : purchaseInfo});
    }

    getPurchaseHistoryNoteList = () => {
        return this.#purchaseHistory;
    }

    getReturnedGoodsHistory = (purchaseId) => {
        return this.#returnedGoodsHistory.find((val) => (val.purchaseId === purchaseId));
    }

    getUserPurchaseHistoryNotes = (userId) => {
        return this.#purchaseHistory.filter((val) => (val.userId === userId));
    }

}

const database = new Database();
export {database as Database}