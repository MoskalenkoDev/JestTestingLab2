// import { Database } from "./Database";
// import { Currency } from "./Currency";

// describe("testing the Database functions by classic school style: ", ()=> {

//     let itemId = "";
    
//     beforeEach(()=> {
//         itemId = Database.getItemsList()[0]?.itemId;
//     })

//     test("test the addItem function", ()=> {
//         Database.addItem("Pillow",200, Currency.UAH, 4);
//         Database.addItem("Book", 100, Currency.RUB, 5);
//         Database.addItem("Chair", 50, Currency.USD, 12);
//         expect(Database.getItemsList()[0]).toEqual({itemId: expect.any(String) , name : "Pillow", price : 200 ,currency : Currency.UAH , count : 4  });  
//     });

//     test("test the updateItem function", ()=> {
//         Database.updateItem([{itemId : itemId, count : 2}]);
//         expect(Database.getItemsList()[0].count).toBe(2);
//     })

//     test("test the getItemInfo function", ()=> {
//         const itemInfo = Database.getItemInfo(itemId);
//         expect(itemInfo.name).toBe("Pillow");
//     })

//     test("test the removeItem function", ()=> {
//         Database.removeItem(itemId);
//         expect(Database.getItemsList().length).toBe(2);
//     })

//     test("test the removeItem function (negative expectation)", ()=> {
//         expect(() => {
//             Database.removeItem("233");
//         }).toThrowError(new Error("incorrect itemId"));
//         expect(Database.getItemsList().length).toBe(2);
//     })

//     test("test the addPurchaseHistoryNote function", ()=> {
//         Database.addPurchaseHistoryNote("sfsdfs", [{itemId,count : 2}])
//         expect(Database.getUserPurchaseHistoryNotes("sfsdfs")[0]).toMatchObject({userId: "sfsdfs"});
//     });

// })