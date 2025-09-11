import React from 'react';

const EvaluationProgress = ({ estado, isManagerView = false }) => {
  // Función para obtener la descripción del estado
  const getDescripcionEstado = (estado) => {
    const estados = {
      'AUTOEVALUACION_PENDIENTE': 'Pendiente Autoevaluación',
      'AUTOEVALUACION_COMPLETADA': 'Pendiente Evaluación Jefe',
      'EVALUACION_JEFE_PENDIENTE': 'Pendiente Evaluación Jefe',
      'EVALUACION_JEFE_COMPLETADA': 'Pendiente Evaluación HSEQ',
      'HSEQ_PENDIENTE': 'Pendiente Evaluación HSEQ',
      'HSEQ_COMPLETADA': 'Evaluación HSEQ Completada',
      'EVALUACION_FINALIZADA': 'Evaluación Finalizada',
      'BORRADOR': 'Borrador',
      'COMPLETADA': 'Completada',
      'APROBADA': 'Aprobada'
    };
    return estados[estado] || estado;
  };

  // Función para obtener el porcentaje de progreso
  const getProgresoPorcentaje = (estado) => {
    const progresos = {
      'AUTOEVALUACION_PENDIENTE': 20,
      'AUTOEVALUACION_COMPLETADA': 40,
      'EVALUACION_JEFE_PENDIENTE': 40,
      'EVALUACION_JEFE_COMPLETADA': 60,
      'HSEQ_PENDIENTE': 60,
      'HSEQ_COMPLETADA': 80,
      'EVALUACION_FINALIZADA': 100,
      'BORRADOR': 10,
      'COMPLETADA': 80,
      'APROBADA': 100
    };
    return progresos[estado] || 0;
  };

  // Función para obtener la clase CSS del estado
  const getClaseEstado = (estado) => {
    const clases = {
      'AUTOEVALUACION_PENDIENTE': 'estado-pendiente',
      'AUTOEVALUACION_COMPLETADA': 'estado-progreso',
      'EVALUACION_JEFE_PENDIENTE': 'estado-progreso',
      'EVALUACION_JEFE_COMPLETADA': 'estado-progreso',
      'HSEQ_PENDIENTE': 'estado-progreso',
      'HSEQ_COMPLETADA': 'estado-completada',
      'EVALUACION_FINALIZADA': 'estado-finalizada',
      'BORRADOR': 'estado-borrador',
      'COMPLETADA': 'estado-completada',
      'APROBADA': 'estado-aprobada'
    };
    return clases[estado] || 'estado-desconocido';
  };

  const progreso = getProgresoPorcentaje(estado);
  const descripcion = getDescripcionEstado(estado);
  const claseEstado = getClaseEstado(estado);

  return (
    <div style={{
      background: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '20px',
      margin: '20px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ 
        margin: '0 0 15px 0', 
        color: '#333',
        fontSize: '16px',
        fontWeight: '600'
      }}>
        📊 Progreso de la Evaluación
      </h3>
      
      <div style={{ marginBottom: '15px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#555' }}>
            {descripcion}
          </span>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#666' }}>
            {progreso}%
          </span>
        </div>
        
        <div style={{
          width: '100%',
          height: '12px',
          backgroundColor: '#e9ecef',
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
          <div 
            style={{
              height: '100%',
              width: `${progreso}%`,
              background: progreso < 40 
                ? 'linear-gradient(90deg, #dc3545, #fd7e14)'
                : progreso < 80
                ? 'linear-gradient(90deg, #ffc107, #fd7e14)'
                : 'linear-gradient(90deg, #28a745, #20c997)',
              transition: 'width 0.5s ease',
              borderRadius: '6px'
            }}
          />
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: '#666'
      }}>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: progreso >= 20 ? '#28a745' : '#e9ecef',
            margin: '0 auto 4px',
            border: '2px solid white',
            boxShadow: '0 0 0 1px #ddd'
          }} />
          <span>Autoevaluación</span>
        </div>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: progreso >= 60 ? '#28a745' : '#e9ecef',
            margin: '0 auto 4px',
            border: '2px solid white',
            boxShadow: '0 0 0 1px #ddd'
          }} />
          <span>Evaluación Jefe</span>
        </div>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: progreso >= 80 ? '#28a745' : '#e9ecef',
            margin: '0 auto 4px',
            border: '2px solid white',
            boxShadow: '0 0 0 1px #ddd'
          }} />
          <span>Evaluación HSEQ</span>
        </div>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: progreso >= 100 ? '#28a745' : '#e9ecef',
            margin: '0 auto 4px',
            border: '2px solid white',
            boxShadow: '0 0 0 1px #ddd'
          }} />
          <span>Finalizada</span>
        </div>
      </div>

      {isManagerView && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '1px solid #bbdefb'
        }}>
          <small style={{ color: '#1976d2', fontSize: '12px' }}>
            💡 <strong>Nota:</strong> Como jefe directo, está completando la etapa 2 del proceso de evaluación.
          </small>
        </div>
      )}
    </div>
  );
};

export default EvaluationProgress;
