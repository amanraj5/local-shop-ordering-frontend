// ToastMessage.js
import React, { useEffect, useRef } from 'react';

const ToastMessage = ({ message, show, setShow, header = "Notification", background = "primary" }) => {
  const toastRef = useRef();

  useEffect(() => {
    if (show) {
      const bsToast = new window.bootstrap.Toast(toastRef.current);
      bsToast.show();
      bsToast._element.addEventListener('hidden.bs.toast', () => {
        setShow(false);
      });
    }
  }, [show, setShow]);

  return (
    <div
      ref={toastRef}
      className="toast position-fixed top-0 end-0 m-3"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ zIndex: 9999 }}
    >
      <div className={`toast-header bg-${background} text-white`}>
        <strong className="me-auto">{header}</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default ToastMessage;
