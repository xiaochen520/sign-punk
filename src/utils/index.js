import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

export function getConstract(addr, abi, library, account) {
    let prov = new Web3Provider(library);

    if (account) {
        prov = prov.getSigner(account).connectUnchecked();
    }

    return new Contract(addr, abi, prov);
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}