import { useEffect, useState } from "react";
import { INITAL_TOKEN_SET, TokenInfo } from "../utils/constants";
import { useTokensTrackingContext } from "../utils/tokenProvider";
import TokenCard from "./TokenCard";
import { getTokenInfo } from "../utils/utils";


export default function TokenCardGrid(){
    const {deleteToken,tokensTracking,initializeTokens} = useTokensTrackingContext()
   
    
    useEffect(()=>{
      async function load(){
        const _tokens = await Promise.all(INITAL_TOKEN_SET.map((basicTokenInfo)=>
        getTokenInfo(basicTokenInfo.collectionId,basicTokenInfo.tokenId)
          ))
          initializeTokens(_tokens)
        
      }
      load()
    },[])
    

    return <div className="flex w-full flex-col items-center gap-10 pt-[5rem]">
        
        <h1 className="text-white text-2xl">Your Favorite NFTS:</h1>
            {tokensTracking.length==0?  <div className="flex p-2 rounded bg-white justify-center">
                    <label className="text-center">Add your favorite NFTs above!</label>
                    </div>:null}
            <div className="grid grid-cols-3 gap-6">
                { tokensTracking.map((tokenInfo)=>
                    <TokenCard 
                        deleteToken={deleteToken}
                        tokenId={tokenInfo.tokenId} 
                        collectionId={tokenInfo.collectionId}
                        image={tokenInfo.image}
                        price={tokenInfo.price}
                        lastBuy={tokenInfo.lastBuy}
                        collectionName={tokenInfo.collectionName}
                    />
                ) }
            </div>
        </div>

}