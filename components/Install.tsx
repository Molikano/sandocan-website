import Link from 'next/link'
import styles from './Install.module.css'

const steps = [
  {
    num: '01',
    title: 'Install via Homebrew',
    desc: 'The quickest path. Installs Sandokan and its Eigen dependency.',
  },
  {
    num: '02',
    title: 'Link in CMake',
    desc: (
      <>
        Use <code>find_package</code> and link the <code>sandokan::sandokan</code> target.
        That&apos;s it.
      </>
    ),
  },
  {
    num: '03',
    title: 'Enable AMX (optional)',
    desc: 'One CMake flag unlocks Apple Accelerate / AMX for a significant speed boost on Apple Silicon.',
  },
  {
    num: '04',
    title: 'Drop in the header',
    desc: (
      <>
        <code>#include &lt;sandokan.h&gt;</code> and you have the full training API.
      </>
    ),
  },
]

export default function Install() {
  return (
    <section id="install" className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.label}>Get Started</span>
        <h2 className={styles.h2}>
          Up and running in <em>minutes.</em>
        </h2>

        <div className={styles.grid}>
          <div className={styles.steps}>
            {steps.map(step => (
              <div key={step.num} className={styles.step}>
                <div className={styles.num}>{step.num}</div>
                <div className={styles.content}>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
            <Link href="/docs" className={styles.btn}>
              Full Documentation →
            </Link>
          </div>

          <pre className={styles.block}>
            <code dangerouslySetInnerHTML={{ __html: installCode }} />
          </pre>
        </div>
      </div>
    </section>
  )
}

const installCode = `<span class="cmt"># 1. Install</span>
brew install sandokan

<span class="cmt"># 2. Build your project</span>
cmake -B build .
cmake --build build -j

<span class="cmt"># CMakeLists.txt</span>
<span class="kw">find_package</span>(sandokan REQUIRED)
<span class="kw">target_link_libraries</span>(your_target
    PRIVATE sandokan::sandokan)

<span class="cmt"># 3. Enable AMX (Apple Silicon)</span>
<span class="kw">target_compile_definitions</span>(sandokan
    INTERFACE EIGEN_USE_BLAS)
<span class="kw">target_link_libraries</span>(sandokan
    INTERFACE "-framework Accelerate")

<span class="cmt"># 4. In your code</span>
<span class="kw">#include</span> &lt;sandokan.h&gt;`
