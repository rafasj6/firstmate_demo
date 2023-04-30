import { ethers } from "ethers";
import { TokenInfo } from "./constants";
import axios from 'axios'
import { Execute, getClient } from "@reservoir0x/reservoir-sdk";


export async function getTokenInfo( collectionId:string,tokenId:string): Promise<TokenInfo>{
    const [listingInfo, basicTokenInfo] = await Promise.all([
        getListingInfo(collectionId, tokenId),
        getBasicTokenInfo(collectionId, tokenId)
    ])

    return {
        tokenId:tokenId,
        collectionId:collectionId,
        image:basicTokenInfo.tokens?.[0]?.token?.image,
        price: listingInfo?.orders?.[0]?.price,
        lastBuy:basicTokenInfo.tokens?.[0]?.token?.lastBuy,
        collectionName:basicTokenInfo.tokens?.[0]?.token?.collection?.name
    }
}

 async function getListingInfo(collectionId:string, tokenId:string){
    return await getReservoirEndpointData(
        getReservoirBaseURL()+ "/orders/asks/v4",
        {
            "token":`${collectionId}:${tokenId}`,
            "status":"active",
            "sortBy":"price",
            
        }
    )
}

 async function getBasicTokenInfo(collectionId:string, tokenId:string){
    return await getReservoirEndpointData(
        getReservoirBaseURL()+ "/tokens/v5",
        {
            "tokens":[`${collectionId}:${tokenId}`],
            "includeTopBid": true,
            "includeDynamicPricing":true,
        }
    )
}


async function getReservoirEndpointData(url:string, params:any){
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: { 
            'accept': '*/*', 
            'x-api-key': process.env.REACT_APP_RESERVOIR_API_KEY
        },
        params:params
    };
    return axios.request(config)
    .then((response:any) => {
     return response.data;
    })
    .catch((error:Error) => {
        console.log(error);
        return error
    });
}

export async function purchaseToken(token:TokenInfo|undefined){
    if(!(window as any).ethereum || !token) return null

    await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);

    // Get the connected signer (account)
    const signer = provider.getSigner();

    await getClient()?.actions.buyToken({
        items: [{ 
             token: `${token.collectionId}:${token?.tokenId}`,
         }],
        signer,
        onProgress: (steps: Execute['steps']) => {
            console.log(steps)
        }
    })
}

export function isTestNet(){
    return process.env.REACT_APP_IS_TESTNET === "true"
}

export function getReservoirBaseURL(){
    return isTestNet()?
        "https://api-goerli.reservoir.tools"
        : "https://api.reservoir.tools"
}