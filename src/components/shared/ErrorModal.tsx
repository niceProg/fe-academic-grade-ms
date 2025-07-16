"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

interface Props {
     open: boolean;
     onClose: () => void;
     message: string;
}

export const ErrorModal = ({ open, onClose, message }: Props) => {
     return (
          <Transition appear show={open} as={Fragment}>
               <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                         <div className="flex min-h-full items-center justify-center p-4 text-center">
                              <Transition.Child
                                   as={Fragment}
                                   enter="ease-out duration-300"
                                   enterFrom="opacity-0 scale-95"
                                   enterTo="opacity-100 scale-100"
                                   leave="ease-in duration-200"
                                   leaveFrom="opacity-100 scale-100"
                                   leaveTo="opacity-0 scale-95"
                              >
                                   <Dialog.Panel as={motion.div} className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
                                        <div className="flex items-center gap-3 mb-4">
                                             <XCircle className="w-6 h-6 text-red-500" />
                                             <Dialog.Title as="h3" className="text-lg font-semibold text-gray-800">
                                                  Terjadi Kesalahan
                                             </Dialog.Title>
                                        </div>
                                        <p className="text-sm text-gray-600 whitespace-pre-line">{message}</p>

                                        <div className="mt-6 flex justify-end">
                                             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-md hover:bg-red-600">
                                                  Tutup
                                             </button>
                                        </div>
                                   </Dialog.Panel>
                              </Transition.Child>
                         </div>
                    </div>
               </Dialog>
          </Transition>
     );
};
