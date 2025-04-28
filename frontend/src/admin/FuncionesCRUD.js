import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FuncionesCRUD.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FuncionesCRUD({ onLogout }) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFuncion, setCurrentFuncion] = useState({
    id_funcion: '',
    descripcion: '',
    id_cargo: '',
    nombre_cargo: '',
    estado: 'Activo'
  });

  // Datos de ejemplo (simulando datos de la base de datos)
  const [funciones, setFunciones] = useState([
    { id_funcion: 1, descripcion: 'Desarrollar aplicaciones web', id_cargo: 1, nombre_cargo: 'Desarrollador', estado: 'Activo' },
    { id_funcion: 2, descripcion: 'Administrar bases de datos', id_cargo: 2, nombre_cargo: 'DBA', estado: 'Activo' },
    { id_funcion: 3, descripcion: 'Gestionar proyectos de desarrollo', id_cargo: 3, nombre_cargo: 'Gerente de Proyectos', estado: 'Inactivo' }
  ]);

  // Datos de cargos para el select
  const cargos = [
    { id_cargo: 1, nombre_cargo: 'Desarrollador' },
    { id_cargo: 2, nombre_cargo: 'DBA' },
    { id_cargo: 3, nombre_cargo: 'Gerente de Proyectos' },
    { id_cargo: 4, nombre_cargo: 'Analista' }
  ];

  const handleBackClick = () => {
    navigate('/admin');
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentFuncion({
      id_funcion: '',
      descripcion: '',
      id_cargo: '',
      nombre_cargo: '',
      estado: 'Activo'
    });
    setShowForm(true);
  };

  const handleEditClick = (funcion) => {
    setIsEditing(true);
    setCurrentFuncion({...funcion});
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar esta función?')) {
      // Aquí iría la lógica para eliminar de la base de datos
      // Por ahora, solo lo eliminamos del estado local
      setFunciones(funciones.filter(func => func.id_funcion !== id));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Actualizar función existente
      setFunciones(funciones.map(func => 
        func.id_funcion === currentFuncion.id_funcion ? currentFuncion : func
      ));
    } else {
      // Agregar nueva función
      const newId = Math.max(...funciones.map(func => func.id_funcion), 0) + 1;
      setFunciones([...funciones, {...currentFuncion, id_funcion: newId}]);
    }
    
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

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
                <label htmlFor="descripcion">Descripción:</label>
                <textarea 
                  id="descripcion" 
                  name="descripcion" 
                  value={currentFuncion.descripcion} 
                  onChange={handleInputChange} 
                  required 
                  rows="4"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="id_cargo">Cargo:</label>
                <select 
                  id="id_cargo" 
                  name="id_cargo" 
                  value={currentFuncion.id_cargo} 
                  onChange={handleInputChange} 
                  required
                >
                  <option value="">Seleccione un cargo</option>
                  {cargos.map(cargo => (
                    <option key={cargo.id_cargo} value={cargo.id_cargo}>
                      {cargo.nombre_cargo}
                    </option>
                  ))}
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
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
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
                <th>ID</th>
                <th>Descripción</th>
                <th>Cargo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {funciones.map(funcion => (
                <tr key={funcion.id_funcion}>
                  <td>{funcion.id_funcion}</td>
                  <td className="descripcion-cell">{funcion.descripcion}</td>
                  <td>{funcion.nombre_cargo}</td>
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
                      onClick={() => handleDeleteClick(funcion.id_funcion)}
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