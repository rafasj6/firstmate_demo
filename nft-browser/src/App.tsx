
import { useEffect, useState } from 'react';
import './App.css';
import {  getTokenInfo } from './utils';
import { INITAL_TOKEN_SET, TokenInfo } from './constants';
import TokenCardGrid from './components/TokenCardGrid';
import AddTokenRow from './components/AddTokenRow';
const axios = require('axios');

function App() {
  const [tokens, setTokens] = useState<TokenInfo[]>([])

  useEffect(()=>{
    async function load(){
      const _tokens = await Promise.all(INITAL_TOKEN_SET.map((basicTokenInfo)=>
      getTokenInfo(basicTokenInfo.collectionId,basicTokenInfo.tokenId)
        ))
      setTokens(_tokens)
      
    }
    load()
  },[])

  const removeToken = (tokenInfo:TokenInfo) => {
    const newArray = [...tokens];
    const filteredArray = newArray.filter(token =>
      token.collectionId !== tokenInfo.collectionId
      && token.tokenId !== tokenInfo.tokenId
    );
    setTokens( filteredArray );
  }
 return <div className='w-screen p-[10rem] bg-black'>
    <AddTokenRow addToken={(newToken:TokenInfo)=> setTokens([newToken,...tokens])}/>
    <TokenCardGrid deleteToken={(tokenToDelete:TokenInfo)=>removeToken(tokenToDelete)} tokens={tokens}/>
 </div>
}

export default App;
