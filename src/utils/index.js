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

export function formatPunkIndex(index) {
    if (index < 10) {
        return '00' + index;
    } else if (index < 100) {
        return '0' + index;
    } else {
        return index;
    }
}

export function dataURLtoFile(dataurl, filename) {//将base64转换为文件
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export function formatNum(num, dec) {
    num = num.toString();
    let index = num.indexOf('.');
    if(index !== -1) {
        num = num.substring(0, dec + index + 1);
    } else {
        num = num.substring(0);
    }

    return parseFloat(num).toFixed(dec);
}