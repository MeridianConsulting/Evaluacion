import React from "react";

function Hseq({
  hseqItems,
  handleHseqChange,
  handleHseqJustificacionChange,
  calcularPromedioHseq,
  getHseqErrorStyle
}) {
  return (
    <section className="evaluation-section" style={{ overflow: 'hidden' }}>
      <style>{`
        .hseq-table tr:nth-child(even) td { background-color: #fafafa; }
        .hseq-table tr:hover td { background-color: #f3f6fb; }
        .hseq-table th, .hseq-table td { border-bottom: 1px solid #eef2f7; }
      `}</style>
      <div style={{ 
        width: '100%', 
        overflowX: 'auto',
        overflowY: 'visible',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <table className="hseq-table" style={{ 
          width: '100%', 
          minWidth: '800px',
          borderCollapse: 'collapse',
          margin: 0,
          tableLayout: 'fixed'
        }}>
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
                borderBottom: "1px solid rgba(0,0,0,0.25)",
                position: 'sticky',
                top: 0,
                zIndex: 1
              }}
            >
              CALIFICACIÓN GENERAL POR RESPONSABILIDADES HSEQ
            </th>
          </tr>
          <tr>
            <th style={{ 
              width: "60%", 
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
              width: "20%", 
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
            }}>CALIFICACIÓN HSEQ</th>
            <th style={{ 
              width: "20%", 
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
          </tr>
        </thead>
        <tbody>
          {hseqItems.map(item => (
            <tr key={item.id}>
              <td style={{ 
                backgroundColor: "#fff", 
                padding: "0.8rem", 
                fontSize: "0.9rem",
                lineHeight: "1.4",
                wordWrap: "break-word",
                verticalAlign: "top"
              }}>
                {item.responsabilidad}
              </td>
              <td className="text-center" style={{ 
                backgroundColor: "#fff", 
                padding: "0.8rem 0.4rem",
                verticalAlign: "top"
              }}>
                <select
                  className="rating-select"
                  value={item.evaluacionJefe}
                  onChange={(e) => handleHseqChange(item.id, "evaluacionJefe", e.target.value)}
                  style={{
                    ...getHseqErrorStyle(item.id, 'evaluacionJefe'),
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "0.9rem",
                    backgroundColor: "#fff"
                  }}
                >
                  <option value="">1 - 5</option>
                  <option value="1">1 - No Cumple</option>
                  <option value="2">2 - Regular</option>
                  <option value="3">3 - Parcial</option>
                  <option value="4">4 - Satisfactorio</option>
                  <option value="5">5 - Excelente</option>
                  <option value="NA">No Aplica</option>
                </select>
              </td>
              <td style={{ 
                backgroundColor: "#fff", 
                padding: "0.8rem",
                verticalAlign: "top"
              }}>
                <textarea
                  className="hseq-textarea"
                  rows={2}
                  placeholder="Justificación HSEQ"
                  value={item.justificacionJefe || ''}
                  onChange={(e)=> handleHseqJustificacionChange(item.id, 'justificacionJefe', e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "0.9rem",
                    resize: "vertical",
                    minHeight: "60px",
                    fontFamily: "inherit"
                  }}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td className="hseq-promedio" style={{ 
              fontWeight: "bold", 
              backgroundColor: "#f5f5f5",
              padding: "0.8rem",
              fontSize: "1rem",
              borderTop: "2px solid #1F3B73"
            }}>
              PROMEDIO CALIFICACIÓN HSEQ:
            </td>
            <td colSpan={2} className="hseq-promedio-valor" style={{ 
              backgroundColor: "#f5f5f5",
              padding: "0.8rem",
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "#1F3B73",
              textAlign: "center",
              borderTop: "2px solid #1F3B73"
            }}>
              {calcularPromedioHseq()}
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </section>
  );
}

export default Hseq;


