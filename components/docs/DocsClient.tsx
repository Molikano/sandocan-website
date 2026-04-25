'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Sidebar, { type SectionId } from './Sidebar'
import {
  SectionIntro, SectionWhy, SectionBuild,
  SectionModules, SectionPmad, SectionOptimizers, SectionLoss, SectionLayers,
  SectionDatasets, SectionTraining,
  SectionPersistence, SectionInference,
  SectionPerformance, SectionExamples, SectionAccuracy,
  SectionMmap, SectionParallel,
} from './sections'
import styles from './DocsClient.module.css'

const sectionMap: Record<SectionId, React.FC> = {
  intro:       SectionIntro,
  why:         SectionWhy,
  build:       SectionBuild,
  modules:     SectionModules,
  pmad:        SectionPmad,
  optimizers:  SectionOptimizers,
  loss:        SectionLoss,
  layers:      SectionLayers,
  datasets:    SectionDatasets,
  training:    SectionTraining,
  persistence: SectionPersistence,
  inference:   SectionInference,
  performance: SectionPerformance,
  examples:    SectionExamples,
  accuracy:    SectionAccuracy,
  mmap:        SectionMmap,
  parallel:    SectionParallel,
}

export default function DocsClient() {
  const [active, setActive] = useState<SectionId>('intro')
  const [search, setSearch] = useState('')
  const [tocItems, setTocItems] = useState<{ id: string; text: string }[]>([])
  const [tocActive, setTocActive] = useState('')
  const contentRef = useRef<HTMLDivElement>(null)

  const buildTOC = useCallback(() => {
    const el = contentRef.current
    if (!el) return
    const headings = el.querySelectorAll('h2')
    const items: { id: string; text: string }[] = []
    headings.forEach((h, i) => {
      const id = `toc-h-${i}`
      h.id = id
      items.push({ id, text: h.textContent ?? '' })
    })
    setTocItems(items)
    setTocActive('')
  }, [])

  useEffect(() => {
    buildTOC()
  }, [active, buildTOC])

  useEffect(() => {
    const main = contentRef.current?.closest('[data-main]') as HTMLElement | null
    if (!main) return

    const onScroll = () => {
      let current = ''
      tocItems.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < 120) current = id
      })
      setTocActive(current)
    }

    main.addEventListener('scroll', onScroll, { passive: true })
    return () => main.removeEventListener('scroll', onScroll)
  }, [tocItems])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const main = contentRef.current?.closest('[data-main]') as HTMLElement | null
    if (!main) return
    const top = el.offsetTop - 70
    main.scrollTo({ top, behavior: 'smooth' })
  }

  function navigate(id: SectionId) {
    setActive(id)
    const main = contentRef.current?.closest('[data-main]') as HTMLElement | null
    main?.scrollTo({ top: 0 })
  }

  const ActiveSection = sectionMap[active]

  return (
    <>
      <Sidebar
        active={active}
        onNavigate={navigate}
        searchQuery={search}
        onSearch={setSearch}
      />

      <div className={styles.main} data-main>
        <div className={styles.content} ref={contentRef}>
          <ActiveSection />
        </div>

        <div className={styles.toc}>
          <span className={styles.tocLabel}>On this page</span>
          <ul className={styles.tocList}>
            {tocItems.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={tocActive === item.id ? styles.tocActive : ''}
                  onClick={e => { e.preventDefault(); scrollTo(item.id) }}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
