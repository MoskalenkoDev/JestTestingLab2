import { Item } from "./Item";
import { User } from "./User";
import { Database } from "./Database";
import fetch from 'node-fetch';
import {Blob} from 'buffer';

class Store {

    getFlag = async (country) => {
        let flag = await fetch(`https://flagcdn.com/w80/${country}.jpg`); // here we get the flag
        return flag.url;
    }

    #accessKey = "bbbb0013b8187d5e414602895a5f9009";

    convertCurrency = async(balanceCurrency , itemCurrency , countOfMoney) => {
        let convertedMoney = 0;
        let response = await fetch(`http://data.fixer.io/api/latest?access_key=${this.#accessKey}`);
        let jsonResponse = await response.json();
        convertedMoney = countOfMoney / jsonResponse.rates[itemCurrency] * jsonResponse.rates[balanceCurrency];
        return Number(convertedMoney.toFixed(2));
    }

    buyGoods = async( UserInstance, purchaseInfo) => {

        await this.getFlag(UserInstance.country);
        let totalPrice = 0;

        for(const {itemId, count} of purchaseInfo) {
            let item = Database.getItemInfo(itemId);
            if(count > 0 && Number.isInteger(count)) {
                if(item.count - count < 0) throw new Error("The store doesn't has enough count of ", item.itemId);
                const convertedPrice = await this.convertCurrency(UserInstance.accountBalance.currency, item.currency, item.price * count);
                totalPrice += convertedPrice;
            }
            else throw new Error("Count must be a number and further than zero");
        }
        
        if(UserInstance.accountBalance.balance < totalPrice) throw new Error("You don't have enough money for this purchase");
        UserInstance.accountBalance.balance -= totalPrice;
        UserInstance.accountBalance.balance = Number(UserInstance.accountBalance.balance.toFixed(2)); 
        Database.updateItem(purchaseInfo);
        Database.addPurchaseHistoryNote(UserInstance.userId, purchaseInfo);
        
        return true;
    }

    returnGoods = async (UserInstance, purchaseId, itemId, count) => {

        await this.getFlag(UserInstance.country);

        const history = Database.getPurchaseHistoryNoteList();
        const historyNote = history.find((val) => (val.purchaseId === purchaseId));
        if(!historyNote) throw new Error("Wrong purchaseId");

        let historyPurchaseItemNote = historyNote.purchase.find((val) => (val.itemId));
        if(!historyPurchaseItemNote) throw new Error("Wrong itemId");
        let returnedCount = Database.getReturnedGoodsHistory(purchaseId)?.returnedGoods.find((val) => (val.itemId === itemId))?.count;
        if(returnedCount? (historyPurchaseItemNote.count - returnedCount < count) : historyPurchaseItemNote.count < count ) throw new Error("You can't return more items than you bought");
        const itemInfo = Database.getItemInfo(itemId);
        const convertedPrice = await this.convertCurrency(UserInstance.accountBalance.currency, itemInfo.currency, itemInfo.price * count);
        UserInstance.accountBalance.balance += convertedPrice;
        UserInstance.accountBalance.balance = Number(UserInstance.accountBalance.balance.toFixed(2));
        Database.updateItem([{itemId, count}],true,purchaseId);
        return true;
    }

    getGoodsList = () => {
        return Database.getItemsList();
    }

    getUserPurchaseHistoryNotes = (userId) => {
       return Database.getUserPurchaseHistoryNotes(userId);
    }

    getReturnedGoodsHistory = (purchaseId) => {
        return Database.getReturnedGoodsHistory(purchaseId);
    }

    addItem = (name,price,currency,count) => {
        Number(price.toFixed(2));
        Database.addItem(name,price,currency,count);
        return true;
    }

    removeItem = (itemId) => {
        Database.removeItem(itemId);
        console.log("Item deleted successfully");
        return true;
    }

}


const store = new Store();
export {store as Store}; 