import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CRUD.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNotification } from '../components/NotificationSystem';

function EmpleadosCRUD({ onLogout, userRole }) {
  const { success, error: showError } = useNotification();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentEmpleado, setCurrentEmpleado] = useState({
    id_empleado: '',
    cedula: '',
    nombre: '',
    cargo: '',
    area: '',
    email: '',
    rol: 'empleado'
  });

  // URL base de la API
  const apiUrl = process.env.REACT_APP_API_BASE_URL || '';

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchEmpleados();
    fetchCargos();
  }, []);

  // Función para obtener todos los empleados
  const fetchEmpleados = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/employees`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setEmpleados(result.data);
      } else {
        throw new Error(result.message || 'Error al cargar empleados');
      }
    } catch (error) {
      console.error('Error al cargar empleados:', error);
      setError(error.message || 'Error al cargar empleados');
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener todos los cargos
  const fetchCargos = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/employees/cargos`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Respuesta de cargos:', result); // Debug
      
      if (result.success) {
        console.log('Cargos recibidos:', result.data); // Debug
        setCargos(result.data);
      } else {
        throw new Error(result.message || 'Error al cargar cargos');
      }
    } catch (error) {
      console.error('Error al cargar cargos:', error);
      // No mostramos error aquí para no interferir con la carga de empleados
    }
  };

  const handleBackClick = () => {
    navigate('/admin');
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentEmpleado({
      id_empleado: '',
      cedula: '',
      nombre: '',
      cargo: '',
      area: 'Administracion',
      email: '',
      rol: 'empleado'
    });
    setShowForm(true);
  };

  const handleEditClick = (empleado) => {
    setIsEditing(true);
    setCurrentEmpleado({...empleado});
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este empleado?')) {
      try {
        const response = await fetch(`${apiUrl}/api/employees/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          // Actualizar el estado eliminando el empleado
          setEmpleados(empleados.filter(emp => emp.id_empleado !== id));
          success('Empleado eliminado', 'Empleado eliminado con éxito');
        } else {
          throw new Error(result.message || 'Error al eliminar empleado');
        }
      } catch (error) {
        console.error('Error al eliminar empleado:', error);
        showError('Error al eliminar', `Error al eliminar empleado: ${error.message}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmpleado({...currentEmpleado, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const isCreateOperation = !isEditing;
      const url = isCreateOperation 
        ? `${apiUrl}/api/employees` 
        : `${apiUrl}/api/employees/${currentEmpleado.id_empleado}`;
      
      const method = isCreateOperation ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentEmpleado)
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        if (isCreateOperation) {
          // Obtener el empleado recién creado para añadirlo al estado
          const getResponse = await fetch(`${apiUrl}/api/employees/${result.id}`);
          if (getResponse.ok) {
            const getData = await getResponse.json();
            if (getData.success) {
              setEmpleados([getData.data, ...empleados]);
            }
          } else {
            // Si no podemos obtener el empleado nuevo, recargamos todos
            fetchEmpleados();
          }
        } else {
          // Actualizar el empleado en el estado
          setEmpleados(empleados.map(emp => 
            emp.id_empleado === currentEmpleado.id_empleado ? currentEmpleado : emp
          ));
        }
        
        setShowForm(false);
        success(
          isCreateOperation ? 'Empleado creado' : 'Empleado actualizado', 
          isCreateOperation ? 'Empleado creado con éxito' : 'Empleado actualizado con éxito'
        );
      } else {
        throw new Error(result.message || `Error al ${isCreateOperation ? 'crear' : 'actualizar'} empleado`);
      }
    } catch (error) {
      console.error(`Error al ${isEditing ? 'actualizar' : 'crear'} empleado:`, error);
      showError('Error de operación', `Error: ${error.message}`);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="crud-container">
        <Header onLogout={onLogout} userRole={userRole} />
        <main className="crud-main">
          <div className="loading">Cargando empleados...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="crud-container">
        <Header onLogout={onLogout} userRole={userRole} />
        <main className="crud-main">
          <div className="error">Error: {error}</div>
          <button onClick={fetchEmpleados}>Reintentar</button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="crud-container">
      <Header onLogout={onLogout} userRole={userRole} />
      
      <main className="crud-main">
        <div className="crud-header">
          <button className="back-button" onClick={handleBackClick}>
            Volver al Panel
          </button>
          <h1>Gestión de Empleados</h1>
          <button className="add-button" onClick={handleAddClick}>
            Agregar Empleado
          </button>
        </div>

        {showForm && (
          <div className="crud-form-container">
            <form className="crud-form" onSubmit={handleSubmit}>
              <h2>{isEditing ? 'Editar Empleado' : 'Nuevo Empleado'}</h2>
              
              <div className="form-group">
                <label htmlFor="cedula">Cédula:</label>
                <input 
                  type="text" 
                  id="cedula" 
                  name="cedula" 
                  value={currentEmpleado.cedula} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo:</label>
                <input 
                  type="text" 
                  id="nombre" 
                  name="nombre" 
                  value={currentEmpleado.nombre} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cargo">Cargo:</label>
                <select 
                  id="cargo" 
                  name="cargo" 
                  value={currentEmpleado.cargo} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar cargo...</option>
                  {cargos.length > 0 ? (
                    cargos.map(cargo => (
                      <option key={cargo.id_cargo} value={cargo.nombre_cargo}>
                        {cargo.nombre_cargo}
                      </option>
                    ))
                  ) : (
                    <option disabled>Cargando cargos...</option>
                  )}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="area">Área:</label>
                <select 
                  id="area" 
                  name="area" 
                  value={currentEmpleado.area} 
                  onChange={handleInputChange}
                >
                  <option value="Administracion">Administración</option>
                  <option value="Gestión de Proyectos">Gestión de Proyectos</option>
                  <option value="COMPANY MAN">COMPANY MAN</option>
                  <option value="PROYECTO PETROSERVICIOS">PROYECTO PETROSERVICIOS</option>
                </select>
              </div>
              
              {/* Campo teléfono eliminado */}
              
              <div className="form-group">
                <label htmlFor="email">Correo electrónico:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={currentEmpleado.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="rol">Rol:</label>
                <select 
                  id="rol" 
                  name="rol" 
                  value={currentEmpleado.rol} 
                  onChange={handleInputChange}
                >
                  <option value="empleado">Empleado</option>
                  <option value="jefe">Jefe</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              
              <div className="form-buttons">
                <button type="button" className="cancel-button" onClick={handleCancelForm}>
                  Cancelar
                </button>
                <button type="submit" className="save-button">
                  {isEditing ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="crud-table-container">
          {empleados.length === 0 ? (
            <p className="no-data">No hay empleados registrados</p>
          ) : (
            <table className="crud-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cédula</th>
                  <th>Nombre</th>
                  <th>Cargo</th>
                  <th>Área</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map(empleado => (
                  <tr key={empleado.id_empleado}>
                    <td>{empleado.id_empleado}</td>
                    <td>{empleado.cedula}</td>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.cargo}</td>
                    <td>{empleado.area}</td>
                    <td>{empleado.email}</td>
                    <td>
                      <span className={`role-badge ${empleado.rol}`}>
                        {empleado.rol === 'admin' ? 'Administrador' : 
                         empleado.rol === 'jefe' ? 'Jefe' : 'Empleado'}
                      </span>
                    </td>
                    <td className="acciones">
                      <button 
                        className="edit-button" 
                        onClick={() => handleEditClick(empleado)}
                      >
                        Editar
                      </button>
                      <button 
                        className="delete-button" 
                        onClick={() => handleDeleteClick(empleado.id_empleado)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default EmpleadosCRUD; 