import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/userService';
import UserContext from '../../context/UserContext';

function RegistrationModal({ show, onClose }) {
  const [formData, setFormData] = useState({
    // nombre: '',
    // apellidos: '',
    // nombre_usuario: '',
    email: '',
    password: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { addUser } = useContext(UserContext); // Consumir el contexto
  const navigate = useNavigate();

  // Expresión para validar la contraseña
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };


  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    try {
      if (formData.email && formData.password) {

        if (!passwordRegex.test(formData.password)) {
          setError('La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.');
          return;
        }

        const response = await registerUser({
          // nombre: formData.nombre,
          // apellidos: formData.apellidos,
          // nombre_usuario: formData.nombre_usuario,
          email: formData.email,
          password: formData.password,
        });

        const { access_token } = response;


        localStorage.setItem('token', access_token);
        localStorage.setItem('userData', JSON.stringify({
          // nombre: formData.nombre,
          // apellidos: formData.apellidos,
          // nombre_usuario: formData.nombre_usuario,
          email: formData.email,
        }));


        addUser({
          // nombre: formData.nombre,
          // apellidos: formData.apellidos,
          // nombre_usuario: formData.nombre_usuario,
          email: formData.email,
          token: access_token,
        });

        setSuccess('Usuario registrado correctamente');


        setFormData({
          // nombre: '',
          // apellidos: '',
          // nombre_usuario: '',
          email: '',
          password: '',
          remember: false,
        });

        onClose();
        navigate('/profile');
      } else {
        setError('Todos los campos son obligatorios');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setError(error.response?.data?.error || 'Error al registrar el usuario');
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50 oswald-text">
      <div className="modal-dialog" style={{ borderRadius: '15px' }}>
        <div className="modal-content">
          {/* Encabezado */}
          <div className="modal-header" style={{ backgroundColor: '#F4A261' }}>
            <h5 className="modal-title text-black">REGISTRO</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* Cuerpo */}
          <div className="modal-body" style={{ backgroundImage: 'url("/Designer.jpg")' }}>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}

            {/* Correo */}
            <div className="d-flex gap-1">
              <h3 className="m-0"><i className="bi bi-at"></i></h3>
              <input
                type="email"
                name="email"
                placeholder="Correo"
                className="form-control mb-2"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            {/* Contraseña */}
            <div className="input-group mb-2">
              <div className="d-flex w-100 gap-1">
                <h3><i className="bi bi-key-fill"></i></h3>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Contraseña"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <button
                  className="btn"
                  style={{ backgroundColor: '#F4A261', borderColor: '#F4A261', color: 'white' }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                </button>
              </div>
            </div>

            {/* Recordar */}
            <div className="form-check my-2 text-start">
              <input
                type="checkbox"
                name="remember"
                className="form-check-input"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label className="form-check-label">Recordar contraseña</label>
            </div>

          </div>

          {/* Pie */}
          <div className="modal-footer" style={{ backgroundColor: '#F4A261' }}>
            <button className="button-login" onClick={handleSubmit}>
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Validación de Props
RegistrationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RegistrationModal;

