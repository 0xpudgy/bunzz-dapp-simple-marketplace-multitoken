import BigNumber from "bignumber.js";
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});
const ethers = require("ethers");

export const getMultiTokenContract = (bunzz) => {
  return bunzz && bunzz.contracts && bunzz.contracts.multiToken;
};

export const setMultiTokenAddress = (bunzz, address) => {
  bunzz.contracts.multiToken.options.address = address;
};

export const getSimpleMarketplaceContract = (bunzz) => {
  return bunzz && bunzz.contracts && bunzz.contracts.simpleMarketplace;
};

export const setSimpleMarketplaceAddress = (bunzz, address) => {
  bunzz.contracts.simpleMarketplace.options.address = address;
};

export const mint = async (
  multiToken,
  to,
  tokenId,
  tokenAmount,
  data,
  account
) => {
  return multiToken.methods
    .mint(to, new BigNumber(tokenId), new BigNumber(tokenAmount), data)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      console.log(tx);
      return tx.transactionHash;
    });
};

export const setApprovedForAll = async (multiToken, operator, account) => {
  return multiToken.methods
    .setApprovedForAll(operator, true)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      console.log(tx);
      return tx.transactionHash;
    });
};

export const list = async (simpleMarketplace, tokenId, price, account) => {
  return simpleMarketplace.methods
    .list(new BigNumber(tokenId), new BigNumber(price))
    .send({ from: account })
    .on("transactionHash", (tx) => {
      console.log(tx);
      return tx.transactionHash;
    });
};

export const buy = async (
  simpleMarketplace,
  tokenId,
  paymentAmount,
  account
) => {
  return simpleMarketplace.methods
    .buy(new BigNumber(tokenId))
    .send({ from: account, value: ethers.utils.parseEther(paymentAmount) })
    .on("transactionHash", (tx) => {
      console.log(tx);
      return tx.transactionHash;
    });
};
