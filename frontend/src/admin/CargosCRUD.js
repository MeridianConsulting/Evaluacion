import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CRUD.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CargosCRUD({ onLogout }) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCargo, setCurrentCargo] = useState({
    id_cargo: '',
    nombre_cargo: '',
    descripcion_cargo: '',
    objetivo_cargo: '',
    proceso_gestion: ''
  });

  // Estado para los cargos cargados desde el backend
  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL base de la API
  const apiUrl = process.env.REACT_APP_API_BASE_URL || '';

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchCargos();
  }, []);

  // Función para obtener todos los cargos
  const fetchCargos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/cargos`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setCargos(result.data);
      } else {
        throw new Error(result.message || 'Error al cargar cargos');
      }
    } catch (error) {
      console.error('Error al cargar cargos:', error);
      setError(error.message || 'Error al cargar cargos');
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/admin');
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentCargo({
      id_cargo: '',
      nombre_cargo: '',
      descripcion_cargo: '',
      objetivo_cargo: '',
      proceso_gestion: ''
    });
    setShowForm(true);
  };

  const handleEditClick = (cargo) => {
    setIsEditing(true);
    setCurrentCargo({...cargo});
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este cargo?')) {
      try {
        const response = await fetch(`${apiUrl}/api/cargos/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || `Error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          // Actualizar el estado eliminando el cargo
          setCargos(cargos.filter(cargo => cargo.id_cargo !== id));
          alert('Cargo eliminado con éxito');
        } else {
          throw new Error(result.message || 'Error al eliminar cargo');
        }
      } catch (error) {
        console.error('Error al eliminar cargo:', error);
        alert(`Error al eliminar cargo: ${error.message}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCargo({...currentCargo, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const isCreateOperation = !isEditing;
      const url = isCreateOperation 
        ? `${apiUrl}/api/cargos` 
        : `${apiUrl}/api/cargos/${currentCargo.id_cargo}`;
      
      const method = isCreateOperation ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentCargo)
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || `Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        if (isCreateOperation) {
          // Obtener el cargo recién creado para añadirlo al estado
          const getResponse = await fetch(`${apiUrl}/api/cargos/${result.id}`);
          if (getResponse.ok) {
            const getData = await getResponse.json();
            if (getData.success) {
              setCargos([getData.data, ...cargos]);
            }
          } else {
            // Si no podemos obtener el cargo nuevo, recargamos todos
            fetchCargos();
          }
        } else {
          // Actualizar el cargo en el estado
          setCargos(cargos.map(cargo => 
            cargo.id_cargo === currentCargo.id_cargo ? currentCargo : cargo
          ));
        }
        
        setShowForm(false);
        alert(isCreateOperation ? 'Cargo creado con éxito' : 'Cargo actualizado con éxito');
      } else {
        throw new Error(result.message || `Error al ${isCreateOperation ? 'crear' : 'actualizar'} cargo`);
      }
    } catch (error) {
      console.error(`Error al ${isEditing ? 'actualizar' : 'crear'} cargo:`, error);
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
          <div className="loading">Cargando cargos...</div>
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
          <button onClick={fetchCargos}>Reintentar</button>
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
          <h1>Gestión de Cargos</h1>
          <button className="add-button" onClick={handleAddClick}>
            Agregar Cargo
          </button>
        </div>

        {showForm && (
          <div className="crud-form-container">
            <form className="crud-form" onSubmit={handleSubmit}>
              <h2>{isEditing ? 'Editar Cargo' : 'Nuevo Cargo'}</h2>
              
              <div className="form-group">
                <label htmlFor="nombre_cargo">Nombre del Cargo:</label>
                <input 
                  type="text" 
                  id="nombre_cargo" 
                  name="nombre_cargo" 
                  value={currentCargo.nombre_cargo} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="descripcion_cargo">Descripción:</label>
                <textarea 
                  id="descripcion_cargo" 
                  name="descripcion_cargo" 
                  value={currentCargo.descripcion_cargo || ''} 
                  onChange={handleInputChange} 
                  rows="3"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="objetivo_cargo">Objetivo del Cargo:</label>
                <textarea 
                  id="objetivo_cargo" 
                  name="objetivo_cargo" 
                  value={currentCargo.objetivo_cargo || ''} 
                  onChange={handleInputChange} 
                  rows="4"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="proceso_gestion">Proceso de Gestión:</label>
                <input 
                  type="text" 
                  id="proceso_gestion" 
                  name="proceso_gestion" 
                  value={currentCargo.proceso_gestion || ''} 
                  onChange={handleInputChange} 
                />
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
                <th>ID</th>
                <th>Nombre del Cargo</th>
                <th>Descripción</th>
                <th>Proceso de Gestión</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargos.map(cargo => (
                <tr key={cargo.id_cargo}>
                  <td>{cargo.id_cargo}</td>
                  <td>{cargo.nombre_cargo}</td>
                  <td className="descripcion-cell">{cargo.descripcion_cargo}</td>
                  <td>{cargo.proceso_gestion}</td>
                  <td className="acciones">
                    <button 
                      className="edit-button" 
                      onClick={() => handleEditClick(cargo)}
                    >
                      Editar
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDeleteClick(cargo.id_cargo)}
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

export default CargosCRUD;
