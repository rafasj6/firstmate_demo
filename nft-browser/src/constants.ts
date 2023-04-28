export interface TokenInfo extends BasicTokenInfo{
    image:string,
    collectionName:string,
    price?:any,
    lastBuy?:any
}

export interface BasicTokenInfo{
    collectionId:string
    tokenId:string
}

export const INITAL_TOKEN_SET: BasicTokenInfo[] = [
    { collectionId:"0x1f81520596ba9ae2b0e93fa0d63742781820b7a2",tokenId:"2"},
    { collectionId:"0x37a03d4af1d7046d1126987b20117a0fdcbf6535",tokenId:"882"},
    { collectionId:"0x4e171e0f14a9046e14b93221f31acd2ec4af8429",tokenId:"217"},
    { collectionId:"0x127eb7b87cbb33ade80961eb026996109a936a35",tokenId:"6"},
    { collectionId:"0x15bf7610a7d50541e865efa3adad434147a4e1a9",tokenId:"0"},
    { collectionId:"0x6d74b47e6a8830ea7691e499ff5511ddd070d444",tokenId:"2"},
    { collectionId:"0xfd09eb152263488dc5e4654d9f91f0aebee45423",tokenId:"239"},
    { collectionId:"0x6493a47ebd7e223c604f522c49fc858f42a93cbe",tokenId:"2"},
    { collectionId:"0xb74c9f1eccddefbef7c017b97bd3a2f24a0081f8",tokenId:"66"},
    { collectionId:"0x123958421d9b61815bce5a30a7d84a798336bb7f",tokenId:"21"},
    { collectionId:"0x5c685a3ebc751f36b2123c25f5c464d3b9964afc",tokenId:"340"},
]