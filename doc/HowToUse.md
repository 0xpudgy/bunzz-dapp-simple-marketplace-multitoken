## How to use module

1. Prepare your nft contract and mint all the items from the collection.

2. Call the function `connectToOtherContracts` to set up the details explained in the table from above, the function takes only one argument that represents an array of addresses, the first item from the array represent the nft.

3. Approve the nft marketplace to use the token id you want to list up for sale.

4. To list one nft up for sale, the function `list` needs to be called, the function takes two arguments, the first argument argument represents the token id of the nft you want to list up for sale, and the second argument represents the price of that nft, that will be payed in the currency selected by the contract owner at the previous step.

5. To buy one nft that is listed for sale, you need to call the function `buy`, this function takes 1 arguments, the token id of the nft you want to buy, the amount you will be paying for it it is payed in native tokens so it should be send over the `msg.value`.