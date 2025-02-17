import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Modal = (props) => {
  const modalRef = useRef(null);

  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      props.onCloseRequested();
    }
  };

  return (
    props.isOpen && (
      <div
        className="bg-sky-500/10 fixed inset-0 flex justify-center items-center"
        onClick={handleOverlayClick}
      >
        <div ref={modalRef} className="bg-white p-5 rounded-2xl shadow-md w-96">
          <header className="flex justify-between items-center">
            <span className="text-lg font-semibold">{props.headerLabel}</span>
            <button
              onClick={props.onCloseRequested}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          </header>
          <div className="mt-4">{props.children}</div>
        </div>
      </div>
    )
  );
};

export default Modal;
