import ReactDOM from 'react-dom';
import './Modal.css'
function Modal({ children }) {
    const modalRoot = document.getElementById('modal-root');
    return ReactDOM.createPortal(
      <div className="modal">
        <div className='modal-container'>
        {children}
        </div>
      </div>,
      modalRoot
    );
  }

export default Modal