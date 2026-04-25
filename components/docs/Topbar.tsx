import Link from 'next/link'
import styles from './Topbar.module.css'

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <Link href="/" className={styles.logo}>
        Sandokan<span>.</span>
      </Link>
      <div className={styles.sep} />
      <span className={styles.title}>Documentation</span>
      <div className={styles.right}>
        <Link href="/">← Home</Link>
        <a href="#">GitHub</a>
        <span className={styles.badge}>v1.2.0-rc</span>
      </div>
    </div>
  )
}
