'use client'

import { useEffect, useRef } from 'react'
import styles from './Terminal.module.css'

type Step =
  | { type: 'cmd'; text: string; delay: number; cursor?: false }
  | { type: 'cmd'; text: string; delay: number; cursor: true }
  | { type: 'out' | 'ok' | 'hi'; text: string; delay: number }
  | { type: 'gap'; delay: number }
  | { type: 'progress'; delay: number }

const sequence: Step[] = [
  { type: 'cmd',      text: 'brew install sandokan', delay: 600 },
  { type: 'gap',      delay: 300 },
  { type: 'out',      text: '==> Fetching sandokan', delay: 0 },
  { type: 'out',      text: '==> Downloading https://formulae.brew.sh/api/sandokan-1.2.0-rc.tar.gz', delay: 80 },
  { type: 'progress', delay: 0 },
  { type: 'out',      text: '==> Installing dependencies: eigen', delay: 200 },
  { type: 'out',      text: '==> Installing sandokan', delay: 400 },
  { type: 'ok',       text: '✓  /opt/homebrew/Cellar/sandokan/1.2.0-rc (38 files, 2.4MB)', delay: 600 },
  { type: 'gap',      delay: 200 },
  { type: 'cmd',      text: 'sandokan --version', delay: 300 },
  { type: 'gap',      delay: 200 },
  { type: 'hi',       text: 'Sandokan 1.2.0-rc  •  C++17  •  AMX ready', delay: 0 },
  { type: 'gap',      delay: 150 },
  { type: 'cmd',      text: '', delay: 0, cursor: true },
]

function sleep(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms))
}

async function typeText(el: HTMLElement, text: string, speed = 38) {
  for (const ch of text) {
    el.textContent += ch
    await sleep(speed + Math.random() * 20)
  }
}

function makeLine(cls: string, text = '') {
  const div = document.createElement('div')
  div.className = styles.line

  if (cls === 'cmd') {
    const prompt = document.createElement('span')
    prompt.className = styles.prompt
    prompt.textContent = '❯'
    div.appendChild(prompt)
  }

  const content = document.createElement('span')
  content.className =
    cls === 'cmd' ? styles.cmd :
    cls === 'ok'  ? styles.ok  :
    cls === 'hi'  ? styles.hi  : styles.out
  content.textContent = text
  div.appendChild(content)
  return { div, content }
}

export default function Terminal() {
  const bodyRef = useRef<HTMLDivElement>(null)
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const body = bodyRef.current!

    async function run() {
      await sleep(1400)

      for (const step of sequence) {
        await sleep(step.delay ?? 0)

        if (step.type === 'gap') {
          body.appendChild(document.createElement('br'))
          continue
        }

        if (step.type === 'progress') {
          const { div, content } = makeLine('out', '')
          body.appendChild(div)
          const total = 32
          for (let i = 0; i <= total; i++) {
            const pct = Math.round((i / total) * 100)
            const filled = Math.round((i / total) * 20)
            const bar = '█'.repeat(filled) + '░'.repeat(20 - filled)
            content.textContent = `   [${bar}] ${pct}%`
            await sleep(35)
          }
          continue
        }

        if ('cursor' in step && step.cursor) {
          const { div } = makeLine('cmd', '')
          const cur = document.createElement('span')
          cur.className = styles.cursor
          div.appendChild(cur)
          body.appendChild(div)
          continue
        }

        if (step.type === 'cmd') {
          const { div, content } = makeLine('cmd', '')
          body.appendChild(div)
          await typeText(content, step.text, 42)
          await sleep(120)
          continue
        }

        const { div } = makeLine(step.type, step.text)
        body.appendChild(div)
      }
    }

    run()
  }, [])

  return (
    <div className={styles.terminal}>
      <div className={styles.bar}>
        <div className={`${styles.dot} ${styles.dotRed}`} />
        <div className={`${styles.dot} ${styles.dotYel}`} />
        <div className={`${styles.dot} ${styles.dotGrn}`} />
        <span className={styles.title}>bash — 80×24</span>
      </div>
      <div className={styles.body} ref={bodyRef} />
    </div>
  )
}
