import React from "react";

// Props recomendadas: rows, handleSelectChange, setRows, setFormTouched, getCalificationErrorStyle, calcularPromedioCompetencias
const CompetenciasTable = ({
  rows,
  handleSelectChange,
  setRows,
  setFormTouched,
  getCalificationErrorStyle,
  calcularPromedioCompetencias
}) => {
  const isManagerView = false;
  return (
    <>
<hr className="evaluation-hr"/>
        <section className="evaluation-section">
          <table className="evaluation-table">
            <thead>
              {/* Barra de título "COMPETENCIAS" con un ÚNICO gradiente */}
              <tr>
                <th
                  colSpan={5}
                  style={{
                    background: "linear-gradient(90deg, #1F3B73 0%, #0A0F1A 100%)",
                    color: "#FFFFFF",
                    padding: "0.8rem 1rem",
                    textAlign: "center",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    height: "28px",
                    borderBottom: "1px solid rgba(0,0,0,0.25)"
                  }}
                >
                  COMPETENCIAS
                </th>
              </tr>
              
              {/* Encabezado de columnas con color sólido y bordes sutiles */}
              <tr>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF", 
                  padding: "0.6rem 0.4rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: "20%"
                }}>COMPETENCIA</th>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF", 
                  padding: "0.6rem 0.4rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: "25%"
                }}>DEFINICIÓN DE LA COMPETENCIA</th>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF", 
                  padding: "0.6rem 0.4rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: "28%"
                }}>ASPECTO A EVALUAR</th>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF", 
                  padding: "0.6rem 0.4rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: "14%"
                }}>AUTOEVALUACIÓN</th>
                <th style={{ 
                  background: "#1E2A3A", 
                  color: "#FFFFFF", 
                  padding: "0.6rem 0.4rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: "24px",
                  borderTop: "1px solid #1E2A3A",
                  borderLeft: "1px solid #243447",
                  borderBottom: "1px solid #243447",
                  borderRight: "1px solid rgba(51,51,51,0.5)",
                  width: "11%"
                }}>JUSTIFICACIÓN EVALUADO</th>
                
              </tr>
            </thead>
            <tbody>
              {/* Fila con rowSpan para "Comunicación efectiva" y su definición */}
              <tr>
                <td
                  rowSpan={4}
                  style={{
                    backgroundColor: "#f5f5f5",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                    width: "12%",
                  }}
                >
                  COMUNICACIÓN <br /> EFECTIVA
                </td>
                <td
                  rowSpan={4}
                  style={{
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                    padding: "1rem",
                    width: "25%",
                  }}
                >
                  Establecer comunicación efectiva y positiva con superiores jerárquicos,
                  pares y clientes, tanto en la expresión escrita como verbal y gestual.
                </td>

                {/* Aspecto 1 */}
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[0].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[0].worker === 0 ? "" : rows[0].worker}
                    onChange={(e) => handleSelectChange(rows[0].id, "worker", e.target.value)}
                    style={getCalificationErrorStyle(rows[0].id, 'worker')}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[0].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[0].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                    
                  />
                </td>
                
              </tr>

              {/* Aspecto 2 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[1].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[1].worker === 0 ? "" : rows[1].worker}
                    onChange={(e) => handleSelectChange(rows[1].id, "worker", e.target.value)}
                    style={getCalificationErrorStyle(rows[1].id, 'worker')}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[1].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[1].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>

              {/* Aspecto 3 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[2].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[2].worker === 0 ? "" : rows[2].worker}
                    onChange={(e) => handleSelectChange(rows[2].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[2].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[2].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>

              {/* Aspecto 4 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[3].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[3].worker === 0 ? "" : rows[3].worker}
                    onChange={(e) => handleSelectChange(rows[3].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[3].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[3].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>
            <tr>
              <td colSpan={5} style={{ borderBottom: "1px solid #ccc", margin: 0, padding: 0 }}></td>
            </tr>

            {/* Nueva Competencia: Instrumentalidad de decisiones */}
              <tr>
                {/* Primera fila: fila con rowSpan para competencia y definición */}
                <td
                  rowSpan={2}
                  style={{
                    backgroundColor: "#f5f5f5",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                    width: "12%",
                  }}
                >
                  INSTRUMENTALIDAD DE <br /> DECISIONES
                </td>
                <td
                  rowSpan={2}
                  style={{
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                    padding: "1rem",
                    width: "25%",
                  }}
                >
                  Decidir sobre las acciones en las que es responsable con criterios
                  de economía, eficacia, eficiencia y transparencia de la decisión.
                </td>

                {/* Aspecto 1 */}
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[4].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[4].worker === 0 ? "" : rows[4].worker}
                    onChange={(e) => handleSelectChange(rows[4].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[4].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[4].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>

              {/* Segunda fila para el segundo aspecto */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[5].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[5].worker === 0 ? "" : rows[5].worker}
                    onChange={(e) => handleSelectChange(rows[5].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[5].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[5].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>
              <tr>
              <td colSpan={5} style={{ borderBottom: "1px solid #ccc", margin: 0, padding: 0 }}></td>
            </tr>

              {/* Nueva Competencia: Aporte profesional */}
              <tr>
                {/* Primera fila con rowSpan de 4 para el nombre y la definición de la competencia */}
                <td
                  rowSpan={4}
                  style={{
                    backgroundColor: "#f5f5f5",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                    width: "12%",
                  }}
                >
                  APORTE <br /> PROFESIONAL
                </td>
                <td
                  rowSpan={4}
                  style={{
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                    padding: "1rem",
                    width: "25%",
                  }}
                >
                  Poner a disposición de la administración sus saberes, experiencias previas,
                  asesorando la actualización de sus saberes expertos.
                </td>

                {/* Aspecto 1 */}
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[6].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[6].worker === 0 ? "" : rows[6].worker}
                    onChange={(e) => handleSelectChange(rows[6].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[6].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[6].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>

              {/* Fila 2 de la competencia: Aspecto 2 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[7].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[7].worker === 0 ? "" : rows[7].worker}
                    onChange={(e) => handleSelectChange(rows[7].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[7].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[7].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>

              {/* Fila 3 de la competencia: Aspecto 3 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[8].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[8].worker === 0 ? "" : rows[8].worker}
                    onChange={(e) => handleSelectChange(rows[8].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[8].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[8].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>

              {/* Fila 4 de la competencia: Aspecto 4 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[9].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[9].worker === 0 ? "" : rows[9].worker}
                    onChange={(e) => handleSelectChange(rows[9].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[9].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[9].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>
              <tr>
              <td colSpan={5} style={{ borderBottom: "1px solid #ccc", margin: 0, padding: 0 }}></td>
            </tr>

              {/* Nueva Competencia: Colaboración */}
              <tr>
                {/* Primera fila con rowSpan=3 para la competencia y su definición */}
                <td
                  rowSpan={3}
                  style={{
                    backgroundColor: "#f5f5f5",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                    width: "12%",
                  }}
                >
                  COLABORACIÓN
                </td>
                <td
                  rowSpan={3}
                  style={{
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                    padding: "1rem",
                    width: "25%",
                  }}
                >
                  Coopera con los demás con el fin de alcanzar los objetivos de la compañía.
                </td>

                {/* Aspecto 1 */}
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[10].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[10].worker === 0 ? "" : rows[10].worker}
                    onChange={(e) => handleSelectChange(rows[10].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[10].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[10].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>

              {/* Fila 2 de la competencia: Aspecto 2 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[11].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[11].worker === 0 ? "" : rows[11].worker}
                    onChange={(e) => handleSelectChange(rows[11].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[11].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[11].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>

              {/* Fila 3 de la competencia: Aspecto 3 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[12].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[12].worker === 0 ? "" : rows[12].worker}
                    onChange={(e) => handleSelectChange(rows[12].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[12].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[12].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>
              <tr>
              <td colSpan={5} style={{ borderBottom: "1px solid #ccc", margin: 0, padding: 0 }}></td>
            </tr>

              {/* Nueva Competencia: Relaciones interpersonales */}
              <tr>
                {/* Primera fila con rowSpan=3 para la competencia y su definición */}
                <td
                  rowSpan={3}
                  style={{
                    backgroundColor: "#f5f5f5",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                    width: "12%",
                  }}
                >
                  RELACIONES <br /> INTERPERSONALES
                </td>
                <td
                  rowSpan={3}
                  style={{
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                    padding: "1rem",
                    width: "25%",
                  }}
                >
                  Establecer y mantener relaciones de trabajo positivas, basadas en la comunicación
                  abierta y fluida y el respeto por los demás.
                </td>

                {/* Aspecto 1 */}
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[13].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[13].worker === 0 ? "" : rows[13].worker}
                    onChange={(e) => handleSelectChange(rows[13].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[13].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[13].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>

              {/* Fila 2 de la competencia: Aspecto 2 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[14].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[14].worker === 0 ? "" : rows[14].worker}
                    onChange={(e) => handleSelectChange(rows[14].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[14].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[14].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>

              {/* Fila 3 de la competencia: Aspecto 3 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[15].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[15].worker === 0 ? "" : rows[15].worker}
                    onChange={(e) => handleSelectChange(rows[15].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[15].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[15].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>
              <tr>
              <td colSpan={5} style={{ borderBottom: "1px solid #ccc", margin: 0, padding: 0 }}></td>
            </tr>

              {/* Nueva Competencia: Gestión de procedimientos */}
              <tr>
                {/* Primera fila con rowSpan=3 para la competencia y su definición */}
                <td
                  rowSpan={3}
                  style={{
                    backgroundColor: "#f5f5f5",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                    width: "12%",
                  }}
                >
                  GESTIÓN DE <br /> PROCEDIMIENTOS
                </td>
                <td
                  rowSpan={3}
                  style={{
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                    padding: "1rem",
                    width: "25%",
                  }}
                >
                  Desarrollar las tareas a cargo en el marco de los procedimientos vigentes
                  y proponer e introducir acciones para acelerar la entrega continua
                  y la productividad.
                </td>

                {/* Aspecto 1 */}
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[16].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[16].worker === 0 ? "" : rows[16].worker}
                    onChange={(e) => handleSelectChange(rows[16].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[16].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[16].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>

              {/* Fila 2 de la competencia: Aspecto 2 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[17].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[17].worker === 0 ? "" : rows[17].worker}
                    onChange={(e) => handleSelectChange(rows[17].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[17].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[17].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>

              {/* Fila 3 de la competencia: Aspecto 3 */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[18].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[18].worker === 0 ? "" : rows[18].worker}
                    onChange={(e) => handleSelectChange(rows[18].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[18].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[18].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>
              {/* Competencia: Cumplimiento de funciones del cargo */}
              <tr>
                <td
                  rowSpan={4}
                  style={{
                    backgroundColor: "#f5f5f5",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                    width: "12%",
                  }}
                >
                  CUMPLIMIENTO DE <br /> FUNCIONES DEL CARGO
                </td>
                <td
                  rowSpan={4}
                  style={{
                    backgroundColor: "#fff",
                    verticalAlign: "middle",
                    padding: "1rem",
                    width: "25%",
                  }}
                >
                  Asegurar la ejecución oportuna y con calidad de las funciones específicas del cargo, demostrando dominio técnico y alineación con los estándares establecidos.
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[19].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[19].worker === 0 ? "" : rows[19].worker}
                    onChange={(e) => handleSelectChange(rows[19].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[19].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[19].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[20].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  <select
                    className="rating-select"
                    value={rows[20].worker === 0 ? "" : rows[20].worker}
                    onChange={(e) => handleSelectChange(rows[20].id, "worker", e.target.value)}
                    
                  >
                    <option value="">1 - 5</option>
                    <option value="1">1 - No Cumple</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Parcial</option>
                    <option value="4">4 - Satisfactorio</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </td>
                
                <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                  <textarea
                    className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                    value={rows[20].justificacionTrabajador || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[20].id?{...r, justificacionTrabajador: e.target.value}:r));
                      setFormTouched(true);
                    }}
                  />
                </td>
                
              </tr>
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[21].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                    <select
                      className="rating-select"
                    value={rows[21].worker === 0 ? "" : rows[21].worker}
                    onChange={(e) => handleSelectChange(rows[21].id, "worker", e.target.value)}
                    >
                      <option value="">1 - 5</option>
                      <option value="1">1 - No Cumple</option>
                      <option value="2">2 - Regular</option>
                      <option value="3">3 - Parcial</option>
                      <option value="4">4 - Satisfactorio</option>
                      <option value="5">5 - Excelente</option>
                    </select>
                  </td>
                
                  <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                    <textarea
                      className="justificacion-textarea"
                    rows={2}
                    placeholder="Explique la calificación (si 5 o ≤2)"
                      value={rows[21].justificacionTrabajador || ''}
                      onChange={(e)=>{
                        setRows(prev=>prev.map(r=> r.id===rows[21].id?{...r, justificacionTrabajador: e.target.value}:r));
                        setFormTouched(true);
                      }}
                    />
                  </td>
                  
                </tr>
              {/* Fila 4 adicional para completar el grupo (rows[22]) */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[22].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                    <select
                      className="rating-select"
                      value={rows[22].worker === 0 ? "" : rows[22].worker}
                      onChange={(e) => handleSelectChange(rows[22].id, "worker", e.target.value)}
                    >
                      <option value="">1 - 5</option>
                      <option value="1">1 - No Cumple</option>
                      <option value="2">2 - Regular</option>
                      <option value="3">3 - Parcial</option>
                      <option value="4">4 - Satisfactorio</option>
                      <option value="5">5 - Excelente</option>
                    </select>
                  </td>
                  
                  <td style={{ backgroundColor: "#fff", padding: "0.8rem" }}>
                    <textarea
                      className="justificacion-textarea"
                      rows={2}
                      placeholder="Explique la calificación (si 5 o ≤2)"
                      value={rows[22].justificacionTrabajador || ''}
                      onChange={(e)=>{
                        setRows(prev=>prev.map(r=> r.id===rows[22].id?{...r, justificacionTrabajador: e.target.value}:r));
                        setFormTouched(true);
                      }}
                    />
                  </td>
              </tr>
              <tr className="avg-row">
                <td colSpan={5}>
                  <div className="avg-wrap">
                    <span className="avg-label">PROMEDIO CALIFICACIÓN COMPETENCIAS:</span>
                    <span className="avg-value">{calcularPromedioCompetencias()}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
    </>
  );
};

export default CompetenciasTable;