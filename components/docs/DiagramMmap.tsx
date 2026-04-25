export default function DiagramMmap() {
  return (
    <svg
      viewBox="0 0 700 360"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', display: 'block' }}
      aria-label="Virtual address space and mmap diagram"
    >
      <defs>
        <marker id="mm-ao" markerWidth="7" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#d97736" />
        </marker>
        <marker id="mm-ag" markerWidth="7" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#3ecf8e" />
        </marker>
      </defs>

      <rect width="700" height="360" fill="#141311" rx="8" />

      {/* ── IDX File on disk ── */}
      <rect x="16" y="50" width="155" height="230" rx="4"
        fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5 3" />
      <circle cx="31" cy="66" r="4" fill="#3b82f6" />
      <text x="43" y="70" fill="#3b82f6" fontSize="10" fontFamily="var(--ff-mono, monospace)">IDX File · disk</text>
      <line x1="16" y1="80" x2="171" y2="80" stroke="#3b82f6" strokeWidth="0.5" opacity="0.25" />

      <text x="28" y="98"  fill="#6b6560" fontSize="9" fontFamily="var(--ff-mono, monospace)">0x0000  magic</text>
      <text x="28" y="114" fill="#6b6560" fontSize="9" fontFamily="var(--ff-mono, monospace)">0x0004  N=60000</text>
      <text x="28" y="130" fill="#6b6560" fontSize="9" fontFamily="var(--ff-mono, monospace)">0x0008  rows=28</text>
      <text x="28" y="146" fill="#6b6560" fontSize="9" fontFamily="var(--ff-mono, monospace)">0x000C  cols=28</text>
      <line x1="16" y1="156" x2="171" y2="156" stroke="#2a2825" strokeWidth="0.8" />
      <text x="28" y="174" fill="#e8e3dd" fontSize="9" fontFamily="var(--ff-mono, monospace)">image[0]</text>
      <text x="28" y="190" fill="#e8e3dd" fontSize="9" fontFamily="var(--ff-mono, monospace)">image[1]</text>
      <text x="28" y="206" fill="#6b6560" fontSize="9" fontFamily="var(--ff-mono, monospace)">    ···</text>
      <text x="28" y="222" fill="#6b6560" fontSize="9" fontFamily="var(--ff-mono, monospace)">image[59999]</text>
      <text x="93" y="262" fill="#6b6560" fontSize="8" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">≈ 47 MB</text>

      {/* mmap() arrow */}
      <line x1="171" y1="165" x2="221" y2="165"
        stroke="#d97736" strokeWidth="1.5" markerEnd="url(#mm-ao)" />
      <text x="175" y="157" fill="#d97736" fontSize="9" fontFamily="var(--ff-mono, monospace)">mmap()</text>

      {/* ── Virtual Address Space ── */}
      <rect x="224" y="20" width="200" height="315" rx="4"
        fill="none" stroke="#d97736" strokeWidth="1" strokeDasharray="5 3" />
      <circle cx="240" cy="36" r="4" fill="#d97736" />
      <text x="252" y="40" fill="#d97736" fontSize="10" fontFamily="var(--ff-mono, monospace)">Virtual Addr Space</text>
      <line x1="224" y1="50" x2="424" y2="50" stroke="#d97736" strokeWidth="0.5" opacity="0.25" />

      <rect x="238" y="60" width="172" height="27" rx="2"
        fill="#0d1a0d" stroke="#3ecf8e" strokeWidth="0.5" strokeDasharray="3 2" />
      <circle cx="250" cy="73.5" r="3.5" fill="#3ecf8e" />
      <text x="260" y="78" fill="#3ecf8e" fontSize="9" fontFamily="var(--ff-mono, monospace)">page 0   [resident]</text>

      <rect x="238" y="93" width="172" height="27" rx="2"
        fill="#0d1a0d" stroke="#3ecf8e" strokeWidth="0.5" strokeDasharray="3 2" />
      <circle cx="250" cy="106.5" r="3.5" fill="#3ecf8e" />
      <text x="260" y="111" fill="#3ecf8e" fontSize="9" fontFamily="var(--ff-mono, monospace)">page 1   [resident]</text>

      <rect x="238" y="126" width="172" height="27" rx="2"
        fill="#161514" stroke="#2a2825" strokeWidth="0.5" strokeDasharray="3 2" />
      <circle cx="250" cy="139.5" r="3.5" fill="#2a2825" />
      <text x="260" y="144" fill="#3d3a36" fontSize="9" fontFamily="var(--ff-mono, monospace)">page 2   [unmapped]</text>

      <rect x="238" y="159" width="172" height="27" rx="2"
        fill="#1c1508" stroke="#d97736" strokeWidth="0.5" strokeDasharray="3 2" />
      <circle cx="250" cy="172.5" r="3.5" fill="#d97736" />
      <text x="260" y="177" fill="#d97736" fontSize="9" fontFamily="var(--ff-mono, monospace)">page 3   [fault →]</text>

      <rect x="238" y="192" width="172" height="27" rx="2"
        fill="#161514" stroke="#2a2825" strokeWidth="0.5" strokeDasharray="3 2" />
      <circle cx="250" cy="205.5" r="3.5" fill="#2a2825" />
      <text x="260" y="210" fill="#3d3a36" fontSize="9" fontFamily="var(--ff-mono, monospace)">page 4   [unmapped]</text>

      <rect x="238" y="225" width="172" height="27" rx="2"
        fill="#161514" stroke="#2a2825" strokeWidth="0.5" strokeDasharray="3 2" />
      <circle cx="250" cy="238.5" r="3.5" fill="#2a2825" />
      <text x="260" y="243" fill="#3d3a36" fontSize="9" fontFamily="var(--ff-mono, monospace)">page 5   [unmapped]</text>

      <text x="324" y="275" fill="#3d3a36" fontSize="14" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">···</text>
      <text x="324" y="320" fill="#6b6560" fontSize="8.5" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">operator[] page-faults on access</text>

      {/* resident hit arrow */}
      <line x1="424" y1="73" x2="472" y2="73"
        stroke="#3ecf8e" strokeWidth="1.5" markerEnd="url(#mm-ag)" />
      <text x="428" y="65" fill="#3ecf8e" fontSize="8.5" fontFamily="var(--ff-mono, monospace)">hit</text>

      {/* page-fault arrow */}
      <line x1="424" y1="172" x2="472" y2="172"
        stroke="#d97736" strokeWidth="1.5" markerEnd="url(#mm-ao)" />
      <text x="428" y="164" fill="#d97736" fontSize="8.5" fontFamily="var(--ff-mono, monospace)">fault</text>

      {/* ── Physical RAM ── */}
      <rect x="474" y="50" width="210" height="230" rx="4"
        fill="none" stroke="#3ecf8e" strokeWidth="1" strokeDasharray="5 3" />
      <circle cx="490" cy="66" r="4" fill="#3ecf8e" />
      <text x="502" y="70" fill="#3ecf8e" fontSize="10" fontFamily="var(--ff-mono, monospace)">Physical RAM</text>
      <line x1="474" y1="80" x2="684" y2="80" stroke="#3ecf8e" strokeWidth="0.5" opacity="0.25" />

      <rect x="488" y="88" width="182" height="24" rx="2" fill="#0d1a0d" />
      <text x="498" y="104" fill="#3ecf8e" fontSize="9" fontFamily="var(--ff-mono, monospace)">page 0 · image[0]</text>

      <rect x="488" y="118" width="182" height="24" rx="2" fill="#0d1a0d" />
      <text x="498" y="134" fill="#3ecf8e" fontSize="9" fontFamily="var(--ff-mono, monospace)">page 1 · image[1]</text>

      <rect x="488" y="148" width="182" height="24" rx="2" fill="#1c1508" />
      <text x="498" y="164" fill="#d97736" fontSize="9" fontFamily="var(--ff-mono, monospace)">page 3 · loading…</text>

      <text x="579" y="200" fill="#2a2825" fontSize="9" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">[ free ]</text>
      <text x="579" y="222" fill="#2a2825" fontSize="9" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">[ free ]</text>
      <text x="579" y="244" fill="#2a2825" fontSize="9" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">[ free ]</text>
      <text x="579" y="266" fill="#2a2825" fontSize="9" fontFamily="var(--ff-mono, monospace)" textAnchor="middle">[ free ]</text>

      {/* RSS annotation */}
      <rect x="474" y="292" width="210" height="48" rx="4"
        fill="#1a1614" stroke="#a78bfa" strokeWidth="0.75" strokeDasharray="4 2" />
      <circle cx="490" cy="308" r="3.5" fill="#a78bfa" />
      <text x="502" y="312" fill="#a78bfa" fontSize="9" fontFamily="var(--ff-mono, monospace)">RSS  ≪  dataset size</text>
      <text x="490" y="330" fill="#6b6560" fontSize="8" fontFamily="var(--ff-mono, monospace)">only touched pages in RAM</text>
    </svg>
  )
}
