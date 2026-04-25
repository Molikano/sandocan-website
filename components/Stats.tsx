import styles from './Stats.module.css'

const items = [
  { num: '1.6', unit: 'M', label: 'Samples / sec' },
  { num: '19',  unit: '×', label: 'Faster than single-sample' },
  { num: '88',  unit: '%', label: 'EMNIST test accuracy' },
  { num: '0',   unit: '',  label: 'malloc in hot path' },
]

export default function Stats() {
  return (
    <div className={styles.stats}>
      {items.map(item => (
        <div key={item.label} className={styles.item}>
          <div className={styles.num}>
            {item.num}
            {item.unit && <span>{item.unit}</span>}
          </div>
          <div className={styles.label}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}
