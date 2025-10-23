import './Dashboard.css';
import { Button, Offcanvas } from 'react-bootstrap';
import { useState } from 'react';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className='btn-standard-use2'
        onClick={handleShow}
      >
        Dashboard
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title
            id='offcanvasNavbarLabel-expand-lg'
            className='logo'
          >
            Dashboard
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar handleClose={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
