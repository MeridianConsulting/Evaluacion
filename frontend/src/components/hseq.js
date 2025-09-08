import React from "react";

function Hseq({
  hseqItems,
  handleHseqChange,
  handleHseqJustificacionChange,
  calcularPromedioHseq,
  getHseqErrorStyle
}) {
  return (
    <section className="evaluation-section">
      <table className="hseq-table">
        <thead>
          <tr>
            <th 
              colSpan={3} 
              style={{ 
                background: "linear-gradient(90deg, #1F3B73 0%, #0A0F1A 100%)", 
                color: "#FFFFFF", 
                textAlign: "center",
                padding: "0.8rem 1rem",
                fontSize: "1.1rem",
                fontWeight: "bold",
                height: "28px",
                borderBottom: "1px solid rgba(0,0,0,0.25)"
              }}
            >
              CALIFICACIÓN GENERAL POR RESPONSABILIDADES HSEQ
            </th>
          </tr>
          <tr>
            <th style={{ 
              width: "70%", 
              background: "#1E2A3A", 
              color: "#FFFFFF", 
              textAlign: "center",
              padding: "0.6rem 0.4rem",
              fontWeight: "bold",
              fontSize: "0.9rem",
              height: "24px",
              borderTop: "1px solid #1E2A3A",
              borderLeft: "1px solid #243447",
              borderBottom: "1px solid #243447",
              borderRight: "1px solid rgba(51,51,51,0.5)"
            }}>RESPONSABILIDAD</th>
            <th style={{ 
              width: "15%", 
              background: "#1E2A3A", 
              color: "#FFFFFF",
              textAlign: "center",
              padding: "0.6rem 0.4rem",
              fontWeight: "bold",
              fontSize: "0.9rem",
              height: "24px",
              borderTop: "1px solid #1E2A3A",
              borderLeft: "1px solid #243447",
              borderBottom: "1px solid #243447",
              borderRight: "1px solid rgba(51,51,51,0.5)"
            }}>JUSTIFICACIÓN HSEQ</th>
            <th style={{ 
              width: "15%", 
              background: "#1E2A3A", 
              color: "#FFFFFF",
              textAlign: "center",
              padding: "0.6rem 0.4rem",
              fontWeight: "bold",
              fontSize: "0.9rem",
              height: "24px",
              borderTop: "1px solid #1E2A3A",
              borderLeft: "1px solid #243447",
              borderBottom: "1px solid #243447",
              borderRight: "1px solid rgba(51,51,51,0.5)"
            }}>HSEQ</th>
          </tr>
        </thead>
        <tbody>
          {hseqItems.map(item => (
            <tr key={item.id}>
              <td style={{ backgroundColor: "#fff", padding: "0.5rem" }}>{item.responsabilidad}</td>
              <td className="text-center" style={{ backgroundColor: "#fff", padding: "0.5rem 0.4rem" }}>
                <select
                  className="rating-select"
                  value={item.evaluacionJefe}
                  onChange={(e) => handleHseqChange(item.id, "evaluacionJefe", e.target.value)}
                  style={getHseqErrorStyle(item.id, 'evaluacionJefe')}
                >
                  <option value="">1 - 5</option>
                  <option value="1">1 - No Cumple</option>
                  <option value="2">2 - Regular</option>
                  <option value="3">3 - Parcial</option>
                  <option value="4">4 - Satisfactorio</option>
                  <option value="5">5 - Excelente</option>
                </select>
              </td>
              <td style={{ backgroundColor: "#fff", padding: "0.5rem" }}>
                <textarea
                  className="hseq-textarea"
                  rows={1}
                  placeholder="Justificación HSEQ"
                  value={item.justificacionJefe || ''}
                  onChange={(e)=> handleHseqJustificacionChange(item.id, 'justificacionJefe', e.target.value)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td className="hseq-promedio" style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
              PROMEDIO CALIFICACIÓN HSEQ:
            </td>
            <td colSpan={2} className="hseq-promedio-valor" style={{ backgroundColor: "#f5f5f5" }}>
              {calcularPromedioHseq()}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Hseq;


