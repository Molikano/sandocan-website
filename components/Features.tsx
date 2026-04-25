import styles from './Features.module.css'

const cards = [
  {
    icon: 'Memory',
    title: 'PMAD Slab Allocator',
    desc: 'All gradient buffers are served from a pre-allocated contiguous slab. Zero malloc / free during training. No heap fragmentation over long runs.',
  },
  {
    icon: 'Compute',
    title: 'Apple AMX Acceleration',
    desc: 'Batched GEMM via Apple Accelerate and AMX co-processors. Combined with the slab allocator, this is the engine\'s primary performance lever.',
  },
  {
    icon: 'API',
    title: 'PyTorch-style Modules',
    desc: 'Compose typed submodules with Submodule<T>. Auto-registers with the parent on construction — you cannot forget a register call.',
  },
  {
    icon: 'Data',
    title: 'mmap-backed Datasets',
    desc: 'ImageDataset pages images on demand — RSS stays bounded regardless of dataset size. TabularDataset handles numeric CSVs with column-major storage.',
  },
  {
    icon: 'Training',
    title: 'Optimizers & Schedulers',
    desc: 'SGD, Adam, and LinearLR schedulers out of the box. Training loops handle shuffling, partial-batch skipping, and scheduler stepping automatically.',
  },
  {
    icon: 'Persist',
    title: 'Custom .sand Format',
    desc: 'Compact binary model files with a 4-word header, optional normalisation block, and DFS-traversal weight layout. Load in one call.',
  },
]

export default function Features() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.label}>Core Principles</span>
        <h2 className={styles.h2}>
          Engineered with <em>intention.</em>
        </h2>
        <p className={styles.desc}>
          Every design decision in Sandokan traces back to a single constraint: training must be
          fast, deterministic, and portable — without dragging in a Python runtime.
        </p>

        <div className={styles.grid}>
          {cards.map(card => (
            <div key={card.title} className={styles.card}>
              <span className={styles.icon}>{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
