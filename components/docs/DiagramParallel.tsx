export default function DiagramParallel() {
  const tw = 40, th = 28, tg = 4, cols = 5, rows = 4
  const gx = 430, gy = 104

  return (
    <svg
      viewBox="0 0 700 430"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', display: 'block' }}
      aria-label="Batch parallel training diagram"
    >
      <defs>
        <marker id="par-ao" markerWidth="7" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#d97736" />
        </marker>
        <marker id="par-ab" markerWidth="7" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#60a5fa" />
        </marker>
        <marker id="par-ag" markerWidth="7" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#3ecf8e" />
        </marker>
      </defs>

      <rect width="700" height="430" fill="#141311" rx="8" />

      {/* ── Batch Input ── */}
      <rect x="30" y="20" width="282" height="50" rx="4"
        fill="none" stroke="#d97736" strokeWidth="1" strokeDasharray="5 3" />
      <circle cx="46" cy="36" r="4" fill="#d97736" />
      <text x="58" y="40" fill="#d97736" fontSize="10" fontFamily="var(--ff-mono, monospace)">Batch Input</text>
      <text x="58" y="58" fill="#e8e3dd" fontSize="12" fontFamily="var(--ff-mono, monospace)">[ 128 × 784 ]</text>
      <text x="322" y="42" fill="#6b6560" fontSize="8.5" fontFamily="var(--ff-mono, monospace)">N=128 samples</text>
      <text x="322" y="56" fill="#6b6560" fontSize="8.5" fontFamily="var(--ff-mono, monospace)">28×28 pixels each</text>

      {/* arrow down: batch → Linear 1 */}
      <line x1="171" y1="70" x2="171" y2="94"
        stroke="#d97736" strokeWidth="1.5" markerEnd="url(#par-ao)" />
      <text x="179" y="87" fill="#6b6560" fontSize="8.5" fontFamily="var(--ff-mono, monospace)">GEMM</text>

      {/* ── Linear 784→64 ── */}
      <rect x="30" y="96" width="282" height="46" rx="4"
        fill="#1c1816" stroke="#d97736" strokeWidth="1" />
      <text x="58" y="116" fill="#e8e3dd" fontSize="11" fontFamily="var(--ff-mono, monospace)">Linear   784 → 64</text>
      <text x="58" y="132" fill="#6b6560" fontSize="8.5" fontFamily="var(--ff-mono, monospace)">[128×784] · [784×64] + bias → [128×64]</text>

      {/* arrow right: Linear 1 → AMX */}
      <line x1="312" y1="119" x2="378" y2="119"
        stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#par-ab)" />
      <text x="318" y="112" fill="#60a5fa" fontSize="8.5" fontFamily="var(--ff-mono, monospace)">Accel.</text>

      {/* arrow down: Linear 1 → activations */}
      <line x1="171" y1="142" x2="171" y2="163"
        stroke="#d97736" strokeWidth="1.5" markerEnd="url(#par-ao)" />

      {/* [128×64] activations */}
      <text x="60" y="180" fill="#e8e3dd" fontSize="12" fontFamily="var(--ff-mono, monospace)">[ 128 × 64 ]</text>
      <text x="196" y="180" fill="#6b6560" fontSize="8.5" fontFamily="var(--ff-mono, monospace)">activations</text>

      {/* ReLU arrow */}
      <line x1="171" y1="188" x2="171" y2="208"
        stroke="#3ecf8e" strokeWidth="1.5" markerEnd="url(#par-ag)" />
      <text x="179" y="203" fill="#3ecf8e" fontSize="8.5" fontFamily="var(--ff-mono, monospace)">ReLU</text>

      {/* [128×64] after ReLU */}
      <text x="60" y="226" fill="#e8e3dd" fontSize="12" fontFamily="var(--ff-mono, monospace)">[ 128 × 64 ]</text>
      <text x="196" y="226" fill="#6b6560" fontSize="8.5" fontFamily="var(--ff-mono, monospace)">after activation</text>

      {/* arrow down: activations → Linear 2 */}
      <line x1="171" y1="233" x2="171" y2="251"
        stroke="#d97736" strokeWidth="1.5" markerEnd="url(#par-ao)" />
      <text x="179" y="247" fill="#6b6560" fontSize="8.5" fontFamily="var(--ff-mono, monospace)">GEMM</text>

      {/* ── Linear 64→26 ── */}
      <rect x="30" y="253" width="282" height="46" rx="4"
        fill="#1c1816" stroke="#d97736" strokeWidth="1" />
      <text x="58" y="273" fill="#e8e3dd" fontSize="11" fontFamily="var(--ff-mono, monospace)">Linear    64 → 26</text>
      <text x="58" y="289" fill="#6b6560" fontSize="8.5" fontFamily="var(--ff-mono, monospace)">[128×64]  · [64×26]  + bias  → [128×26]</text>

      {/* arrow right: Linear 2 → AMX */}
      <line x1="312" y1="276" x2="378" y2="276"
        stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#par-ab)" />
      <text x="318" y="269" fill="#60a5fa" fontSize="8.5" fontFamily="var(--ff-mono, monospace)">Accel.</text>

      {/* arrow down: Linear 2 → output */}
      <line x1="171" y1="299" x2="171" y2="319"
        stroke="#d97736" strokeWidth="1.5" markerEnd="url(#par-ao)" />

      {/* [128×26] logits */}
      <text x="60" y="336" fill="#e8e3dd" fontSize="12" fontFamily="var(--ff-mono, monospace)">[ 128 × 26 ]</text>
      <text x="196" y="336" fill="#6b6560" fontSize="8.5" fontFamily="var(--ff-mono, monospace)">logits → CrossEntropy</text>

      {/* ── Apple AMX Co-processor ── */}
      <rect x="382" y="58" width="300" height="284" rx="4"
        fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="5 3" />
      <circle cx="398" cy="74" r="4" fill="#60a5fa" />
      <text x="410" y="78" fill="#60a5fa" fontSize="10" fontFamily="var(--ff-mono, monospace)">Apple AMX Co-processor</text>
      <line x1="382" y1="88" x2="682" y2="88" stroke="#60a5fa" strokeWidth="0.5" opacity="0.25" />

      {/* tile grid */}
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <rect key={`t${r}${c}`}
            x={gx + c * (tw + tg)}
            y={gy + r * (th + tg)}
            width={tw} height={th} rx="2"
            fill={`rgba(96,165,250,${0.04 + (r + c) * 0.018})`}
            stroke="#60a5fa" strokeWidth="0.5" strokeOpacity="0.45"
          />
        ))
      )}

      <text x="531" y="248" fill="#60a5fa" fontSize="9" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">parallel AMX tiles</text>
      <text x="531" y="262" fill="#6b6560" fontSize="8" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">each tile: sub-matrix multiply block</text>

      <text x="531" y="294" fill="#e8e3dd" fontSize="11" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">Accelerate BLAS</text>
      <text x="531" y="310" fill="#6b6560" fontSize="8" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">EIGEN_USE_BLAS · -framework Accelerate</text>

      <text x="531" y="330" fill="#3ecf8e" fontSize="10" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">19.5×  faster than single-sample</text>

      {/* ── PMAD Slab ── */}
      <rect x="30" y="352" width="650" height="60" rx="4"
        fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="5 3" />
      <circle cx="46" cy="368" r="4" fill="#a78bfa" />
      <text x="58" y="372" fill="#a78bfa" fontSize="10" fontFamily="var(--ff-mono, monospace)">PMAD Slab — gradient buffers (pre-allocated · contiguous)</text>
      <line x1="30" y1="382" x2="680" y2="382" stroke="#a78bfa" strokeWidth="0.5" opacity="0.25" />

      <rect x="44" y="388" width="148" height="17" rx="2"
        fill="rgba(217,119,54,0.18)" stroke="#d97736" strokeWidth="0.5" />
      <text x="118" y="400" fill="#d97736" fontSize="8.5" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">W₁ grad [784×64]</text>

      <rect x="200" y="388" width="68" height="17" rx="2"
        fill="rgba(217,119,54,0.10)" stroke="#d97736" strokeWidth="0.5" />
      <text x="234" y="400" fill="#d97736" fontSize="8.5" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">b₁ [64]</text>

      <rect x="276" y="388" width="120" height="17" rx="2"
        fill="rgba(96,165,250,0.18)" stroke="#60a5fa" strokeWidth="0.5" />
      <text x="336" y="400" fill="#60a5fa" fontSize="8.5" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">W₂ grad [64×26]</text>

      <rect x="404" y="388" width="58" height="17" rx="2"
        fill="rgba(96,165,250,0.10)" stroke="#60a5fa" strokeWidth="0.5" />
      <text x="433" y="400" fill="#60a5fa" fontSize="8.5" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">b₂ [26]</text>

      <text x="565" y="400" fill="#6b6560" fontSize="8" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">O(1) access · no malloc/free</text>
    </svg>
  )
}
