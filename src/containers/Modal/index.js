import { Modal } from 'react-bootstrap';
import { AddForm } from '../../components';

export default function AddProduct(property) {
  const { showItem, setshowItem, label } = property;
  const handleClose = () => {
    setshowItem(false);
  };
  return (
    <Modal show={showItem} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New {label} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddForm label={label} />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}
