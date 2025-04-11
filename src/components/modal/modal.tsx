import { createPortal } from 'react-dom';
import { ReactElement, useCallback, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

type ModalProps = {
  header: string;
  headerClass?: string;
  children: ReactElement;
  onClose: () => void;
}

const modalRoot = document.getElementById('modals') as HTMLElement;

function Modal({ header, headerClass, children, onClose }: ModalProps) {

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown, false);
    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
    };
  }, [onKeyDown]);

  return createPortal(
    (
      <>
        <div className={styles.Modal}>
          <header className={styles.Header}>
            <h1 className={headerClass}>{header}</h1>
            <CloseIcon type="primary" onClick={onClose} className={styles.Close} />
          </header>
          {children}
        </div>
        <ModalOverlay onClick={onClose} />
      </>
    ),
    modalRoot
  );
}

export default Modal;