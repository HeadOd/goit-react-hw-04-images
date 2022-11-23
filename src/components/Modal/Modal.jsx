import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ bigImg, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, [])

  useEffect(() => {
    window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  }

  const handleBackdropClick = e => {
    if(e.currentTarget === e.target) {
      onClose();
    }
  }

  return createPortal(
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="modal">
        <img src={bigImg} alt="" />
      </div>
    </div>, 
    modalRoot,
  )
}

// export class OldModal extends Component {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown)
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown)
  // }

  // handleKeyDown = e => {
  //   if (e.code === 'Escape') {
  //     this.props.onClose();
  //   }
  // }

  // handleBackdropClick = e => {
  //   if(e.currentTarget === e.target) {
  //     this.props.onClose();
  //   }
  // }

  // render() {
  //   return createPortal(
  //     <div className="overlay" onClick={this.handleBackdropClick}>
  //       <div className="modal">
  //         <img src={this.props.bigImg} alt="" />
  //       </div>
  //     </div>, 
  //     modalRoot,
  //   )
  // }
// }