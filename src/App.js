import { useState, useEffect } from 'react';
import mergeImages from './libs/mergeImages';
import { formatUnits } from '@ethersproject/units';
import axios from 'axios';
import sty from './App.module.scss';
import cn from 'classnames';
import { getConstract, getRandomInt } from './utils';
import { PUNK_CONTRACT, PUNK_ABI, SIGN_CONTRACT, SIGN_ABI } from './constant';

import Modal from './components/Modal';

import bannerImg from './img/banner.png';
import radomImg from './img/radom-card.png';
import headImg from './img/head';
import capImg from './img/cap';


function App() {
  const [hasEthereum, setHasEthereum] = useState(false);
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState('');
  const [finalSrc, setFinalSrc] = useState('');
  const [netModal, setNetModal] = useState(false);
  const [punkIndex, setPunkIndex] = useState('');

  useEffect(() => {
    mergeImages(['https://img0.baidu.com/it/u=3038034683,3655090430&fm=26&fmt=auto&gp=0.jpg', 'https://img2.baidu.com/it/u=2534473183,1666218163&fm=26&fmt=auto&gp=0.jpg'], { crossOrigin: '', width: 600, height: 600 })
      .then(b64 => setFinalSrc(b64));
  }, []);

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

  //createImg
  async function createSignImg(punkImg) {
    let imgIndex = getRandomInt(1, 9);
    
    let b64 = await mergeImages(['https://storageapi.fleek.co/oxjasonpage-team-bucket/cryptopunks_photo/0.png', punkImg], { crossOrigin: '*' });

    console.log(2222, b64)
  }

  async function createPunk() {
    const contract = getConstract(SIGN_CONTRACT, SIGN_ABI, window.ethereum, account);

    let totalNum = await contract.callStatic.totalSupply();

    console.log(totalNum.toNumber())
    let punkData = await axios.get('https://cryptopunks.herokuapp.com/api/punks/1000');

    createSignImg(punkData.data.image);
    
  }

  async function freeDraw() {
    if (chainId != 4) {
      setNetModal(true);
      return;
    }

    const punkContract = getConstract(PUNK_CONTRACT, PUNK_ABI, window.ethereum, account);

    let ownAddr = await punkContract.callStatic.punkIndexToAddress(String(punkIndex));

    if(account !== ownAddr) {
      alert('没有CryptoPunks');
    } else {
      createPunk();
    }
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
            <input placeholder='请输入签名' type="text" />
          </div>

          <div className={sty.tip}>
            <div>Tip:</div>
            <div>1.前100张用户免费领取</div>
            <div>2.100张以后每张领取的费用是0.01ETH，随着人数增加，费用逐渐增加，最后一张Punk是50ETH</div>
            <div>3.持有加密punks的用户，可以免费领取对应的签名版</div>
          </div>

          <button onClick={freeDraw} className={sty.btn}>CLAIM</button>
        </div>
      </div>

      <div className={cn(sty.random, 'flex flex-j')}>
        <div className={sty.left}>
          <div className={sty.title}>newsletter</div>
          <div className={sty.subTitle}>随机抽取</div>
          <div className={cn(sty.inputBox, 'flex-m')}>
            <input className='flex-1' placeholder='输入签名' type="text" />
            <button onClick={createPunk} className={sty.btn}>→</button>
          </div>
        </div>
        <div className={sty.side}>
          <img src={radomImg} alt="" />
        </div>
      </div>

      <div className={sty.cData}>
        <div className={sty.title}>已经免费领取的加密朋克用户</div>
        <div className={sty.number}>1234</div>
      </div>

      <div className={sty.signed}>
        <div className={sty.title}>已经开启的加密签名</div>
        <div>
          <div>
            <img src="" alt="" />
            <div>Elon Mask</div>
          </div>
        </div>
      </div>

      <Modal show={netModal} onHide={() => setNetModal(false)}>
        <div className={sty.accountModal}>
          Unsupported network
        </div>
      </Modal>
    </div>
  );
}

export default App;
