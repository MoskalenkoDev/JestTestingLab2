import { Store } from "./Store";
import { Database } from "./Database";
import { Countries } from "./Countries";
import { Currency } from "./Currency";

describe("testing the Store functions by London school style : ", ()=> {

    let user = {userId : "user123",country : Countries.Ukraine, accountBalance : {balance : 1000, currency : Currency.UAH}}

    let itemList = [
        { itemId : "12345", name : "Pillow", price : 200, currency : Currency.UAH, count : 4},
        { itemId : "67890", name : "Book", price : 100, currency : Currency.RUB, count : 5},
    ]

    let purchaseInfo = [
        {itemId : "12345", count : 2},
        {itemId : "67890", count : 3}
    ];

    test("test the getFlag function", async()=> {
       let flag =  await Store.getFlag(Countries.Afghanistan);
       expect(flag).toEqual(expect.any(String));
    })

    test("test the convertCurrency function", async()=> {
        let convertedPrice =  await Store.convertCurrency(Currency.USD, Currency.UAH, 250);
        expect(convertedPrice).toBe(8.51);
    })

    jest.spyOn(Database, 'getItemInfo').mockReturnValueOnce(itemList[0]).mockReturnValueOnce(itemList[1]);
    jest.spyOn(Database, 'updateItem').mockReturnValueOnce();
    jest.spyOn(Database, 'addPurchaseHistoryNote').mockReturnValueOnce();

    test("test the buyGoods function", async()=> {

        let answer = await Store.buyGoods(user,purchaseInfo);
        expect(answer).toBe(true);
        expect(user.accountBalance.balance).toBeLessThan(1000);
    });

    jest.spyOn(Database, 'getItemInfo').mockReturnValue(itemList[0]);
    jest.spyOn(Database, 'updateItem').mockReturnValue();

    jest.spyOn(Database, 'getPurchaseHistoryNoteList').mockReturnValue([ { purchaseId : "111" , userId : "user123", purchase : [{itemId : "12345" , count : 2}] } ]);

    jest.spyOn(Database, 'getReturnedGoodsHistory').mockReturnValue(undefined);

    test("test the returnGoods function", async()=> {
        let answer = await Store.returnGoods(user,"111", "12345", 2);
        expect(answer).toBe(true);
        expect(user.accountBalance.balance).toBeLessThan(920);
    });

    test("test the returnGoods function (negative)", async()=> {
        
        await expect(async() => {
            await Store.returnGoods(user, "111", "12345", 5);
        }).rejects.toThrowError(new Error("You can't return more items than you bought"));

        expect(Database.getPurchaseHistoryNoteList).toHaveBeenCalledTimes(2)
    });

    // the other functions are related with Database directly , so we don't need to check them out

})