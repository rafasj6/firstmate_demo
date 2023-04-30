import { TokenInfo } from "../utils/constants";
import { TrashIcon } from "@heroicons/react/outline";
import { Modal, ModalState } from "./Modal";
import { useReducer, useState } from "react";
import { PurchaseActions, reducer } from "./TokenPurchaseStateManagement";
import { purchaseToken } from "../utils/utils";


interface TokenCardProps extends TokenInfo{
    deleteToken(tokenToDelete:TokenInfo):void
}
export default function TokenCard(props:TokenCardProps){    

    const BALANCE_LOW_MESSAGE = "Balance too low to proceed with transaction"
    const [state, dispatch] = useReducer(reducer,{
        isTermsAndConditionsOpen:false,
        open:false,
        modalDetails:{
          title:"",
          description:"",
          primaryButtonMessage:"",
          secondaryButtonMessage:"",
          primaryButtonOnClick:()=> {},
          secondaryButtonOnClick:()=> {},
          state:ModalState.LOADING,
          closeFunction:()=>{},
      }})    


  
    if (!props.collectionName) return  null
    

    return <div className="relative overlow-hidden flex flex-col rounded-lg w-[20rem] bg-gray-600 gap-3">
        <DeleteTokenFromSet/>
        <div className="overflow-hidden rounded-lg ">
            <img src={props.image}/>
        </div>
        <div className="flex flex-col px-6 pb-6 gap-3 ">
            <div className="flex justify-between">
                <label className="text-white text-lg">#{props.tokenId}</label> 
                <label className="text-white text-lg font-bold">{props.collectionName?.slice(0,20)}...</label> 

            </div>

            <div className="flex justify-around items-end">
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
            <div>
                {props.price? 
                    <button 
                        onClick={()=>dispatch({type: PurchaseActions.PURCHASE, token:props, onClick:async ()=>{
                            dispatch({type:PurchaseActions.SET_LOADING_PURCHASE_SCREEN}) 

                            await purchaseToken(props).then(()=>{
                                dispatch({
                                    type:PurchaseActions.SET_SUCESSFULL_PURCHASE_SCREEN,
                                    onClick:()=>dispatch(PurchaseActions.CLOSE_MODAL)})
                            }).catch((error)=>{
                                if (error.response.data.message === BALANCE_LOW_MESSAGE){
                                    dispatch({type:PurchaseActions.SET_LOW_BALANCE_SCREEN,
                                        onClick:()=>dispatch(PurchaseActions.CLOSE_MODAL)})
                                } else{
                                    dispatch({type:PurchaseActions.ERROR,
                                        onClick:()=>dispatch(PurchaseActions.CLOSE_MODAL)})
                                }
                            })
                        }})}
                        className="w-full bg-black hover:bg-blue-700 text-white font-bold  px-4 rounded-lg focus:outline-none focus:shadow-outline" type="submit">
                    Buy NFT
                    </button>
                :null}
            </div>
        </div>
        <Modal  
            {...state.modalDetails}
            setOpen={()=>dispatch({type:PurchaseActions.CLOSE_MODAL})}
            open={state.open}
        >  </Modal>
       
    </div>

    function DeleteTokenFromSet(){
        return <div className="absolute top-2 right-2">
            <TrashIcon onClick={()=>props.deleteToken(props)} color="white" className="w-8 h-8 cursor-pointer  bg-opacity-40 bg-black p-1 rounded"/>
        </div>
    }

    function PriceElement(props:{price:string}){
        return <div className="flex items-center gap-1">
            <img className="w-4 h-4" src="https://marketplace.reservoir.tools/api/reservoir/ethereum/redirect/currency/0x0000000000000000000000000000000000000000/icon/v1"/>
            <label className="text-white">{props.price}</label> 
        </div>
    }
    
}