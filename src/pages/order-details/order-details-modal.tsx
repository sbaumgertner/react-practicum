import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Modal from '../../components/modal/modal';
import OrderData from '../../components/orders-list/order-data/order-data';

export function OrderDetailsModal() {
  const navigate = useNavigate();
  const { number } = useParams();
  const location = useLocation();
  const cleanPath = location.pathname.split('/').slice(0, -1).join('/');

  const onClose = () => {
    navigate(cleanPath);
  }

  return number && (
    <Modal header={`#${number}`} headerClass="text_type_digits-default" onClose={onClose}>
      <OrderData number={Number(number)} />
    </Modal>
  );
}