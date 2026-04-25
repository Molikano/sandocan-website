'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link href="/" className={styles.logo}>
        Sandokan<span>.</span>
      </Link>
      <ul className={styles.links}>
        <li><a href="#features">Features</a></li>
        <li><a href="#example">Example</a></li>
        <li><a href="#performance">Performance</a></li>
        <li><a href="#install">Install</a></li>
        <li><Link href="/docs" className={styles.cta}>Documentation →</Link></li>
      </ul>
    </nav>
  )
}
