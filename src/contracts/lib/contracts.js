import * as Types from "./types.js";
import { contractAddresses } from "./constants.js";
import MultiTokenAbi from "./abi/multiToken.json";
import SimpleMarketplaceAbi from "./abi/simpleMarketplace.json";

export class Contracts {
  constructor(provider, networkId, web3, options) {
    this.web3 = web3;
    this.defaultConfirmations = options.defaultConfirmations;
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5;
    this.confirmationType =
      options.confirmationType || Types.ConfirmationType.Confirmed;
    this.defaultGas = options.defaultGas;
    this.defaultGasPrice = options.defaultGasPrice;
    this.multiToken = new web3.eth.Contract(MultiTokenAbi);
    this.simpleMarketplace = new web3.eth.Contract(SimpleMarketplaceAbi);
    this.setProvider(provider, networkId);
  }

  setProvider(provider, networkId) {
    const setProvider = (contract, address) => {
      contract.setProvider(provider);
      if (address) contract.options.address = address;
      else console.error("Contract address not found in network", networkId);
    };

    setProvider(
      this.multiToken,
      contractAddresses.multiToken[networkId]
    );

    setProvider(
      this.simpleMarketplace,
      contractAddresses.simpleMarketplace[networkId]
    );
  }
}
