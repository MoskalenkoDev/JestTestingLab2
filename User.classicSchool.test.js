// import { User } from "./User";
// import { Database } from "./Database";
// import { Countries } from "./Countries";
// import { Currency } from "./Currency";


// describe("testing the User functions by classic school style : ", ()=> {

//     const usersList = [];

//     beforeAll(()=> { // testing the constructor
//         Database.addItem("Book", 100, Currency.RUB, 5);
//         Database.addItem("Chair", 70, Currency.USD, 8);

//         usersList.push(new User(Countries.Ukraine ,{balance: 1000, currency: Currency.UAH}));
//         usersList.push(new User(Countries.Japan ,{balance: 700, currency: Currency.USD}));
//     });

//     test("test the buyGoods function", async()=> {
//         let itemsList = User.getGoodsList();
//         await usersList[0].buyGoods([{itemId : itemsList[0].itemId, count : 2}]);
//         expect(Database.getItemInfo(itemsList[0].itemId).count).toBe(3);
//         expect(usersList[0].accountBalance.balance).toBe(928.91);
//     });

//     test("test the returnGoods function (negative)", ()=> {
//         let itemsList = User.getGoodsList();
//         let purchaseId = usersList[0].getUserPurchaseHistoryNotes()[0].purchaseId;

//         expect(async() => {
//             await usersList[0].returnGoods(purchaseId,itemsList[0].itemId, 3);
//         }).rejects.toThrowError(new Error("You can't return more items than you bought"));
        
//     })

//     test("test the returnGoods function", async()=> {
//         let itemsList = User.getGoodsList();
//         let purchaseId = usersList[0].getUserPurchaseHistoryNotes()[0].purchaseId;

//         await usersList[0].returnGoods(purchaseId,itemsList[0].itemId,1);
//         let itemCount = Database.getItemInfo(itemsList[0].itemId).count;

//         expect(usersList[0].accountBalance.balance).toBe(964.45)
//         expect(itemCount).toBe(4);
//     })

//     test("test the getUserPurchaseHistoryNotes function", ()=> {
//         let purchaseInfo = usersList[0].getUserPurchaseHistoryNotes();
//         let purchaseId = purchaseInfo[0].purchaseId;
//         let returnedHistory = usersList[0].getReturnedGoodsHistory(purchaseId);
//         const returnedItem = returnedHistory.returnedGoods.find((val) => (val.itemId === User.getGoodsList()[0].itemId)).count;
//         expect(purchaseInfo.length).toEqual(1);
//         expect(returnedItem).toBe(1)
//     })

// })