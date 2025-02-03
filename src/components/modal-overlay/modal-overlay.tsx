import styles from './modal-overlay.module.css';

type ModalOverlayProps = {
  onClick: () => void;
}

function ModalOverlay({onClick}:ModalOverlayProps) {
  return (
    <div className={styles.Overlay} onClick={onClick}></div>
  );
}

export default ModalOverlay;