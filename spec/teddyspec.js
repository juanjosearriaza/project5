describe("detail", function () {
  let cart = [
    {
      quantity: 1,
      name: "Arnold",
      price: "39.00",
      id: "5beaa8bf1c9d440000a57d94",
      image: "http://localhost:3000/images/teddy_2.jpg",
    },
    {
      quantity: 1,
      name: "Norbert",
      price: "29.00",
      id: "5be9c8541c9d440000665243",
      image: "http://localhost:3000/images/teddy_1.jpg",
    },
  ];
  it("should locate the item with the same id", function () {    
    const teddy1 = new ShoppingCart(cart);
    const id = "5beaa8bf1c9d440000a57d94";    
    expect(teddy1.locateFind(id, cart)).toEqual(0);
  });
  it("should create a new item in the cart if there is not an item with the same id", function () {
    let teddy1 = new ShoppingCart(cart);
    let data = {
      quantity: 1,
      name: "Gustav",
      price: "45.00",
      id: "5beaabe91c9d440000a57d96",
      imageUrl: "http://localhost:3000/images/teddy_4.jpg",
    };
    let id = "5beaabe91c9d440000a57d96";
    let find = teddy1.locateFind(id, cart);
    expect(teddy1.locateFind(id, cart)).toEqual(undefined);    
    expect(cart.length).toEqual(2)
    let input = {value: 1};
    teddy1.createCart(find, input, data, id);
    expect(cart.length).toEqual(3)
    expect(cart[cart.length - 1].name).toEqual("Gustav");
  });
});
