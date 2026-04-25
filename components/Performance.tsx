import styles from './Performance.module.css'

const rows = [
  { backend: 'Eigen single-sample',               total: '9 257', epoch: '1 851', sample: '0.0148', sec: '67 408',    winner: false },
  { backend: 'Sandokan single-sample',             total: '7 540', epoch: '1 508', sample: '0.0121', sec: '82 757',    winner: false },
  { backend: 'Eigen batched',                      total: '614',   epoch: '123',   sample: '0.0010', sec: '1 015 951', winner: false },
  { backend: 'Sandokan batched + parallel',        total: '386',   epoch: '77',    sample: '0.0006', sec: '1 615 666', winner: true  },
]

export default function Performance() {
  return (
    <section id="performance" className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.label}>Benchmarks</span>
        <h2 className={styles.h2}>
          Numbers that <em>matter.</em>
        </h2>
        <p className={styles.desc}>
          Apple Silicon (M-series) · EIGEN_USE_BLAS · Architecture 784→64→64→26 · batch=128 ·
          EMNIST Letters, 124 800 training samples.
        </p>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Backend</th>
              <th>Total (ms)</th>
              <th>ms / epoch</th>
              <th>ms / sample</th>
              <th>Samples / sec</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.backend} className={row.winner ? styles.winner : ''}>
                <td>
                  {row.backend}
                  {row.winner && <span className={styles.badge}>FASTEST</span>}
                </td>
                <td>{row.total}</td>
                <td>{row.epoch}</td>
                <td>{row.sample}</td>
                <td>{row.sec}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.note}>
          <p>
            Sandokan&apos;s batched path runs at{' '}
            <span className={styles.accent}>1.6 M samples/sec</span> — 19.5× faster than
            single-sample Sandokan and 1.5× faster than plain Eigen batched. Fashion MNIST shows a
            further <span className={styles.accent}>1.74 M samples/sec</span> at 34.4 ms/epoch.
          </p>
        </div>
      </div>
    </section>
  )
}
