import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
import ToastContainer from 'react-bootstrap/ToastContainer'

function AutohideToast({show, setShowToast, message, alertType}) {
  return (
    <ToastContainer className="pT-90 pR-25" position='top-end' style={{ zIndex: 800 }}>
      <Toast onClose={() => setShowToast(false)} show={show} bg={alertType || 'primary'} delay={4000} autohide className='text-white'>
        <Toast.Header>
          <strong className="me-auto">
            {alertType=='danger' ? 'Failure' : alertType=='success' ? 'Success' : 'Primary'}
          </strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default AutohideToast;