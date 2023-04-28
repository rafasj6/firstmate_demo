import { BasicTokenInfo, TokenInfo } from "./constants";

const axios = require('axios');


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
        // highestBid:basicTokenInfo.tokens?.[0].market.topBid.price
    }
}

 async function getListingInfo(collectionId:string, tokenId:string){
    return await getReservoirEndpointData(
        "https://api.reservoir.tools/orders/asks/v4",
        {
            "token":`${collectionId}:${tokenId}`,
            "status":"active",
            "sortBy":"price",
            
        }
    )
}

 async function getBasicTokenInfo(collectionId:string, tokenId:string){
    return await getReservoirEndpointData(
        "https://api.reservoir.tools/tokens/v5",
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
// export async function createTokenSet(tokens:BasicTokenInfo[]){
//     let data = JSON.stringify({tokens:tokens.map((tokenInfo)=>`${tokenInfo.collectionId}:${tokenInfo.tokenId}`)});
//     let config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: "https://api.reservoir.tools/token-sets/v2",
//         headers: { 
//             'accept': '*/*', 
//             'x-api-key': process.env.REACT_APP_RESERVOIR_API_KEY
//         },
//         data:data
//     };
//     return axios.request(config)
//     .then((response:any) => {
//      return response.data;
//     })
//     .catch((error:Error) => {
//         console.log(error);
//         return error
//     });
// }