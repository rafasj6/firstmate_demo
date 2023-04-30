import axios from "axios"
import { ModalState } from "./Modal"
export enum PurchaseActions {
    "PURCHASE",
    "SET_LOADING_PURCHASE_SCREEN",
    "SET_SUCESSFULL_PURCHASE_SCREEN",
    "SET_LOW_BALANCE_SCREEN",
    "OPEN_MODAL",
    "CLOSE_MODAL",
    "ERROR",
  }


export function reducer(state:any, action:any){
    switch(action.type){
        case PurchaseActions.PURCHASE:
              //   <Modal title={"Purchase This Item?"} 
    //   description={`${props.collectionName} #${props.tokenId}\n Price: ${props.price?.amount?.decimal} eth`} primaryButtonMessage={"Purchase"}
    //   open={open} 
    //   setOpen={setOpen} 
    //   primaryButtonOnClick={()=>purchaseToken(props) } 
    //   state={ModalState.NEUTRAL}            
    //    /> 
            return {
                ...state,
                open:true,
                modalDetails:{
                    title:"Purchase This Item?",
                    description:`${action.token.collectionName} #${action.token.tokenId}\n Price: ${action.token.price?.amount?.decimal} eth`,
                    primaryButtonMessage:"Purchase",
                    primaryButtonOnClick:action.onClick,
                    state:ModalState.NEUTRAL,
                }}
        case PurchaseActions.SET_LOADING_PURCHASE_SCREEN:
            return {
                ...state,
                open:true,
                modalDetails:{
                    title:"Processing Purchase...",
                    description:"Please wait a few moments",
                    primaryButtonMessage:"",
                    primaryButtonOnClick:()=> {},
                    state:ModalState.LOADING,
                }
            }
        case PurchaseActions.SET_SUCESSFULL_PURCHASE_SCREEN:
            return {
                ...state,
                open:true,
                modalDetails:{  
                    ...state.modalDetails,
                    title:"Purchase Successful",
                    description:"You may now access it at anytime in your wallet",
                    primaryButtonMessage:"OK" ,
                    primaryButtonOnClick:action.onClick,
                    state:ModalState.SUCCESS,
                }
            }
        case PurchaseActions.OPEN_MODAL:
            return {
                ...state,
                open:true,
                // isSardineOpen:false,
            }
        case PurchaseActions.CLOSE_MODAL:
            return {
                ...state,
                open:false,
        }
        case PurchaseActions.SET_LOW_BALANCE_SCREEN:
            return {
                ...state,
                open:true,
                modalDetails:{  
                    ...state.modalDetails,
                    title:"Your Balance is too low",
                    description:"You don't have enough in your balance for this purchase.",
                    primaryButtonMessage:"OK" ,
                    primaryButtonOnClick:action.onClick,
                    state:ModalState.ERROR,
                }
            }
        case PurchaseActions.ERROR:

            return {
                ...state,
                open:true,
                modalDetails:{  
                    ...state.modalDetails,
                    title:"ERROR",
                    description:"Something went wrong, please try again",
                    primaryButtonMessage:"OK" ,
                    primaryButtonOnClick:action.onClick,
                    state:ModalState.ERROR,
                }
            }
        default:
            return state
    }
}

function log(eventName:string, state:any){
      axios.get("https://0fk27t8nli.execute-api.us-east-1.amazonaws.com/default/log",
      {params:{
        "Wallet": state.wallet,
        "TokenId[]": state.listingInfo.tokenId,
        "Price": state.listingInfo.price,
        "Event Name":eventName,
        "Timestamp": (new Date(Date.now())).toLocaleString()
      }
    })}
