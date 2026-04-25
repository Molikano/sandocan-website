import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Sandokan.</div>
      <ul className={styles.links}>
        <li><Link href="/docs">Documentation</Link></li>
        <li><a href="#install">Install</a></li>
        <li><a href="#performance">Benchmarks</a></li>
        <li><a href="#">GitHub</a></li>
      </ul>
      <p className={styles.copy}>
        C++17 · CMake ≥ 3.15 · Eigen 3 · Requires no Python runtime.
      </p>
    </footer>
  )
}
