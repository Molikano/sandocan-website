import Link from 'next/link'
import Terminal from './Terminal'
import styles from './Hero.module.css'

const badges = [
  { label: 'Zero Allocation', highlight: true },
  { label: 'C++17' },
  { label: 'Apple AMX' },
  { label: 'CMake ≥ 3.15' },
  { label: 'Eigen 3' },
  { label: 'Single Header' },
]

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.h1}>
        Neural networks at <em>native</em> C++ speed.
      </h1>

      <p className={styles.sub}>
        No Python. No PyTorch dependency. Drop a single header and get a complete training
        pipeline — backed by a custom slab allocator and Apple AMX acceleration.
      </p>

      <div className={styles.badges}>
        {badges.map(b => (
          <span key={b.label} className={`${styles.badge} ${b.highlight ? styles.highlight : ''}`}>
            {b.label}
          </span>
        ))}
      </div>

      <div className={styles.ctas}>
        <Link href="/docs" className={styles.btnPrimary}>Read the Docs</Link>
        <a href="#install" className={styles.btnGhost}>Quick Install</a>
      </div>

      <div className={styles.terminalWrap}>
        <Terminal />
      </div>
    </section>
  )
}
