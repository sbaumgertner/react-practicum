import styles from './modal-overlay.module.css';

type ModalOverlayProps = {
  onClick: () => void;
}

function ModalOverlay({ onClick }: ModalOverlayProps) {
  return (
    <div className={styles.Overlay} onClick={onClick} data-testid="modal-overlay"></div>
  );
}

export default ModalOverlay;