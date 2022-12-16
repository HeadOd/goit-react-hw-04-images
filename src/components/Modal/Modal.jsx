import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ bigImg, onClose }) => {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    };
  }, [onClose]);

  function handleTarget(e) {
    if(e.currentTarget === e.target) {
      onClose();
    }
  }

  return createPortal(
    <div className="overlay" onClick={handleTarget}>
      <div className="modal">
        <img src={bigImg} alt="" />
      </div>
    </div>, 
    modalRoot,
  )
}
