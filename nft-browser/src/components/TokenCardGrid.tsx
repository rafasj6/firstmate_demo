import { TokenInfo } from "../constants";
import TokenCard from "./TokenCard";

interface TokenCardGridProps{
    tokens:TokenInfo[],
    deleteToken(tokenToDelete:TokenInfo):void
}
export default function TokenCardGrid(props:TokenCardGridProps){
    return <div className="flex flex-col items-center gap-10">
        <h1 className="text-white text-2xl">Your Favorite NFTS:</h1>
            <div className="grid grid-cols-3 gap-6">
                {props.tokens.map((tokenInfo)=>
                    <TokenCard 
                        deleteToken={props.deleteToken}
                        tokenId={tokenInfo.tokenId} 
                        collectionId={tokenInfo.collectionId}
                        image={tokenInfo.image}
                        price={tokenInfo.price}
                        lastBuy={tokenInfo.lastBuy}
                        collectionName={tokenInfo.collectionName}
                    />
                )}
            </div>
        </div>

}