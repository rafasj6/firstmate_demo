/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { ExclamationIcon } from "@heroicons/react/solid";
import ReactMarkdown from "react-markdown";

export enum ModalState {
  LOADING,
  SUCCESS,
  NEUTRAL,
  ERROR,
  WARNING,
}

export interface ModalProps {
  title: string;
  description: string;
  primaryButtonMessage: string;
  secondaryButtonMessage?: string;
  open: boolean;
  setOpen(open: boolean): void;
  secondaryButtonOnClick?(): void;
  primaryButtonOnClick(): void;
  state: ModalState;
  children?: React.ReactNode;
  isPrimaryButtonDisabled?: boolean;
  shouldMinimizeWidth?: boolean;
  readMoreDescription?: boolean;
  hideBackdrop?:boolean
}

export function Modal(props: ModalProps) {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto scrollbar-hide"
        onClose={props.setOpen}
      >
        <div className="flex items-center justify-center  pt-4 px-4 text-center block p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block align-middle h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 lg:translate-y-0 lg:scale-95"
            enterTo="opacity-100 translate-y-0 lg:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 lg:scale-100"
            leaveTo="opacity-0 translate-y-4 lg:translate-y-0 lg:scale-95"
          >
            <div
              style={{
                width: props.shouldMinimizeWidth ? "min-content" : "100%",
                maxWidth: props.shouldMinimizeWidth ? "" : "24rem",
                background:props.hideBackdrop? "": "white",
                boxShadow: props.hideBackdrop? "": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
              }}
              className="relative inline-block align-bottom  rounded-lg px-4 pt-5 pb-4 text-left transform transition-all lg:my-8 lg:align-middle lg:p-8"
            >
              <div>
                <TopIcon />
                <div
                  className="mt-6 lg:mt-5"
                  style={{
                    textAlign: props.readMoreDescription ? "left" : "center",
                  }}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-xl leading-6 font-medium text-gray-900"
                  >
                    {props.title}
                  </Dialog.Title>
                  <div className="mt-6 break-words">
                  <span>
                    <ReactMarkdown className="whitespace-pre-line text-md text-gray-500 overflow-x-hidden overflow-y-auto">
                    {props.description}
                    </ReactMarkdown></span> 
                            
                    <p className="mt-6">{props.children}</p>
                  </div>
                </div>
              </div>
              {props.secondaryButtonMessage ? (
                <div className="mt-5 lg:mt-6 lg:grid lg:grid-cols-2 lg:gap-3 lg:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full items-center inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:col-start-2 lg:text-md"
                    onClick={() => {
                      props.setOpen(true);
                      props.primaryButtonOnClick();
                    }}
                  >
                    {props.primaryButtonMessage}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full items-center inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:mt-0 lg:col-start-1 lg:text-md"
                    onClick={() => {
                      props.setOpen(true);
                      if (props.secondaryButtonOnClick)
                        props.secondaryButtonOnClick();
                    }}
                  >
                    {props.secondaryButtonMessage}
                  </button>
                </div>
              ) : props.primaryButtonMessage ? (
                <div className="mt-5 lg:mt-6">
                  <button
                    disabled={props.isPrimaryButtonDisabled}
                    type="button"
                    style={{
                      backgroundColor: props.isPrimaryButtonDisabled
                        ? "gray"
                        : "#4f46e5",
                    }}
                    className="inline-flex  items-center justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:text-md"
                    onClick={() => {
                      props.setOpen(false);
                      props.primaryButtonOnClick();
                    }}
                  >
                    {props.primaryButtonMessage}
                  </button>{" "}
                </div>
              ) : null}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );

  function TopIcon() {
    switch (props.state) {
      case ModalState.LOADING:
        return <Spinner radius={36}></Spinner>;
      case ModalState.NEUTRAL:
        return null;
      case ModalState.ERROR:
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12 ">
            <ExclamationIcon className="h-10 w-10 text-red-600" />
          </div>
        );
      case ModalState.WARNING:
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12 ">
            <ExclamationIcon className="h-10 w-10 text-yellow-400" />
          </div>
        );

      case ModalState.SUCCESS:
      default:
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12 ">
            <CheckIcon
              className="h-10 w-10 text-green-600"
              aria-hidden="true"
            />
          </div>
        );
    }
  }
}

interface SpinnerProps {
    radius: number|string;
    topMargin?: number;
  }
  
export function Spinner(props: SpinnerProps) {
    return <div className={`mx-auto flex items-center justify-center `}>
        <svg role="status" 
             className={`inline mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-300`}
             viewBox="0 0 100 101"
             fill="none" 
             xmlns="http://www.w3.org/2000/svg"
             style={{width:props.radius, height:props.radius}}>
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        </div>;
}