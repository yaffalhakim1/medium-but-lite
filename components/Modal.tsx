import React, { Component, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface IModal {
  onClick?: () => void;
  openButton: ReactNode;
  modalTitle?: string;
  children?: ReactNode;
  modalDescription?: string;
  type?: "danger" | "success";
  modalButton: string;
  onSubmit?: () => void;
  openButtonClassname?: string;
}
const Modal = (props: IModal) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button onClick={openModal} className={props.openButtonClassname}>
        {props.openButton}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={() => closeModal()} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
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
              <Dialog.Panel className="modal-box m-5 rounded-md">
                <Dialog.Title className="font-bold text-lg">
                  {props.modalTitle}
                </Dialog.Title>
                <Dialog.Description className="mt-1 mb-6">
                  {props.modalDescription}
                </Dialog.Description>
                {props.children}

                <button
                  onClick={() => {
                    props.onSubmit && props.onSubmit();
                    setLoading(true);
                    closeModal();
                  }}
                  className={
                    props.type === "danger"
                      ? "btn btn-error text-white"
                      : "btn btn-primary text-white"
                  }
                >
                  {loading ? (
                    <div className="flex flex-wrap">Changing...</div>
                  ) : (
                    props.modalButton
                  )}
                </button>

                <button onClick={closeModal} className="btn capitalize ml-2">
                  Cancel
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
