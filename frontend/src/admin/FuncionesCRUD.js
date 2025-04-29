import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CRUD.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FuncionesCRUD({ onLogout }) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFuncion, setCurrentFuncion] = useState({
    id_cargo: '',
    titulo_funcion: 'Función',
    descripcion_funcion: '',
    tipo_funcion: 'Específica',
    estado: 'ACTIVO'
  });

  // Estado para las funciones cargadas desde el backend
  const [funciones, setFunciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado para cargos disponibles
  const [cargos, setCargos] = useState([]);
  const [cargosLoading, setCargosLoading] = useState(true);

  // URL base de la API
  const apiUrl = process.env.REACT_APP_API_BASE_URL || '';

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchFunciones();
    fetchCargos();
  }, []);

  // Función para obtener todas las funciones
  const fetchFunciones = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/funciones`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setFunciones(result.data);
      } else {
        throw new Error(result.message || 'Error al cargar funciones');
      }
    } catch (error) {
      console.error('Error al cargar funciones:', error);
      setError(error.message || 'Error al cargar funciones');
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener todos los cargos
  const fetchCargos = async () => {
    try {
      setCargosLoading(true);
      // Esta ruta debería adaptarse a la API que proporciona la lista de cargos
      const response = await fetch(`${apiUrl}/api/cargos`);
      
      if (!response.ok) {
        // Si no hay endpoint específico para cargos, podemos usar datos de ejemplo
        setCargos([
          { id_cargo: 1, nombre_cargo: 'Desarrollador' },
          { id_cargo: 2, nombre_cargo: 'DBA' },
          { id_cargo: 3, nombre_cargo: 'Gerente de Proyectos' },
          { id_cargo: 4, nombre_cargo: 'Analista' }
        ]);
        setCargosLoading(false);
        return;
      }
      
      const result = await response.json();
      
      if (result.success) {
        setCargos(result.data);
      } else {
        // Si no hay datos, usamos los datos de ejemplo
        setCargos([
          { id_cargo: 1, nombre_cargo: 'Desarrollador' },
          { id_cargo: 2, nombre_cargo: 'DBA' },
          { id_cargo: 3, nombre_cargo: 'Gerente de Proyectos' },
          { id_cargo: 4, nombre_cargo: 'Analista' }
        ]);
      }
    } catch (error) {
      console.error('Error al cargar cargos:', error);
      // Si hay un error, usamos los datos de ejemplo
      setCargos([
        { id_cargo: 1, nombre_cargo: 'Desarrollador' },
        { id_cargo: 2, nombre_cargo: 'DBA' },
        { id_cargo: 3, nombre_cargo: 'Gerente de Proyectos' },
        { id_cargo: 4, nombre_cargo: 'Analista' }
      ]);
    } finally {
      setCargosLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/admin');
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentFuncion({
      id_cargo: '',
      titulo_funcion: 'Función',
      descripcion_funcion: '',
      tipo_funcion: 'Específica',
      estado: 'ACTIVO'
    });
    setShowForm(true);
  };

  const handleEditClick = (funcion) => {
    setIsEditing(true);
    setCurrentFuncion({...funcion});
    setShowForm(true);
  };

  const handleDeleteClick = async (hojaFunciones) => {
    if (window.confirm('¿Está seguro que desea eliminar esta función?')) {
      try {
        const response = await fetch(`${apiUrl}/api/funciones/hoja/${hojaFunciones}`, {
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
          // Actualizar el estado eliminando la función
          setFunciones(funciones.filter(func => func.hoja_funciones !== hojaFunciones));
          alert('Función eliminada con éxito');
        } else {
          throw new Error(result.message || 'Error al eliminar función');
        }
      } catch (error) {
        console.error('Error al eliminar función:', error);
        alert(`Error al eliminar función: ${error.message}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'id_cargo') {
      const selectedCargo = cargos.find(cargo => cargo.id_cargo === parseInt(value));
      setCurrentFuncion({
        ...currentFuncion, 
        [name]: value,
        nombre_cargo: selectedCargo ? selectedCargo.nombre_cargo : ''
      });
    } else {
      setCurrentFuncion({...currentFuncion, [name]: value});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const isCreateOperation = !isEditing;
      const url = isCreateOperation 
        ? `${apiUrl}/api/funciones` 
        : `${apiUrl}/api/funciones/hoja/${currentFuncion.hoja_funciones}`;
      
      const method = isCreateOperation ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentFuncion)
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        if (isCreateOperation) {
          // Obtener la función recién creada para añadirla al estado
          const getResponse = await fetch(`${apiUrl}/api/funciones/hoja/${result.hoja_funciones}`);
          if (getResponse.ok) {
            const getData = await getResponse.json();
            if (getData.success) {
              setFunciones([getData.data, ...funciones]);
            }
          } else {
            // Si no podemos obtener la función nueva, recargamos todas
            fetchFunciones();
          }
        } else {
          // Actualizar la función en el estado
          setFunciones(funciones.map(func => 
            func.hoja_funciones === currentFuncion.hoja_funciones ? currentFuncion : func
          ));
        }
        
        setShowForm(false);
        alert(isCreateOperation ? 'Función creada con éxito' : 'Función actualizada con éxito');
      } else {
        throw new Error(result.message || `Error al ${isCreateOperation ? 'crear' : 'actualizar'} función`);
      }
    } catch (error) {
      console.error(`Error al ${isEditing ? 'actualizar' : 'crear'} función:`, error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="crud-container">
        <Header onLogout={onLogout} />
        <main className="crud-main">
          <div className="loading">Cargando funciones...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="crud-container">
        <Header onLogout={onLogout} />
        <main className="crud-main">
          <div className="error">Error: {error}</div>
          <button onClick={fetchFunciones}>Reintentar</button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="crud-container">
      <Header onLogout={onLogout} />
      
      <main className="crud-main">
        <div className="crud-header">
          <button className="back-button" onClick={handleBackClick}>
            Volver al Panel
          </button>
          <h1>Gestión de Funciones</h1>
          <button className="add-button" onClick={handleAddClick}>
            Agregar Función
          </button>
        </div>

        {showForm && (
          <div className="crud-form-container">
            <form className="crud-form" onSubmit={handleSubmit}>
              <h2>{isEditing ? 'Editar Función' : 'Nueva Función'}</h2>
              
              <div className="form-group">
                <label htmlFor="id_cargo">Cargo:</label>
                <select 
                  id="id_cargo" 
                  name="id_cargo" 
                  value={currentFuncion.id_cargo} 
                  onChange={handleInputChange} 
                  required
                  disabled={isEditing} // No permitir cambiar el cargo al editar
                >
                  <option value="">Seleccione un cargo</option>
                  {cargosLoading ? (
                    <option value="" disabled>Cargando cargos...</option>
                  ) : (
                    cargos.map(cargo => (
                      <option key={cargo.id_cargo} value={cargo.id_cargo}>
                        {cargo.nombre_cargo}
                      </option>
                    ))
                  )}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="titulo_funcion">Título:</label>
                <input 
                  type="text" 
                  id="titulo_funcion" 
                  name="titulo_funcion" 
                  value={currentFuncion.titulo_funcion} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="descripcion_funcion">Descripción:</label>
                <textarea 
                  id="descripcion_funcion" 
                  name="descripcion_funcion" 
                  value={currentFuncion.descripcion_funcion} 
                  onChange={handleInputChange} 
                  required 
                  rows="4"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="tipo_funcion">Tipo:</label>
                <select 
                  id="tipo_funcion" 
                  name="tipo_funcion" 
                  value={currentFuncion.tipo_funcion} 
                  onChange={handleInputChange}
                >
                  <option value="Específica">Específica</option>
                  <option value="General">General</option>
                  <option value="Otra">Otra</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="estado">Estado:</label>
                <select 
                  id="estado" 
                  name="estado" 
                  value={currentFuncion.estado} 
                  onChange={handleInputChange}
                >
                  <option value="ACTIVO">Activo</option>
                  <option value="INACTIVO">Inactivo</option>
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
          <table className="crud-table">
            <thead>
              <tr>
                <th>ID Cargo</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {funciones.map(funcion => (
                <tr key={funcion.hoja_funciones}>
                  <td>{funcion.id_cargo}</td>
                  <td>{funcion.titulo_funcion}</td>
                  <td className="descripcion-cell">{funcion.descripcion_funcion}</td>
                  <td>{funcion.tipo_funcion}</td>
                  <td>
                    <span className={`estado-badge ${funcion.estado.toLowerCase()}`}>
                      {funcion.estado}
                    </span>
                  </td>
                  <td className="acciones">
                    <button 
                      className="edit-button" 
                      onClick={() => handleEditClick(funcion)}
                    >
                      Editar
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDeleteClick(funcion.hoja_funciones)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FuncionesCRUD; 