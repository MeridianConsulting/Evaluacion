import React, { useState } from 'react';
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
    departamento: '',
    descripcion: '',
    estado: 'Activo'
  });

  // Datos de ejemplo (simulando datos de la base de datos)
  const [cargos, setCargos] = useState([
    { id_cargo: 1, nombre_cargo: 'Desarrollador', departamento: 'TI', descripcion: 'Desarrolla aplicaciones para la empresa', estado: 'Activo' },
    { id_cargo: 2, nombre_cargo: 'DBA', departamento: 'TI', descripcion: 'Administra las bases de datos', estado: 'Activo' },
    { id_cargo: 3, nombre_cargo: 'Gerente de Proyectos', departamento: 'Proyectos', descripcion: 'Gestiona los proyectos de desarrollo', estado: 'Inactivo' }
  ]);

  const handleBackClick = () => {
    navigate('/admin');
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentCargo({
      id_cargo: '',
      nombre_cargo: '',
      departamento: '',
      descripcion: '',
      estado: 'Activo'
    });
    setShowForm(true);
  };

  const handleEditClick = (cargo) => {
    setIsEditing(true);
    setCurrentCargo({...cargo});
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este cargo?')) {
      // Aquí iría la lógica para eliminar de la base de datos
      // Por ahora, solo lo eliminamos del estado local
      setCargos(cargos.filter(cargo => cargo.id_cargo !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCargo({...currentCargo, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Actualizar cargo existente
      setCargos(cargos.map(cargo => 
        cargo.id_cargo === currentCargo.id_cargo ? currentCargo : cargo
      ));
    } else {
      // Agregar nuevo cargo
      const newId = Math.max(...cargos.map(cargo => cargo.id_cargo), 0) + 1;
      setCargos([...cargos, {...currentCargo, id_cargo: newId}]);
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
                <label htmlFor="departamento">Departamento:</label>
                <input 
                  type="text" 
                  id="departamento" 
                  name="departamento" 
                  value={currentCargo.departamento} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea 
                  id="descripcion" 
                  name="descripcion" 
                  value={currentCargo.descripcion} 
                  onChange={handleInputChange} 
                  required 
                  rows="4"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="estado">Estado:</label>
                <select 
                  id="estado" 
                  name="estado" 
                  value={currentCargo.estado} 
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
                <th>Nombre del Cargo</th>
                <th>Departamento</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargos.map(cargo => (
                <tr key={cargo.id_cargo}>
                  <td>{cargo.id_cargo}</td>
                  <td>{cargo.nombre_cargo}</td>
                  <td>{cargo.departamento}</td>
                  <td className="descripcion-cell">{cargo.descripcion}</td>
                  <td>
                    <span className={`estado-badge ${cargo.estado.toLowerCase()}`}>
                      {cargo.estado}
                    </span>
                  </td>
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
