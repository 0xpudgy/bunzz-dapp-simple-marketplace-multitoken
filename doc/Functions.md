# WRITE(main)

## transferOwnership

Transfer the ownership of the contract

|Name|Type|Description|Example|Default|
|--- |---|---|---|---|
|newOwner|address|The address of the new owner of the contract||N/A|

## renounceOwnership

Renounce on the contract ownership

## list

Create a listing in marketplace for a certain item from the collection

|Name|Type|Description|Example|Default|
|--- |---|---|---|---|
|tokenId|uint256|The id of the token you want to list for sale||N/A|
|price|uint256|The price you want to sell the token for||N/A|

## connectToOtherContracts

Connect this modules with other ones to interact with, in this case the NFT collecton that will be sold

|Name|Type|Description|Example|Default|
|--- |---|---|---|---|
|contracts|address[]|The list of contracts you want to connect with this module||N/A|

## buy

Buy a certain token from the collection that is listed in the marketplace

|Name|Type|Description|Example|Default|
|--- |---|---|---|---|
|tokenId|uint256|The id of the token that you want to buy||N/A|

# READ(main)

## tokensListing

Returns the id of the listing based on the nft token id

## owner

Returns the contract owner

## nft

Returns the nft address

## listings
Returns listing informations
