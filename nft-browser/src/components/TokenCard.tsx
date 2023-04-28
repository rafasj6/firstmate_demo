import { TokenInfo } from "../constants";
// const { TrashIcon } = require('react-heroicons');

interface TokenCardProps extends TokenInfo{
    deleteToken(tokenToDelete:TokenInfo):void
}
export default function TokenCard(props:TokenCardProps){    
    if (!props.collectionName) return  null
    return <div className="relative overlow-hidden flex flex-col rounded-lg w-[20rem] bg-gray-600 gap-3">
        <DeleteTokenFromSet/>
        <div className="overlow-hidden ">
            <img src={props.image}/>
        </div>
        <div className="flex flex-col px-6 pb-6 gap-3 ">
            <div className="flex justify-between">
                <label className="text-white text-lg">#{props.tokenId}</label> 
                <label className="text-white text-lg font-bold">{props.collectionName?.slice(0,20)}</label> 

            </div>

            <div className="flex justify-between items-end">
                {props.price? 
                    <PriceElement price={props.price.amount?.decimal}/>
                        : <label className="text-gray-200 ">Not for Sale</label> 
                }
                {props.lastBuy?.value!= undefined? 
                    <div className="flex gap-2 text-sm">
                        <label className="text-white ">Last Sale: </label> 
                        <PriceElement price={props.lastBuy?.value}/>
                    </div>
                :null}
            </div>
        </div>
    </div>

    function DeleteTokenFromSet(){
        return <div className="absolute top-2 right-2">
            {/* <TrashIcon></TrashIcon> */}
        </div>
    }

    function PriceElement(props:{price:string}){
        return <div className="flex items-center gap-1">
            <img className="w-4 h-4" src="https://marketplace.reservoir.tools/api/reservoir/ethereum/redirect/currency/0x0000000000000000000000000000000000000000/icon/v1"/>
            <label className="text-white">{props.price}</label> 
        </div>
    }
    
}