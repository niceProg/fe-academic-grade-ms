"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
     open: boolean;
     onClose: () => void;
     message?: string;
}

export const SuccessModal = ({ open, onClose, message }: Props) => {
     return (
          <Transition show={open} as={Fragment}>
               <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                         <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                         <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                         >
                              <Dialog.Panel className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl">
                                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="flex flex-col items-center justify-center">
                                        <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                                        <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                                             Berhasil Disimpan!
                                        </Dialog.Title>
                                        <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">{message || "Data telah disimpan dengan sukses."}</p>
                                        <button onClick={onClose} className="mt-6 inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                                             Tutup
                                        </button>
                                   </motion.div>
                              </Dialog.Panel>
                         </Transition.Child>
                    </div>
               </Dialog>
          </Transition>
     );
};
