
import './App.css';
import {  getReservoirBaseURL, isTestNet } from './utils/utils';
import TokenCardGrid from './components/TokenCardGrid';
import AddTokenRow from './components/AddTokenRow';
import { TokensTrackingContextProvider } from './utils/tokenProvider';
import { createClient } from "@reservoir0x/reservoir-sdk"

function App() {
  createClient({
    chains: [{
      id: isTestNet()?5: 1,
      baseApiUrl: getReservoirBaseURL(),
      default: true,
      apiKey: process.env.REACT_APP_RESERVOIR_API_KEY
    }],
    source: "reservoir.market"
  });

 return <div className='w-screen pb-[30rem] p-[5rem] bg-black'>
    <TokensTrackingContextProvider>
      <AddTokenRow />
      <TokenCardGrid />
    </TokensTrackingContextProvider>

 </div>
}

export default App;
