import React from "react";

// Copia de la tabla de competencias original, adaptada para usar campos del Jefe (boss, justificacionJefe)
const CompetenciasTableBoss = ({
  rows,
  handleSelectChange,
  setRows,
  setFormTouched,
  getCalificationErrorStyle,
  calcularPromedioCompetencias
}) => {
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
                }}>JEFE</th>
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
                }}>JUSTIFICACIÓN JEFE</th>
                
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
                  Comunicación <br /> efectiva
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
                    value={rows[0].boss === 0 ? "" : rows[0].boss}
                    onChange={(e) => handleSelectChange(rows[0].id, "boss", e.target.value)}
                    style={getCalificationErrorStyle(rows[0].id, 'boss')}
                    
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
                    placeholder="Justificación del jefe"
                    value={rows[0].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[0].id?{...r, justificacionJefe: e.target.value}:r));
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
                    value={rows[1].boss === 0 ? "" : rows[1].boss}
                    onChange={(e) => handleSelectChange(rows[1].id, "boss", e.target.value)}
                    style={getCalificationErrorStyle(rows[1].id, 'boss')}
                    
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
                    value={rows[1].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[1].id?{...r, justificacionJefe: e.target.value}:r));
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
                    value={rows[2].boss === 0 ? "" : rows[2].boss}
                    onChange={(e) => handleSelectChange(rows[2].id, "boss", e.target.value)}
                    
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
                    value={rows[2].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[2].id?{...r, justificacionJefe: e.target.value}:r));
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
                    value={rows[3].boss === 0 ? "" : rows[3].boss}
                    onChange={(e) => handleSelectChange(rows[3].id, "boss", e.target.value)}
                    
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
                    value={rows[3].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[3].id?{...r, justificacionJefe: e.target.value}:r));
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
                  Instrumentalidad de <br /> decisiones
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
                    value={rows[4].boss === 0 ? "" : rows[4].boss}
                    onChange={(e) => handleSelectChange(rows[4].id, "boss", e.target.value)}
                    
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
                    value={rows[4].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[4].id?{...r, justificacionJefe: e.target.value}:r));
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
                    value={rows[5].boss === 0 ? "" : rows[5].boss}
                    onChange={(e) => handleSelectChange(rows[5].id, "boss", e.target.value)}
                    
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
                    value={rows[5].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[5].id?{...r, justificacionJefe: e.target.value}:r));
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
                  Aporte <br /> profesional
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
                    value={rows[6].boss === 0 ? "" : rows[6].boss}
                    onChange={(e) => handleSelectChange(rows[6].id, "boss", e.target.value)}
                    
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
                    value={rows[6].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[6].id?{...r, justificacionJefe: e.target.value}:r));
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
                    value={rows[7].boss === 0 ? "" : rows[7].boss}
                    onChange={(e) => handleSelectChange(rows[7].id, "boss", e.target.value)}
                    
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
                    value={rows[7].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[7].id?{...r, justificacionJefe: e.target.value}:r));
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
                    value={rows[8].boss === 0 ? "" : rows[8].boss}
                    onChange={(e) => handleSelectChange(rows[8].id, "boss", e.target.value)}
                    
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
                    value={rows[8].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[8].id?{...r, justificacionJefe: e.target.value}:r));
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
                    value={rows[9].boss === 0 ? "" : rows[9].boss}
                    onChange={(e) => handleSelectChange(rows[9].id, "boss", e.target.value)}
                    
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
                    value={rows[9].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[9].id?{...r, justificacionJefe: e.target.value}:r));
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
                  Colaboración
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
                    value={rows[10].boss === 0 ? "" : rows[10].boss}
                    onChange={(e) => handleSelectChange(rows[10].id, "boss", e.target.value)}
                    
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
                    value={rows[10].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[10].id?{...r, justificacionJefe: e.target.value}:r));
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
                    value={rows[11].boss === 0 ? "" : rows[11].boss}
                    onChange={(e) => handleSelectChange(rows[11].id, "boss", e.target.value)}
                    
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
                    value={rows[11].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[11].id?{...r, justificacionJefe: e.target.value}:r));
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
                    value={rows[12].boss === 0 ? "" : rows[12].boss}
                    onChange={(e) => handleSelectChange(rows[12].id, "boss", e.target.value)}
                    
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
                    value={rows[12].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[12].id?{...r, justificacionJefe: e.target.value}:r));
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
                  Relaciones <br /> interpersonales
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
                    value={rows[13].boss === 0 ? "" : rows[13].boss}
                    onChange={(e) => handleSelectChange(rows[13].id, "boss", e.target.value)}
                    
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
                    value={rows[13].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[13].id?{...r, justificacionJefe: e.target.value}:r));
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
                    value={rows[14].boss === 0 ? "" : rows[14].boss}
                    onChange={(e) => handleSelectChange(rows[14].id, "boss", e.target.value)}
                    
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
                    value={rows[14].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[14].id?{...r, justificacionJefe: e.target.value}:r));
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
                    value={rows[15].boss === 0 ? "" : rows[15].boss}
                    onChange={(e) => handleSelectChange(rows[15].id, "boss", e.target.value)}
                    
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
                    value={rows[15].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[15].id?{...r, justificacionJefe: e.target.value}:r));
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
                  Gestión de <br /> procedimientos
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
                    value={rows[16].boss === 0 ? "" : rows[16].boss}
                    onChange={(e) => handleSelectChange(rows[16].id, "boss", e.target.value)}
                    
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
                    value={rows[16].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[16].id?{...r, justificacionJefe: e.target.value}:r));
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
                    value={rows[17].boss === 0 ? "" : rows[17].boss}
                    onChange={(e) => handleSelectChange(rows[17].id, "boss", e.target.value)}
                    
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
                    value={rows[17].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[17].id?{...r, justificacionJefe: e.target.value}:r));
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
                    value={rows[18].boss === 0 ? "" : rows[18].boss}
                    onChange={(e) => handleSelectChange(rows[18].id, "boss", e.target.value)}
                    
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
                    value={rows[18].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[18].id?{...r, justificacionJefe: e.target.value}:r));
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
                  Cumplimiento de <br /> funciones del cargo
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
                    value={rows[19].boss === 0 ? "" : rows[19].boss}
                    onChange={(e) => handleSelectChange(rows[19].id, "boss", e.target.value)}
                    
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
                    value={rows[19].justificacionJefe || ''}
                    onChange={(e)=>{
                      setRows(prev=>prev.map(r=> r.id===rows[19].id?{...r, justificacionJefe: e.target.value}:r));
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
                    value={rows[20].boss === 0 ? "" : rows[20].boss}
                    onChange={(e) => handleSelectChange(rows[20].id, "boss", e.target.value)}
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
                      value={rows[20].justificacionJefe || ''}
                      onChange={(e)=>{
                        setRows(prev=>prev.map(r=> r.id===rows[20].id?{...r, justificacionJefe: e.target.value}:r));
                        setFormTouched(true);
                      }}
                    />
                  </td>
                  
                </tr>
              {/* Fila 4 adicional para completar el grupo (rows[22]) */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[21].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                    <select
                      className="rating-select"
                      value={rows[21].boss === 0 ? "" : rows[21].boss}
                      onChange={(e) => handleSelectChange(rows[21].id, "boss", e.target.value)}
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
                      value={rows[21].justificacionJefe || ''}
                      onChange={(e)=>{
                        setRows(prev=>prev.map(r=> r.id===rows[21].id?{...r, justificacionJefe: e.target.value}:r));
                        setFormTouched(true);
                      }}
                    />
                  </td>
                  
                </tr>
              {/* Fila 4 final (rows[22]) */}
              <tr>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                  {rows[22].aspecto}
                </td>
                <td style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                    <select
                      className="rating-select"
                      value={rows[22].boss === 0 ? "" : rows[22].boss}
                      onChange={(e) => handleSelectChange(rows[22].id, "boss", e.target.value)}
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
                      value={rows[22].justificacionJefe || ''}
                      onChange={(e)=>{
                        setRows(prev=>prev.map(r=> r.id===rows[22].id?{...r, justificacionJefe: e.target.value}:r));
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

export default CompetenciasTableBoss;


