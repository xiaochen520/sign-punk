import { useState, useEffect } from 'react';
import mergeImages from './libs/mergeImages';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { create } from 'ipfs-http-client';
import sty from './App.module.scss';
import cn from 'classnames';
import { getConstract, getRandomInt, formatPunkIndex, dataURLtoFile } from './utils';
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

  //connect
  async function connect() {
    const addresses = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })

    const chainId = await window.ethereum.request({ method: 'eth_chainId' })

    setAccount(addresses[0]);
    setChainId(chainId);
  }

  //init metamsk
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setHasEthereum(true);
      connect();
    }
  }, []);


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
    if (!account) return;
    const contract = getConstract(SIGN_CONTRACT, SIGN_ABI, window.ethereum, account);

    contract.callStatic.getpunks().then(res => {
      setFreeTime(res.toNumber())
    });

  }, [account]);

  //random create
  async function randomCreate(contract, uri, capIndex) {
    let price = await contract.callStatic.getMintPrice();

    contract.mintCryptoPunksSign(capIndex, uri, signTwitter, signNote, { from: account, gasLimit: '990000', value: price }).then(res => {
      setRandomLoad(false);
      setTipText('交易已发送，正在链上进行');
      setTipModal(true);
    }).catch(err => setRandomLoad(false));
  }

  //free create
  function freeCreate(contract, uri, capIndex) {
    contract.cryptoPunksClaim(capIndex, punkIndex, uri, freeTwitter, freeNote, { from: account, gasLimit: '990000' }).then(res => {
      setFreeLoad(false);
      setTipText('交易已发送，正在链上进行');
      setTipModal(true);
    }).catch(err => setFreeLoad(false))
  }

  //update
  async function updateCreate(contract, uri) {
    let price = await contract.callStatic.getUpdateSignPrice();

    contract.updatePunksSign(uBeforeSignText, uri, { from: account, gasLimit: '990000', value: price }).then(res => {
      setUpdateLoad(false);
      setTipText('交易已发送，正在链上进行');
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
      console.log(imgUrl)
      const tokenURI = JSON.stringify({
        name: `${capText}#${number + 1}`,
        description: 'CryptoPunksSign adds signature attributes to the original CryptoPunks 10,000 punk avatars.users who hold cryptopunks can claim it for free.',
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
      setTipText('网络错误，需vpn');
      setTipModal(true);
      console.log('Error uploading file: ', error)
    }

    // setFinalSrc(b64);
  }

  async function freeDraw() {
    if (freeLoad) return;

    if (!hasEthereum) {
      setTipText('请先安装metamask钱包并切换到主网');
      setTipModal(true);
      return;
    }

    if (chainId != 4) {
      setTipText('请切换到主网');
      setTipModal(true);
      return;
    }

    if (!punkIndex) {
      alert('请输入punk编号');
      return;
    }

    if (!freeSignText) {
      alert('请输入签名');
      return;
    }

    setFreeLoad(true);

    const punkContract = getConstract(PUNK_CONTRACT, PUNK_ABI, window.ethereum, account);

    let ownAddr = await punkContract.callStatic.punkIndexToAddress(String(punkIndex));

    if (account.toLowerCase() != ownAddr.toLowerCase()) {
      setFreeLoad(false);
      alert('没有CryptoPunks，不可以免费领取，可以随机抽取');
    } else {
      createSignImg('free');
    }
  }

  function randomDraw() {
    if (randomLoad) return;

    if (!hasEthereum) {
      setTipText('请先安装metamask钱包并切换到主网');
      setTipModal(true);
      return;
    }

    if (chainId != 4) {
      setTipText('请切换到主网');
      setTipModal(true);
      return;
    }

    if (!signText) {
      alert('请输入签名');
      return;
    }

    setRandomLoad(true);
    createSignImg('random');
  }


  async function updateDraw() {
    if (updateLoad) return;

    if (!uBeforeSignText) {
      alert('请输入签名punk编号');
      return;
    }

    if (!uSignText) {
      alert('请输入签名');
      return;
    }
    setUpdateLoad(true);

    const contract = getConstract(SIGN_CONTRACT, SIGN_ABI, window.ethereum, account);
    let cap = await contract.callStatic.getpunksHat(uBeforeSignText);

    createSignImg('update', cap.toNumber());
  }

  return (
    <div className={sty.app}>
      <div className={sty.nav}>
        <div className={sty.title}>CryptoPunks-Sign</div>
        <div className={sty.desc}>10,000 unique collectible characters with proof of ownership stored on the Ethereum blockchain. The project that inspired the modern CryptoArt movement. Selected press and appearances include Mashable, CNBC, The Financial Times, Bloomberg, MarketWatch, The Paris Review, Salon, </div>
      </div>
      <div className={sty.banner}>
        <img src={bannerImg} alt="" />
      </div>
      <div className={cn(sty.apply, 'flex flex-j')}>
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
        </div>
        <div className={sty.sideBox}>
          <div className={cn(sty.title, 'tc')}>申领punk</div>
          <div className={cn(sty.inputBox, 'flex flex-j')}>
            <input value={punkIndex} onChange={e => setPunkIndex(e.target.value)} placeholder='请输入编号' type="text" />
            <input value={freeSignText} onChange={e => setFreeSignText(e.target.value)} placeholder='请输入签名' type="text" />
          </div>
          <div className={sty.inputBox}>
            <input style={{ width: '100%' }} value={freeNote} onChange={e => setFreeNote(e.target.value)} placeholder='请输入编号' type="text" />
          </div>
          <div className={sty.inputBox}>
            <input style={{ width: '100%' }} value={freeTwitter} onChange={e => setFreeTwitter(e.target.value)} placeholder='请输入编号' type="text" />
          </div>
          <div className={sty.tip}>
            <div>Tip:</div>
            <div>1.前100张用户免费领取</div>
            <div>2.100张以后每张领取的费用是0.01ETH，随着人数增加，费用逐渐增加，最后一张Punk是50ETH</div>
            <div>3.持有加密punks的用户，可以免费领取对应的签名版</div>
          </div>

          <button onClick={freeDraw} className={cn(sty.btn, 'flex-m flex-c')}>
            {
              freeLoad ? <Loading /> : <span>CLAIM</span>
            }
          </button>
        </div>
      </div>

      <div className={cn(sty.random, 'flex flex-j')}>
        <div className={sty.left}>
          <div className={sty.title}>newsletter</div>
          <div className={sty.subTitle}>随机抽取</div>
          <div className={cn(sty.inputOuter, 'flex-m')}>
            <div className={cn(sty.inputBox, 'flex-1')}>
              <input value={signText} onChange={(e) => setSignText(e.target.value)} className='flex-1' placeholder='输入签名' type="text" />
              <input value={signNote} onChange={(e) => setSignNote(e.target.value)} className='flex-1' placeholder='输入签名' type="text" />
              <input value={signTwitter} onChange={(e) => setSignTwitter(e.target.value)} className='flex-1' placeholder='输入签名' type="text" />
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

      <div className={sty.update}>
        <div className={cn(sty.inputOuter, 'flex-c')}>
          <div className={cn(sty.inputBox)}>
            <input value={uBeforeSignText} onChange={(e) => setUBeforeSignText(e.target.value)} className='flex-1' placeholder='输入签名punk标号' type="text" />
            <input value={uSignText} onChange={(e) => setUSignText(e.target.value)} className='flex-1' placeholder='更新签名' type="text" />
            <input value={uTwitter} onChange={(e) => setUTwitter(e.target.value)} className='flex-1' placeholder='twitter' type="text" />
            <input value={uNote} onChange={(e) => setUNote(e.target.value)} className='flex-1' placeholder='note' type="text" />
          </div>

        </div>
        <button onClick={updateDraw} className={cn(sty.btn, 'flex-m flex-c')}>
          {
            updateLoad ? <Loading /> : <span>Update</span>
          }
        </button>
      </div>
      {
        freeTime > 0 && <div className={sty.cData}>
          <div className={sty.title}>已经免费领取的加密朋克用户</div>
          <div className={sty.number}>{freeTime}</div>
        </div>
      }


      {/* <div className={sty.signed}>
        <div className={sty.title}>已经开启的加密签名</div>
        <div>
          <div>
            <img src="" alt="" />
            <div>Elon Mask</div>
          </div>
        </div>
      </div> */}

      <Modal show={tipModal} onHide={() => setTipModal(false)}>
        <div className={sty.accountModal}>
          {tipText}
        </div>
      </Modal>
    </div>
  );
}

export default App;
