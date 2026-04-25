'use client'

import styles from './Sidebar.module.css'

export type SectionId =
  | 'intro' | 'why' | 'build'
  | 'modules' | 'pmad' | 'optimizers' | 'loss' | 'layers'
  | 'datasets' | 'training'
  | 'persistence' | 'inference'
  | 'performance' | 'examples' | 'accuracy'
  | 'mmap' | 'parallel'

interface Group {
  label: string
  items: { id: SectionId; label: string }[]
}

const groups: Group[] = [
  {
    label: 'Overview',
    items: [
      { id: 'intro', label: 'Introduction' },
      { id: 'why',   label: 'Why Sandokan?' },
      { id: 'build', label: 'Build & Install' },
    ],
  },
  {
    label: 'Core API',
    items: [
      { id: 'modules',    label: 'Module System' },
      { id: 'pmad',       label: 'PMAD Allocator' },
      { id: 'optimizers', label: 'Optimizers & LR' },
      { id: 'loss',       label: 'Loss Functions' },
      { id: 'layers',     label: 'Layers' },
    ],
  },
  {
    label: 'Data',
    items: [
      { id: 'datasets', label: 'Datasets' },
      { id: 'training', label: 'Training Loops' },
    ],
  },
  {
    label: 'I/O',
    items: [
      { id: 'persistence', label: 'Model Persistence' },
      { id: 'inference',   label: 'Inference' },
    ],
  },
  {
    label: 'Internals',
    items: [
      { id: 'mmap',     label: 'Memory Mapping' },
      { id: 'parallel', label: 'Batch Parallelism' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { id: 'performance', label: 'Benchmarks' },
      { id: 'examples',    label: 'Examples' },
      { id: 'accuracy',    label: 'Accuracy' },
    ],
  },
]

interface Props {
  active: SectionId
  onNavigate: (id: SectionId) => void
  searchQuery: string
  onSearch: (q: string) => void
  isOpen?: boolean
}

export default function Sidebar({ active, onNavigate, searchQuery, onSearch, isOpen }: Props) {
  return (
    <nav className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
      <div className={styles.searchBox}>
        <span className={styles.searchIcon}>⌕</span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search docs…"
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
        />
      </div>

      {groups.map(group => (
        <div key={group.label} className={styles.group}>
          <span className={styles.groupLabel}>{group.label}</span>
          {group.items.map(item => (
            <button
              key={item.id}
              className={`${styles.link} ${active === item.id ? styles.active : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className={styles.dot} />
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </nav>
  )
}
