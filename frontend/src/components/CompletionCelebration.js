import React, { useEffect, useMemo } from "react";
import "../assets/css/CompletionCelebration.css";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export default function CompletionCelebration({
  open = false,
  employeeName = "",
  compAvg = 0,
  hseqAvg = 0,
  generalAvg = 0,
  // 1) Por defecto no se autocierra
  autoCloseMs = 0,
  onClose,
  primaryActionText = "Volver al inicio",
  onPrimaryAction,
  // 2) Evitar cierres accidentales
  closeOnBackdrop = false,
  // 3) Mostrar aviso de que faltan etapas (jefe y HSEQ)
  showPendingNotice = true,
}) {
  // Normaliza 0–5
  const comp = clamp(Number(compAvg) || 0, 0, 5);
  const hseq = clamp(Number(hseqAvg) || 0, 0, 5);
  const gen  = clamp(Number(generalAvg) || 0, 0, 5);

  // Progreso 0–100
  const pct = useMemo(() => Math.round((gen / 5) * 100), [gen]);

  useEffect(() => {
    if (!open || !autoCloseMs) return;
    const id = setTimeout(() => { onClose && onClose(); }, autoCloseMs);
    return () => clearTimeout(id);
  }, [open, autoCloseMs, onClose]);

  if (!open) return null;

  return (
    <div className="cc-portal" role="dialog" aria-modal="true" aria-label="Evaluación finalizada">
      <div
        className="cc-backdrop"
        onClick={closeOnBackdrop ? () => onClose && onClose() : undefined}
        aria-hidden="true"
      />

      <div className="cc-layer-beams" aria-hidden="true" />
      <div className="cc-layer-dust" aria-hidden="true" />

      <div className="cc-card">
        {/* 3) Botón de cierre */}
        <button
          type="button"
          className="cc-close"
          onClick={() => onClose && onClose()}
          aria-label="Cerrar"
          title="Cerrar"
        >
          ×
        </button>

        <div className="cc-check-wrap" aria-hidden="true">
          <svg className="cc-check" viewBox="0 0 72 72">
            <circle className="cc-check-ring" cx="36" cy="36" r="33" stroke="url(#ccGradSuccess)" />
            <path
              className="cc-check-mark"
              d="M20 36.5 L31 47 L52 26"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className="cc-title">¡Evaluación completada!</h2>
        {employeeName ? (
          <p className="cc-sub">
            Gracias, <strong>{employeeName}</strong>. Hemos registrado tu evaluación.
          </p>
        ) : (
          <p className="cc-sub">Hemos registrado la evaluación correctamente.</p>
        )}

        <div className="cc-metrics">
          <ProgressBadge percent={pct} label="Promedio General" value={gen.toFixed(2)} />
          <div className="cc-mini-metrics">
            <Metric label="Competencias" value={comp.toFixed(2)} />
            <Metric label="HSEQ" value={hseq.toFixed(2)} />
          </div>
        </div>

        {showPendingNotice && (
          <div className="cc-pending" role="note">
            <div className="cc-pending-title">Esta es una autoevaluación</div>
            <p className="cc-pending-desc">Aún falta completar:</p>
            <ul className="cc-pending-list">
              <li><span className="cc-chip">Respuesta del Jefe inmediato</span></li>
              <li><span className="cc-chip">Evaluación HSEQ</span></li>
            </ul>
          </div>
        )}

        <div className="cc-actions">
          <button
            className="cc-btn primary"
            onClick={() => {
              if (onPrimaryAction) onPrimaryAction();
              else window.location.href = "/";
            }}
          >
            {primaryActionText}
          </button>
        </div>
      </div>

      {/* Confeti (12 piezas) */}
      <div className="cc-confetti" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} style={{ "--i": i }} />
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="cc-metric">
      <span className="cc-metric-label">{label}</span>
      <span className="cc-metric-value">{value}</span>
    </div>
  );
}

function ProgressBadge({ percent = 0, value = "0.00", label = "General" }) {
  const R = 54;
  const C = 2 * Math.PI * R;
  const dash = ((100 - percent) / 100) * C;

  return (
    <div className="cc-badge">
      <svg viewBox="0 0 140 140" className="cc-badge-ring" aria-hidden="true">
        <defs>
          <linearGradient id="ccGradSuccess" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>
        <circle cx="70" cy="70" r={R} className="cc-badge-track" />
        <circle
          cx="70"
          cy="70"
          r={R}
          className="cc-badge-progress"
          style={{ strokeDasharray: C, strokeDashoffset: dash }}
        />
      </svg>
      <div className="cc-badge-content">
        <div className="cc-badge-value">{value}</div>
        <div className="cc-badge-label">{label}</div>
      </div>
    </div>
  );
}
