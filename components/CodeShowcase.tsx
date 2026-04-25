import styles from './CodeShowcase.module.css'

export default function CodeShowcase() {
  return (
    <section id="example" className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.label}>Module System</span>
        <h2 className={styles.h2}>
          Define networks by <em>composing.</em>
        </h2>

        <div className={styles.grid}>
          <div className={styles.desc}>
            <h3>Residual blocks. First class.</h3>
            <p>
              Networks are plain C++ structs inheriting from <code>Module</code>. Submodules
              auto-register — the topology is known at construction time, so the slab allocator
              can compute sizes before any data moves.
            </p>
            <ul>
              <li>Auto-registration on construction</li>
              <li>Residual connections via operator overloads</li>
              <li>Topology-derived slab sizing via <code>init_pmad_for()</code></li>
              <li>Forward and backward in pure C++</li>
            </ul>
          </div>

          <pre className={styles.code}>
            <code dangerouslySetInnerHTML={{ __html: resBlockCode }} />
          </pre>
        </div>
      </div>
    </section>
  )
}

const resBlockCode = `<span class="kw">struct</span> <span class="tp">ResBlock</span> : <span class="tp">Module</span> {
    <span class="tp">Submodule</span>&lt;<span class="tp">Linear</span>&gt; fc1 { *<span class="kw">this</span>, 64, 64 };
    <span class="tp">ReLU</span>              relu1;
    <span class="tp">Submodule</span>&lt;<span class="tp">Linear</span>&gt; fc2 { *<span class="kw">this</span>, 64, 64 };
    <span class="tp">ReLU</span>              relu2;

    <span class="tp">MatrixXf</span> <span class="fn">forward</span>(<span class="kw">const</span> <span class="tp">MatrixXf</span>&amp; x) <span class="kw">override</span> {
        <span class="kw">return</span> relu2.<span class="fn">forward</span>(
            fc2.<span class="fn">forward</span>(
                relu1.<span class="fn">forward</span>(fc1.<span class="fn">forward</span>(x))
            )
        ) + x; <span class="cmt">// residual skip</span>
    }
};

<span class="cmt">// One call allocates the entire gradient slab</span>
<span class="tp">LetterNet</span> net;
<span class="fn">init_pmad_for</span>(net);

<span class="tp">Adam</span>     optim(1e-3f);
<span class="tp">LinearLR</span> sched(optim, 150, 1e-5f);
<span class="fn">train_module</span>(net, sched, train, test, 150, 128);`
