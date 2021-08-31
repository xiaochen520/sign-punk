import { useState, useEffect } from 'react';
import mergeImages from './libs/mergeImages';
import axios from 'axios';
import { Web3Provider } from '@ethersproject/providers';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { create } from 'ipfs-http-client';
import sty from './App.module.scss';
import cn from 'classnames';
import { getConstract, getRandomInt, formatPunkIndex, dataURLtoFile, formatNum } from './utils';
import { PUNK_CONTRACT, PUNK_ABI, SIGN_CONTRACT, SIGN_ABI, PUNK_IMG, CAP_IMG } from './constant';

import Modal from './components/Modal';
import Loading from './components/Loading';

import bannerImg from './img/banner.png';
import radomImg from './img/radom-card.png';
import headImg from './img/head';


function App() {
  const [hasEthereum, setHasEthereum] = useState(false);
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState('');

  const [punkIndex, setPunkIndex] = useState('');
  const [signText, setSignText] = useState('');
  const [freeSignText, setFreeSignText] = useState('');
  const [freeNote, setFreeNote] = useState('');
  const [signNote, setSignNote] = useState('');
  const [freeTwitter, setFreeTwitter] = useState('');
  const [signTwitter, setSignTwitter] = useState('');
  const [uBeforeSignText, setUBeforeSignText] = useState('');
  const [uSignText, setUSignText] = useState('');
  const [uTwitter, setUTwitter] = useState('');
  const [uNote, setUNote] = useState('');


  const [randomLoad, setRandomLoad] = useState(false);
  const [freeLoad, setFreeLoad] = useState(false);
  const [updateLoad, setUpdateLoad] = useState(false);

  const [freeTime, setFreeTime] = useState(false);

  //tip modal
  const [tipModal, setTipModal] = useState(false);
  const [tipText, setTipText] = useState('');

  const [updateTab, setUpdateTab] = useState(0);

  const [signList, setSignList] = useState([]);

  const [ethBalance, setEthBalance] = useState(0);

  //connect
  async function connect() {
    const addresses = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })

    const chainId = await window.ethereum.request({ method: 'eth_chainId' })

    const balance = await new Web3Provider(window.ethereum).getBalance(addresses[0])

    setAccount(addresses[0]);
    setChainId(parseInt(chainId));
    setEthBalance(formatNum(formatUnits(balance), 3));
  }

  async function getSignCardList(contract) {
    let arr = [];
    let total = await contract.callStatic.totalSupply();
    for (let i = 1; i <= total; i++) {
      let punkSign = await contract.callStatic.getpunksInfo(i);

      let signImg = await axios.get(punkSign.meta);

      let obj = {
        image: signImg.data.image,
        name: signImg.data.name,
        notes: punkSign.notes,
        twitter: punkSign.twitter
      }
      arr.push(obj);
    }
    console.log(5555, arr)
    setSignList(arr);
  }

  //init metamsk
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setHasEthereum(true);
      connect();
    }
  }, [account, chainId]);


  //add eventListener
  useEffect(() => {
    const { ethereum } = window

    if (ethereum && ethereum.on) {
      const handleChainChanged = (chain) => {
        connect();
      }
      const handleAccountsChanged = (accounts) => {
        connect();
      }

      const handleNetworkChanged = () => {
        connect();
      }
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('networkChanged', handleNetworkChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
  }, [account]);

  useEffect(() => {
    setSignList([]);
    setFreeTime(0);
    if (!account) return;
    if (chainId != 4) return;
    const contract = getConstract(SIGN_CONTRACT, SIGN_ABI, window.ethereum, account);

    //get free number
    contract.callStatic.totalSupply().then(res => {
      setFreeTime(res.toNumber())
    });

    //get card
    getSignCardList(contract);

  }, [account, chainId]);

  //random create
  async function randomCreate(contract, uri, capIndex) {
    let price = await contract.callStatic.getMintPrice();

    contract.mintCryptoPunksSign(capIndex, uri, signTwitter, signNote, { from: account, gasLimit: '990000', value: price }).then(res => {
      setRandomLoad(false);
      setTipText('The transaction has been sent on the chain');
      setTipModal(true);
    }).catch(err => setRandomLoad(false));
  }

  //free create
  function freeCreate(contract, uri, capIndex) {
    contract.cryptoPunksClaim(capIndex, punkIndex, uri, freeTwitter, freeNote, { from: account, gasLimit: '990000' }).then(res => {
      setFreeLoad(false);
      setTipText('The transaction has been sent on the chain');
      setTipModal(true);
    }).catch(err => setFreeLoad(false))
  }

  //update
  async function updateCreate(contract, uri) {
    let price = await contract.callStatic.getUpdateSignPrice();

    contract.updatePunksSign(uBeforeSignText, uri, { from: account, gasLimit: '990000', value: price }).then(res => {
      setUpdateLoad(false);
      setTipText('The transaction has been sent on the chain');
      setTipModal(true);
    }).catch(err => setUpdateLoad(false))
  }

  //createImg
  async function createSignImg(type, cap) {
    let number;
    let capIndex;
    let capText;
    const contract = getConstract(SIGN_CONTRACT, SIGN_ABI, window.ethereum, account);

    if (type === 'update') {
      number = uBeforeSignText - 1;
      capIndex = cap;
    } else {
      number = await contract.callStatic.totalSupply();
      number = number.toNumber();
      capIndex = getRandomInt(1, 9);
    }

    let signIndex = formatPunkIndex(number);
    const client = create('https://ipfs.infura.io:5001/api/v0');

    if (type === 'random') {
      capText = signText;
    } else if (type === 'free') {
      capText = freeSignText;
    } else {
      capText = uSignText;
    }

    let b64 = await mergeImages([`${PUNK_IMG}${signIndex}.png`, `${CAP_IMG}${capIndex}.png`], { crossOrigin: '*' }, capText);

    const imgFile = dataURLtoFile(b64, `cryptopunkssign${signIndex}.png`);

    try {
      const ipfsHash = await client.add(imgFile);
      const imgUrl = `https://ipfs.infura.io/ipfs/${ipfsHash.path}`;
      const tokenURI = JSON.stringify({
        name: `${capText}#${number + 1}`,
        description: 'CryptoPunksSign add signature attributes to the original CryptoPunks 10,000 punk avatars, and users who hold cryptopunks can claim them for free. Users with CryptoPunksSign can change their signature and bind it to Twitter.',
        image: imgUrl,
        attributes: []
      });

      var jsonFile = new File([tokenURI], `cryptopunkssign${signIndex}.json`, {
        type: 'application/json'
      });

      const uriHash = await client.add(jsonFile);
      const uriUrl = `https://ipfs.infura.io/ipfs/${uriHash.path}`;

      if (type === 'random') {
        randomCreate(contract, uriUrl, capIndex);
      } else if (type === 'free') {
        freeCreate(contract, uriUrl, capIndex);
      } else {
        updateCreate(contract, uriUrl);
      }

    } catch (error) {
      if (type === 'random') {
        setRandomLoad(false);
      } else if (type === 'free') {
        setFreeLoad(false);
      } else {
        setUpdateLoad(false);
      }
      setTipText('Network error, please try again');
      setTipModal(true);
      console.log('Error uploading file: ', error)
    }

    // setFinalSrc(b64);
  }

  async function freeDraw() {
    if (freeLoad) return;

    if (!hasEthereum) {
      setTipText('Please install metamask wallet and switch to the Main network');
      setTipModal(true);
      return;
    }

    if (chainId != 4) {
      setTipText('Please switch to the Main network');
      setTipModal(true);
      return;
    }

    if (!punkIndex) {
      setTipText('Please enter your punk number');
      setTipModal(true);
      return;
    }
console.log(11111,freeSignText)
    if (!/^[A-Za-z0-9]{0,7}$/.test(freeSignText)) {
      setTipText('You can enter 7 letters or numbers at most');
      setTipModal(true);
      return;
    }

    setFreeLoad(true);

    const punkContract = getConstract(PUNK_CONTRACT, PUNK_ABI, window.ethereum, account);

    let ownAddr = await punkContract.callStatic.punkIndexToAddress(String(punkIndex));

    if (account.toLowerCase() != ownAddr.toLowerCase()) {
      setFreeLoad(false);
      setTipText('CryptoPunks are not for free but will be sent randomly by the system');
      setTipModal(true);
    } else {
      createSignImg('free');
    }
  }

  function randomDraw() {
    if (randomLoad) return;

    if (!hasEthereum) {
      setTipText('Please install metamask wallet and switch to the Main network');
      setTipModal(true);
      return;
    }

    if (chainId != 4) {
      setTipText('Please switch to the Main network');
      setTipModal(true);
      return;
    }

    if (!/^[A-Za-z0-9]{0,7}$/.test(signText)) {
      setTipText('You can enter 7 letters or numbers at most');
      setTipModal(true);
      return;
    }

    setRandomLoad(true);
    createSignImg('random');
  }


  async function updateDraw() {
    if (updateLoad) return;

    if (!hasEthereum) {
      setTipText('Please install metamask wallet and switch to the Main network');
      setTipModal(true);
      return;
    }

    if (chainId != 4) {
      setTipText('Please switch to the Main network');
      setTipModal(true);
      return;
    }

    if (!uBeforeSignText) {
      setTipText('Please enter your signature');
      setTipModal(true);
      return;
    }

    setUpdateLoad(true);

    const contract = getConstract(SIGN_CONTRACT, SIGN_ABI, window.ethereum, account);

    if (updateTab === 0) {
      if (!/^[A-Za-z0-9]{0,7}$/.test(uSignText)) {
        setTipText('You can enter 7 letters or numbers at most');
        setTipModal(true);
        setUpdateLoad(false);
        return;
      }
      let cap = await contract.callStatic.getpunksHat(uBeforeSignText);

      createSignImg('update', cap.toNumber());
    }

    if (updateTab === 1) {
      contract.updatePunksTwitter(uBeforeSignText, uTwitter).then(res => {
        setUpdateLoad(false);
        setTipText('The transaction has been sent on the chain');
        setTipModal(true);
      }).catch(err => setUpdateLoad(false))
    }

    if (updateTab === 2) {
      contract.updatePunksNote(uBeforeSignText, uNote).then(res => {
        setUpdateLoad(false);
        setTipText('The transaction has been sent on the chain');
        setTipModal(true);
      }).catch(err => setUpdateLoad(false))
    }
  }

  return (
    <div className={sty.app}>
      <div className={cn(sty.header, 'flex-r')}>
        <div onClick={() => window.open('https://github.com/CryptoPunksSign')}>Github</div>
        <div onClick={() => window.open('https://mobile.twitter.com/CryptoPunksSign')}>Twitter</div>
        <div onClick={() => window.open('https://larvalabs.com/cryptopunks')}>CryptoPunks</div>
      </div>
      <div className={sty.nav}>
        <div className={cn('flex-m')}>
          <div className={cn(sty.title, 'flex-1')}>CryptoPunks-Sign</div>
          <div className={cn(sty.account, 'tr')}>
            <div style={{ marginRight: 10 }} className={sty.outer}>{ethBalance}ETH</div>
            <div className={sty.outer}>
              Account: {account || 'Disconnect'}</div>
          </div>
        </div>
        <div className={sty.desc}>CryptoPunksSign add signature attributes to the original CryptoPunks 10,000 punk avatars, and users who hold cryptopunks can claim them for free. Users with CryptoPunksSign can change their signature and bind it to Twitter.</div>
      </div>
      <div className={sty.banner}>
        <img src={bannerImg} alt="" />
      </div>
      <div className={cn(sty.apply, 'flex-m flex-j')}>
        <div className={sty.cardShow}>
          <div className={cn(sty.row, 'flex-m flex-j')}>
            <img src={headImg.head_1} alt="" />
            <img src={headImg.head_2} alt="" />
            <img src={headImg.head_3} alt="" />
            <img src={headImg.head_4} alt="" />
          </div>
          <div className={cn(sty.row, 'flex-m flex-j')}>
            <img src={headImg.head_5} alt="" />
            <img src={headImg.head_6} alt="" />
            <img src={headImg.head_7} alt="" />
            <img src={headImg.head_8} alt="" />
          </div>
          <div className={cn(sty.row, 'flex-m flex-j')}>
            <img src={headImg.head_9} alt="" />
            <img src={headImg.head_10} alt="" />
            <img src={headImg.head_11} alt="" />
            <img src={headImg.head_12} alt="" />
          </div>
          <div className={cn(sty.row, 'flex-m flex-j')}>
            <img src={headImg.head_13} alt="" />
            <img src={headImg.head_14} alt="" />
            <img src={headImg.head_15} alt="" />
            <img src={headImg.head_16} alt="" />
          </div>
        </div>
        <div className={sty.sideBox}>
          <div className={cn(sty.title, 'tc')}>Claim Your Punk</div>
          <div className={cn(sty.inputBox, sty.require, 'flex flex-j')}>
            <input value={punkIndex} onChange={e => setPunkIndex(e.target.value)} placeholder='The number of CryptoPunks you own(such as "002")' type="text" />
          </div>
          <div className={sty.inputBox}>
            <input value={freeSignText} onChange={e => setFreeSignText(e.target.value)} placeholder='Enter the signature' type="text" />
          </div>
          <div className={sty.inputBox}>
            <input style={{ width: '100%' }} value={freeTwitter} onChange={e => setFreeTwitter(e.target.value)} placeholder='Enter a Twitter handle' type="text" />
          </div>
          <div className={sty.inputBox}>
            <input style={{ width: '100%' }} value={freeNote} onChange={e => setFreeNote(e.target.value)} placeholder='Add descriptions： Such as Bob Love Alice forever' type="text" />
          </div>
          <div className={sty.tip}>
            <div className={sty.s}>Tip:</div>
            <div>1.The first 100 users receive the ticket free of charge</div>
            <div>2.After 100 tickets, the cost of each is 0.01 ETH. With the increase of the number of people, the cost gradually increases, increasing by 0.01 ETH per 100 tickets</div>
            <div>3.Users with encrypted punks can receive the corresponding signed version free of charge</div>
            <div>4.Add Note: Get any graffiti you can put on your CryptoPunks-Sign, input any string, and make it your expression tool</div>
          </div>

          <button onClick={freeDraw} className={cn(sty.btn, 'flex-m flex-c')}>
            {
              freeLoad ? <Loading /> : <span>CLAIM</span>
            }
          </button>
        </div>
      </div>

      <div className={cn(sty.random, 'flex-m flex-j')}>
        <div className={sty.left}>
          <div className={sty.title}>newsletter</div>
          <div className={sty.subTitle}>Random Sampling</div>
          <div className={cn(sty.inputOuter, 'flex-m')}>
            <div className={cn(sty.inputBox, 'flex-1')}>
              <input value={signText} onChange={(e) => setSignText(e.target.value)} className='flex-1' placeholder='Enter the signature' type="text" />
              <input value={signTwitter} onChange={(e) => setSignTwitter(e.target.value)} className='flex-1' placeholder='Enter a Twitter handle' type="text" />
              <input value={signNote} onChange={(e) => setSignNote(e.target.value)} className='flex-1' placeholder='Add descriptions(Bob Love)' type="text" />
            </div>

            <button onClick={randomDraw} className={cn(sty.btn, 'flex-m flex-c')}>
              {
                randomLoad ? <Loading /> : <span>→</span>
              }
            </button>
          </div>
        </div>
        <div className={sty.side}>
          <img src={radomImg} alt="" />
        </div>
      </div>

      <div className={cn(sty.update, 'flex flex-j')}>
        <div className={sty.left}>
          <div className={sty.title}>Update Signature</div>
          <div className={sty.desc}>Signature update: The signature can be updated through smart contract to generate a new signature without changing other information. Changing the signature requires a rename fee, and other information updates do not require additional fees</div>
          <div className={sty.desc}>Twitter update: The Twitter handle can be updated through a smart contract to generate a new Twitter handle without changing other information</div>
          <div className={sty.desc}>Update Note: You can do any graffiti on your CryptoPunks-Sign, and you can also update it through a smart contract to generate new information without changing other information</div>
        </div>
        <div className={sty.side}>
          <div className={cn(sty.tabs, 'flex-m')}>
            <div onClick={() => setUpdateTab(0)} className={cn(sty.tab, { [sty.active]: updateTab === 0 })}>update signature</div>
            <div onClick={() => setUpdateTab(1)} className={cn(sty.tab, { [sty.active]: updateTab === 1 })}>update twitter</div>
            <div onClick={() => setUpdateTab(2)} className={cn(sty.tab, { [sty.active]: updateTab === 2 })}>update note</div>
          </div>
          <div style={{ display: updateTab === 0 ? 'block' : 'none' }} className={cn(sty.inputOuter)}>
            <div className={cn(sty.inputBox, sty.require)}>
              <input value={uBeforeSignText} onChange={(e) => setUBeforeSignText(e.target.value)} className={cn('flex-1')} placeholder='The number of CryptoPunks-Sign you own(such as "1")' type="text" />
            </div>
            <div className={cn(sty.inputBox)}>
              <input value={uSignText} onChange={(e) => setUSignText(e.target.value)} className='flex-1' placeholder='Enter the signature' type="text" />
            </div>
          </div>

          <div style={{ display: updateTab === 1 ? 'block' : 'none' }} className={cn(sty.inputOuter)}>
            <div className={cn(sty.inputBox, sty.require)}>
              <input value={uBeforeSignText} onChange={(e) => setUBeforeSignText(e.target.value)} className='flex-1' placeholder='The number of CryptoPunks-Sign you own(such as "1")' type="text" />

            </div>
            <div className={cn(sty.inputBox)}>
              <input value={uTwitter} onChange={(e) => setUTwitter(e.target.value)} className='flex-1' placeholder='Enter a Twitter handle' type="text" />
            </div>
          </div>

          <div style={{ display: updateTab === 2 ? 'block' : 'none' }} className={cn(sty.inputOuter)}>
            <div className={cn(sty.inputBox, sty.require)}>
              <input value={uBeforeSignText} onChange={(e) => setUBeforeSignText(e.target.value)} className='flex-1' placeholder='The number of CryptoPunks-Sign you own(such as "1")' type="text" />

            </div>
            <div className={cn(sty.inputBox)}>
              <input value={uNote} onChange={(e) => setUNote(e.target.value)} className='flex-1' placeholder='Add descriptions(Bob Love)' type="text" />
            </div>
          </div>
          <button onClick={updateDraw} className={cn(sty.btn, 'flex-m flex-c')}>
            {
              updateLoad ? <Loading /> : <span>Update</span>
            }
          </button>
        </div>
      </div>
      {
        freeTime > 0 && <div className={sty.cData}>
          <div className={sty.number}>{freeTime}</div>
          <div className={sty.title}>Cryptopunks-sign users</div>

        </div>
      }


      <div className={sty.signed}>
        <div className={sty.title}>Encrypted punk signature that has been turned on</div>
        <div className={cn(sty.box, 'flex flex-w')}>
          {
            signList.map(e => (
              <div key={e.name} className={sty.outer}>
                <div className={sty.item}>
                  <img className={sty.image} src={e.image} alt="" />
                  <div className={sty.name}>{e.name}</div>
                  <div className={sty.twitter}>twitter:{e.twitter}</div>
                  <div className={sty.notes}>notes:{e.notes}</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <Modal show={tipModal} onHide={() => setTipModal(false)}>
        <div className={sty.accountModal}>
          {tipText}
        </div>
      </Modal>
    </div>
  );
}

export default App;
