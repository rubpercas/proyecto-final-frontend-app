import { useState } from 'react';
import PropTypes from 'prop-types';
import { requestPasswordReset } from '../../services/authService';

function ForgotPasswordModal({ show, onClose }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setMessage('');
    setError('');
    try {
      const response = await requestPasswordReset(email);
      setMessage(response.message);
    } catch (err) {
      setError('Error al enviar el correo. Verifica el email ingresado.');
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: '#F4A261' }}>
            <h5>Recuperar Contraseña</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body d-flex justify-content-start align-items-center" style={{ backgroundImage: 'url("/Designer.jpg")' }}>
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-danger">{error}</p>}
            <h2 className="m-0"><i className="bi bi-at"></i></h2>
            <input
              type='email'
              placeholder="Ingresa tu correo"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="modal-footer" style={{ backgroundColor: '#F4A261' }}>
            <button className="button-login" onClick={handleSubmit}>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

ForgotPasswordModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ForgotPasswordModal;

