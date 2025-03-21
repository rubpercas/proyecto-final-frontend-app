import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import UserContext from '../context/UserContext';
import '../styles/Profile.css';
import Footer from '../components/layout/Footer';
import logo from '/logo-solo.png';

function Profile() {
  const { user, logout } = useContext(UserContext); // Consumir el contexto
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    nombre: '',
    apellidos: '',
    nombre_usuario: '',
    email: '',
    foto_url: '',
    fondo_url: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({
    nombre: '',
    apellidos: '',
    nombre_usuario: '',
    email: '',
    foto_url: '',
    fondo_url: ''
  });

  // Cargar datos de usuario desde el contexto o localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    try {
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        setTempData(parsedData);
      } else if (user) {
        setUserData(user);
        setTempData(user);
      }
    } catch (error) {
      console.error('Error al parsear los datos de usuario:', error);
      localStorage.removeItem('userData');
    }
  }, [user]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    setUserData(tempData);
    localStorage.setItem('userData', JSON.stringify(tempData));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if ((name === 'foto_url' || name === 'fondo_url') && files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        setTempData({ ...tempData, [name]: event.target.result });
      };
      fileReader.readAsDataURL(files[0]);
    } else {
      setTempData({ ...tempData, [name]: value });
    }
  };

  // Cerrar Sesión
  const handleLogout = () => {
    localStorage.removeItem('userData'); // Eliminar datos de localStorage
    localStorage.removeItem('token'); // Eliminar token
    logout(); // Limpiar el estado global en el contexto
    navigate('/'); // Redirigir al inicio
  };

  if (!userData.nombre && !userData.email) {
    return <p className="text-center">Cargando perfil...</p>;
  }

  return (
    <div className="d-flex flex-column oswald-text" style={{ minHeight: "100vh" }}>
      <div className="d-flex flex-grow-1">
        <Sidebar onSidebarClick={() => { }} />
        <div className="w-100 content">
          {/* Fondo del perfil */}
          <div
            className="profile-background"
            style={{
              backgroundImage: `url(${userData.fondo_url || '/emplatado-1-1030x577.webp'})`,
              widht: "100%",
              height: "40vh",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "4px solid #F4A261",
              position: "relative"
            }}
          >
            {/* Imagen de perfil */}
            <img
              src={userData.foto_url || '/foto-perfil-prueba.jpg'}
              alt="Perfil"
              className="profile-img"
              style={{
                position: "absolute",
                bottom: "-50px",
                right: "20px",
                borderRadius: "50%",
                width: "15vw",
                height: "15vw",
                minWidth: "100px",
                minHeight: "100px",
                border: "4px solid #F4A261",
                boxShadow: "0 4px 8px rgba(246, 120, 2, 0.5)"
              }}
            />
          </div>

          {/* Inputs para editar imágenes */}
          <div className="d-flex flex-wrap">
            <div className="profile-content px-4 py-3 text-center">
              {/* Información del usuario */}
              <div style={{ textAlign: "left", marginRight: "20px", maxWidth: "200px" }}>
                <div className="d-flex align-items-center justify-content-start">
                  <h3><i className="bi bi-person-fill me-3"></i></h3>
                  <h3>
                    {userData.nombre} {userData.apellidos}
                  </h3>
                </div>
                <div className="d-flex align-items-center justify-content-start">
                  <h3><i className="bi bi-at me-3"></i></h3>
                  <p className="text-muted">{userData.nombre_usuario}</p>
                </div>
                <div className="d-flex align-items-center justify-content-start">
                  <h3><i className="fa-regular fa-envelope me-3"></i></h3>
                  <p className="text-muted"> {userData.email}</p>
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="edit-images mx-auto flex-wrap mt-4 w-75" style={{ maxWidth: "600px" }}>
                <label htmlFor="fondo_url"><strong>Foto de portada</strong></label>
                <input
                  type="file"
                  name="fondo_url"
                  accept="image/*"
                  className="form-control text-start mb-3 mt-1"
                  onChange={handleChange}
                />
                <label htmlFor="fondo_url"><strong>Foto de perfil</strong></label>
                <input
                  type="file"
                  name="foto_url"
                  accept="image/*"
                  className="form-control mb-3 mt-1"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={tempData.nombre}
                  className="form-control mb-3"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="apellidos"
                  placeholder="Apellidos"
                  value={tempData.apellidos}
                  className="form-control mb-3"
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="nombre_usuario"
                  placeholder="Nombre de Usuario"
                  value={tempData.nombre_usuario}
                  className="form-control mb-3"
                  onChange={handleChange}
                />
              </div>
            )}


          </div>

          {/* Botones */}
          <div className="profile-actions mt-3 text-center ">
            {isEditing ? (
              <button className="button-green me-2" title="Guardar cambios" onClick={handleSave}>
                <i className="bi bi-floppy-fill"></i>
              </button>
            ) : (
              <button className="button-green me-2" title="Editar perfil" onClick={handleEdit}>
                <i className="bi bi-pencil-fill"></i>
              </button>
            )}
            <button className="button-red" title="Cerrar sesión" onClick={handleLogout}>
              <i className="bi bi-exclamation-circle-fill"></i>
            </button>
          </div>
        </div>
      </div>
      .

    </div>
  );
}

export default Profile;






