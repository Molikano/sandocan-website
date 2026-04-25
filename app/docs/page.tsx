import type { Metadata } from 'next'
import Topbar from '@/components/docs/Topbar'
import DocsClient from '@/components/docs/DocsClient'
import styles from './docs.module.css'

export const metadata: Metadata = {
  title: 'Documentation — Sandokan',
  description: 'Full API reference and guides for the Sandokan C++ neural network engine.',
}

export default function DocsPage() {
  return (
    <div className={styles.layout}>
      <Topbar />
      <DocsClient />
    </div>
  )
}
