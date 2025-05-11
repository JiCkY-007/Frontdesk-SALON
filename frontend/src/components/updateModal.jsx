import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const UpdateModal = ({ isOpen, onClose, onSubmit }) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Approved");

  const handleConfirm = () => {
    onSubmit({ message, status });
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto font-sans">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all border border-[#3A59D1]">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold text-[#3A59D1] mb-4"
                >
                  Update Request
                </Dialog.Title>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#3A59D1] focus:border-[#3A59D1] text-sm"
                      placeholder="Enter your message..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <div className="mt-1 flex gap-2">
                      <button
                        className={`px-4 py-1 text-sm rounded-full border transition ${
                          status === "Approved"
                            ? "bg-[#3A59D1] text-white"
                            : "bg-white border-gray-300 text-gray-700"
                        }`}
                        onClick={() => setStatus("Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className={`px-4 py-1 text-sm rounded-full border transition ${
                          status === "Rejected"
                            ? "bg-red-500 text-white"
                            : "bg-white border-gray-300 text-gray-700"
                        }`}
                        onClick={() => setStatus("Rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm rounded-md bg-[#3A59D1] text-white hover:bg-[#2f4dbe]"
                    onClick={handleConfirm}
                  >
                    Update
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

export default UpdateModal;
