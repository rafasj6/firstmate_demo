
import { useContext, useEffect, useState } from 'react';
import './App.css';
import {  getTokenInfo } from './utils/utils';
import { INITAL_TOKEN_SET, TokenInfo } from './utils/constants';
import TokenCardGrid from './components/TokenCardGrid';
import AddTokenRow from './components/AddTokenRow';
import { TokensTrackingContext, TokensTrackingContextProvider,useTokensTrackingContext } from './utils/tokenProvider';
import { createClient } from "@reservoir0x/reservoir-sdk"
const axios = require('axios');

function App() {
  createClient({
    chains: [{
      id: 1,
      baseApiUrl: 'https://api.reservoir.tools',
      default: true,
      apiKey: process.env.REACT_APP_RESERVOIR_API_KEY
    }],
    source: "dev.reservoir.market"
  });

 return <div className='w-screen pb-[30rem] p-[5rem] bg-black'>
    <TokensTrackingContextProvider>
      <AddTokenRow />
      <TokenCardGrid />
    </TokensTrackingContextProvider>

 </div>
}

export default App;
