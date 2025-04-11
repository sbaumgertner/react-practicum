import { useNavigate, useParams } from 'react-router-dom';
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import Modal from '../../components/modal/modal';

export function IngredientModal() {
  const navigate = useNavigate();
  const params = useParams();

  const onClose = () => {
    navigate('/');
  }

  return params.id && (
    <Modal header="Детали ингредиента" onClose={onClose}>
      <IngredientDetails id={params.id} />
    </Modal>
  );
}