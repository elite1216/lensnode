import { ethers, Wallet, utils } from 'ethers';
import omitDeep from 'omit-deep';

// ethers package must be version "^5.7.2", otherwise it won't work
const ethersProvider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
//const ethersProvider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com');
const signer = ethersProvider.getSigner()

//export const getSigner = () => {
//    return new Wallet(PK, ethersProvider);
//};

//export const getAddressFromSigner = () => {
//    return getSigner().address;
//};

export const omit = (object, name) => {
    return omitDeep(object, name);
};

export const signedTypeData = (
    domain,
    types,
    value
    ) => {
    //const signer = getSigner();
    // remove the __typedname from the signature!
    return signer._signTypedData(
      omit(domain, '__typename'),
      omit(types, '__typename'),
      omit(value, '__typename')
    );
};

export const splitSignature = (signature = '') => {
    return utils.splitSignature(signature);
};

