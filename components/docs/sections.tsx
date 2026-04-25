import type { ReactNode } from 'react'
import styles from './sections.module.css'
import DiagramMmap from './DiagramMmap'
import DiagramParallel from './DiagramParallel'

/* ── shared primitives ── */

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className={styles.eyebrow}>{children}</span>
}

function DocH1({ children }: { children: ReactNode }) {
  return <h1 className={styles.h1}>{children}</h1>
}

function DocH2({ id, children }: { id?: string; children: ReactNode }) {
  return <h2 id={id} className={styles.h2}>{children}</h2>
}

function DocH3({ children }: { children: ReactNode }) {
  return <h3 className={styles.h3}>{children}</h3>
}

function DocP({ children }: { children: ReactNode }) {
  return <p className={styles.p}>{children}</p>
}

function InlineCode({ children }: { children: ReactNode }) {
  return <code className={styles.inline}>{children}</code>
}

function Callout({ children, green }: { children: ReactNode; green?: boolean }) {
  return (
    <div className={`${styles.callout} ${green ? styles.calloutGreen : ''}`}>
      <p>{children}</p>
    </div>
  )
}

function DocList({ ordered, children }: { ordered?: boolean; children: ReactNode }) {
  return ordered
    ? <ol className={styles.list}>{children}</ol>
    : <ul className={styles.list}>{children}</ul>
}

function Pre({ lang, code }: { lang: string; code: string }) {
  function copyCode(btn: HTMLButtonElement) {
    const pre = btn.closest('[data-pre-wrap]')?.querySelector('code')
    if (!pre) return
    navigator.clipboard.writeText(pre.innerText).then(() => {
      btn.textContent = 'Copied!'
      btn.classList.add('copied')
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied') }, 2000)
    })
  }

  return (
    <div data-pre-wrap className={styles.preWrap}>
      <div className={styles.preHeader}>
        <span className={styles.preLang}>{lang}</span>
        <button
          className={styles.copyBtn}
          onClick={e => copyCode(e.currentTarget)}
        >
          Copy
        </button>
      </div>
      <pre className={styles.pre}>
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
    </div>
  )
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>{head.map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} dangerouslySetInnerHTML={{ __html: cell }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── INTRO ── */
export function SectionIntro() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Overview</Eyebrow>
        <DocH1>Introduction to <em>Sandokan</em></DocH1>
        <p className={styles.headerDesc}>
          A from-scratch C++ neural network training engine. No Python. No PyTorch dependency.
          Drop a single header into any C++ project and get a complete training pipeline.
        </p>
      </div>

      <DocP>
        Sandokan gives you classification, regression, custom datasets, optimizers, learning rate
        schedules, and model persistence — all backed by a custom slab allocator and Apple AMX
        acceleration.
      </DocP>

      <Callout green>
        <strong>Single header.</strong> Everything you need lives in{' '}
        <InlineCode>&lt;sandokan.h&gt;</InlineCode>. Submodule headers like{' '}
        <InlineCode>sandokan/io.h</InlineCode> and{' '}
        <InlineCode>sandokan/inference.h</InlineCode> extend the core.
      </Callout>

      <DocH2>Quick Start</DocH2>
      <DocP>
        Define your network, allocate the gradient slab, attach an optimizer, and call the
        training loop. Everything else is handled for you.
      </DocP>

      <Pre lang="C++" code={introCode} />
    </>
  )
}

const introCode = `<span class="kw">#include</span> <span class="str">&lt;sandokan.h&gt;</span>

<span class="kw">struct</span> <span class="tp">LetterNet</span> : <span class="tp">Module</span> {
    <span class="tp">Submodule</span>&lt;<span class="tp">Linear</span>&gt; proj { *<span class="kw">this</span>, <span class="num">784</span>, <span class="num">64</span> };
    <span class="tp">ReLU</span>                relu;
    <span class="tp">Submodule</span>&lt;<span class="tp">Linear</span>&gt; head { *<span class="kw">this</span>, <span class="num">64</span>,  <span class="num">26</span> };

    <span class="tp">MatrixXf</span> <span class="fn">forward</span>(<span class="kw">const</span> <span class="tp">MatrixXf</span>&amp; x) <span class="kw">override</span> {
        <span class="kw">return</span> head.<span class="fn">forward</span>(relu.<span class="fn">forward</span>(proj.<span class="fn">forward</span>(x)));
    }
    <span class="tp">MatrixXf</span> <span class="fn">backward</span>(<span class="kw">const</span> <span class="tp">MatrixXf</span>&amp; dy) <span class="kw">override</span> {
        <span class="kw">return</span> proj.<span class="fn">backward</span>(relu.<span class="fn">backward</span>(head.<span class="fn">backward</span>(dy)));
    }
};

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="tp">LetterNet</span> net;
    <span class="fn">init_pmad_for</span>(net);   <span class="cmt">// allocate gradient slab</span>

    <span class="tp">ImageDataset</span> train = <span class="fn">load_emnist_letters</span>(<span class="str">"data/Emnist"</span>, <span class="kw">true</span>);
    <span class="tp">ImageDataset</span> test  = <span class="fn">load_emnist_letters</span>(<span class="str">"data/Emnist"</span>, <span class="kw">false</span>);
    train.<span class="fn">compute_normalization</span>();
    test.<span class="fn">apply_normalization_from</span>(train);

    <span class="tp">Adam</span> optim(<span class="num">1e-3f</span>);
    <span class="fn">train_module</span>(net, optim, train, test, <span class="num">150</span>, <span class="num">128</span>);
}`

/* ── WHY ── */
export function SectionWhy() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Motivation</Eyebrow>
        <DocH1>Why <em>Sandokan?</em></DocH1>
        <p className={styles.headerDesc}>
          Training neural networks in C++ without a multi-gigabyte Python runtime dependency.
        </p>
      </div>

      <DocP>
        Training neural networks in C++ today means dragging in LibTorch — a ~1 GB dependency
        with a Python runtime assumption — or writing raw BLAS calls with no abstraction.
        Sandokan fills the gap.
      </DocP>
      <DocP>
        A PyTorch-style API at native C++ speed, designed for environments where Python is not
        an option.
      </DocP>

      <DocH2>Target Environments</DocH2>
      <DocList>
        <li>Embedded systems and edge devices</li>
        <li>Game engines requiring on-device learning</li>
        <li>Trading systems and latency-sensitive C++ codebases</li>
        <li>Any pipeline where adding a Python runtime is not acceptable</li>
      </DocList>

      <Callout>
        <strong>Core constraint:</strong> training must be fast, deterministic, and portable —
        with zero dynamic allocation in the hot path.
      </Callout>
    </>
  )
}

/* ── BUILD ── */
export function SectionBuild() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Getting Started</Eyebrow>
        <DocH1>Build &amp; <em>Install</em></DocH1>
        <p className={styles.headerDesc}>Requirements: C++17, CMake ≥ 3.15, Eigen 3.</p>
      </div>

      <DocH2>Homebrew (recommended)</DocH2>
      <Pre lang="bash" code="brew install sandokan" />

      <DocH2>From Source</DocH2>
      <Pre lang="bash" code={`cmake -B build .\ncmake --build build -j`} />

      <DocH2>CMake Integration</DocH2>
      <Pre lang="cmake" code={buildCmakeCode} />

      <DocH2>Apple AMX Acceleration</DocH2>
      <DocP>
        Strongly recommended on Apple Silicon. Unlocks batched GEMM via Apple Accelerate and
        the AMX co-processor.
      </DocP>
      <Pre lang="cmake" code={amxCode} />

      <DocH2>PMAD Memory Mapping</DocH2>
      <Pre lang="cmake" code={`<span class="fn">set</span>(SANDOKAN_USE_PMAD <span class="kw">ON</span>)`} />
    </>
  )
}

const buildCmakeCode = `<span class="cmt"># CMakeLists.txt</span>
<span class="fn">find_package</span>(sandokan REQUIRED)
<span class="fn">target_link_libraries</span>(your_target <span class="kw">PRIVATE</span> sandokan::sandokan)`

const amxCode = `<span class="fn">target_compile_definitions</span>(sandokan INTERFACE EIGEN_USE_BLAS)
<span class="fn">target_link_libraries</span>(sandokan INTERFACE <span class="str">"-framework Accelerate"</span>)`

/* ── MODULES ── */
export function SectionModules() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Core API</Eyebrow>
        <DocH1>Module <em>System</em></DocH1>
        <p className={styles.headerDesc}>
          Define networks by composing typed submodules. Auto-registration means you cannot
          accidentally miss a register call.
        </p>
      </div>

      <DocP>
        <InlineCode>Submodule&lt;T&gt;</InlineCode> auto-registers with the parent module on
        construction. The topology is fully known at construction time, which is what allows the
        PMAD allocator to compute slab sizes in a single pass.
      </DocP>

      <DocH2>Basic Network</DocH2>
      <Pre lang="C++" code={basicNetCode} />

      <DocH2>Residual Blocks</DocH2>
      <DocP>
        Residual connections are first-class — the skip connection is just{' '}
        <InlineCode>+ x</InlineCode> or <InlineCode>+ dy</InlineCode> in the forward and backward
        passes respectively.
      </DocP>
      <Pre lang="C++" code={resBlockCode2} />
    </>
  )
}

const basicNetCode = `<span class="kw">struct</span> <span class="tp">LetterNet</span> : <span class="tp">Module</span> {
    <span class="tp">Submodule</span>&lt;<span class="tp">Linear</span>&gt; proj { *<span class="kw">this</span>, <span class="num">784</span>, <span class="num">64</span> };
    <span class="tp">ReLU</span>                relu;
    <span class="tp">Submodule</span>&lt;<span class="tp">Linear</span>&gt; head { *<span class="kw">this</span>, <span class="num">64</span>,  <span class="num">26</span> };

    <span class="tp">MatrixXf</span> <span class="fn">forward</span>(<span class="kw">const</span> <span class="tp">MatrixXf</span>&amp; x) <span class="kw">override</span> {
        <span class="kw">return</span> head.<span class="fn">forward</span>(relu.<span class="fn">forward</span>(proj.<span class="fn">forward</span>(x)));
    }
    <span class="tp">MatrixXf</span> <span class="fn">backward</span>(<span class="kw">const</span> <span class="tp">MatrixXf</span>&amp; dy) <span class="kw">override</span> {
        <span class="kw">return</span> proj.<span class="fn">backward</span>(relu.<span class="fn">backward</span>(head.<span class="fn">backward</span>(dy)));
    }
};`

const resBlockCode2 = `<span class="kw">struct</span> <span class="tp">ResBlock</span> : <span class="tp">Module</span> {
    <span class="tp">Submodule</span>&lt;<span class="tp">Linear</span>&gt; fc1 { *<span class="kw">this</span>, <span class="num">64</span>, <span class="num">64</span> };
    <span class="tp">ReLU</span>              relu1;
    <span class="tp">Submodule</span>&lt;<span class="tp">Linear</span>&gt; fc2 { *<span class="kw">this</span>, <span class="num">64</span>, <span class="num">64</span> };
    <span class="tp">ReLU</span>              relu2;

    <span class="tp">MatrixXf</span> <span class="fn">forward</span>(<span class="kw">const</span> <span class="tp">MatrixXf</span>&amp; x) <span class="kw">override</span> {
        <span class="kw">return</span> relu2.<span class="fn">forward</span>(
            fc2.<span class="fn">forward</span>(relu1.<span class="fn">forward</span>(fc1.<span class="fn">forward</span>(x)))
        ) + x;
    }
    <span class="tp">MatrixXf</span> <span class="fn">backward</span>(<span class="kw">const</span> <span class="tp">MatrixXf</span>&amp; dy) <span class="kw">override</span> {
        <span class="kw">return</span> fc1.<span class="fn">backward</span>(
            relu1.<span class="fn">backward</span>(fc2.<span class="fn">backward</span>(relu2.<span class="fn">backward</span>(dy)))
        ) + dy;
    }
};`

/* ── PMAD ── */
export function SectionPmad() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Memory</Eyebrow>
        <DocH1>PMAD Slab <em>Allocator</em></DocH1>
        <p className={styles.headerDesc}>
          Zero malloc / free during training. Gradient buffers live in a single contiguous
          pre-allocated slab.
        </p>
      </div>

      <DocP>
        Size classes are derived automatically from the network topology. Once{' '}
        <InlineCode>init_pmad_for()</InlineCode> is called, all gradient buffers are migrated
        into the slab in a single pass. No fragmentation over long runs.
      </DocP>

      <Pre lang="C++" code={pmadCode} />

      <Callout>
        <strong>Why it matters:</strong> combined with Apple Accelerate / AMX for batched GEMM,
        the PMAD allocator is the primary reason Sandokan&apos;s batched path is 19.5× faster
        than single-sample mode.
      </Callout>

      <DocP>
        To enable PMAD memory mapping in CMake, set{' '}
        <InlineCode>SANDOKAN_USE_PMAD ON</InlineCode> before calling{' '}
        <InlineCode>find_package</InlineCode>.
      </DocP>
    </>
  )
}

const pmadCode = `<span class="tp">LetterNet</span> net;
<span class="fn">init_pmad_for</span>(net);
<span class="cmt">// reads topology, allocates slab,
// migrates gradients — in one pass.</span>`

/* ── OPTIMIZERS ── */
export function SectionOptimizers() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Training</Eyebrow>
        <DocH1>Optimizers &amp; <em>Schedulers</em></DocH1>
        <p className={styles.headerDesc}>
          SGD and Adam out of the box. LinearLR decay with automatic scheduler stepping.
        </p>
      </div>

      <DocH2>Optimizers</DocH2>
      <Table
        head={['Optimizer', 'Constructor', 'Notes']}
        rows={[
          ['SGD',  `<code class="inline">SGD(lr)</code>`,  'Stochastic gradient descent with fixed learning rate'],
          ['Adam', `<code class="inline">Adam(lr)</code>`, 'Adaptive moments with bias correction'],
        ]}
      />

      <DocH2>Learning Rate Schedulers</DocH2>
      <Table
        head={['Scheduler', 'Constructor', 'Notes']}
        rows={[
          ['LinearLR', `<code class="inline">LinearLR(optim, epochs, end_lr)</code>`, 'Linearly decays lr from start to end_lr over N epochs'],
        ]}
      />

      <DocH2>Example</DocH2>
      <Pre lang="C++" code={optimCode} />

      <DocP>
        Both <InlineCode>train_module</InlineCode> and <InlineCode>train_regression</InlineCode>{' '}
        call <InlineCode>optim.epoch_end()</InlineCode> automatically at the end of each epoch,
        which triggers the scheduler step when a scheduler is provided.
      </DocP>
    </>
  )
}

const optimCode = `<span class="tp">Adam</span>     optim(<span class="num">1e-3f</span>);
<span class="tp">LinearLR</span> sched(optim, <span class="num">150</span>, <span class="num">1e-5f</span>);

<span class="fn">train_module</span>(net, sched, train_set, test_set, <span class="num">150</span>, <span class="num">128</span>);`

/* ── LOSS ── */
export function SectionLoss() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Training</Eyebrow>
        <DocH1>Loss <em>Functions</em></DocH1>
        <p className={styles.headerDesc}>
          Three loss functions covering classification and regression use cases.
        </p>
      </div>

      <Table
        head={['Loss', 'Output activation', 'Use case']}
        rows={[
          ['CrossEntropyLoss', 'Softmax',       'Multi-class classification'],
          ['BCELoss',          'Sigmoid',        'Binary / multi-label classification'],
          ['MSELoss',          'Linear (none)',  'Regression'],
        ]}
      />

      <Callout>
        <strong>Note:</strong> <InlineCode>CrossEntropyLoss</InlineCode> folds the Softmax
        Jacobian into its backward pass — <InlineCode>Softmax</InlineCode> is a passthrough in
        the backward direction when used with CE loss.
      </Callout>
    </>
  )
}

/* ── LAYERS ── */
export function SectionLayers() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Reference</Eyebrow>
        <DocH1>Available <em>Layers</em></DocH1>
        <p className={styles.headerDesc}>
          All layers implement the Module interface with forward and backward methods.
        </p>
      </div>

      <Table
        head={['Layer', 'Description']}
        rows={[
          ['Linear',  'Fully connected. He-initialised weights, PMAD-backed gradient buffers.'],
          ['ReLU',    'Element-wise rectifier. Stores pre-activation for backward pass.'],
          ['Softmax', 'Numerically stable column-wise softmax. Passthrough backward (CE loss folds in Jacobian).'],
          ['Sigmoid', 'Element-wise sigmoid.'],
        ]}
      />
    </>
  )
}

/* ── DATASETS ── */
export function SectionDatasets() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Data</Eyebrow>
        <DocH1>Dataset <em>Abstractions</em></DocH1>
        <p className={styles.headerDesc}>
          mmap-backed image loading and column-major tabular storage. RSS stays bounded
          regardless of dataset size.
        </p>
      </div>

      <DocH2>ImageDataset</DocH2>
      <DocP>
        mmap-backed IDX loader. Images are page-faulted on demand — RSS stays bounded
        regardless of dataset size.
      </DocP>
      <Pre lang="C++" code={imageDatasetCode} />

      <DocH2>TabularDataset</DocH2>
      <DocP>In-memory column-major store for numeric CSVs or Eigen matrices.</DocP>
      <Pre lang="C++" code={tabularCode} />
    </>
  )
}

const imageDatasetCode = `<span class="tp">ImageDataset</span> train = <span class="fn">load_emnist_letters</span>(<span class="str">"data/Emnist Letters"</span>, <span class="kw">true</span>);
<span class="tp">ImageDataset</span> test  = <span class="fn">load_fashion_mnist</span>(<span class="str">"data/Fashion MNIST"</span>,   <span class="kw">false</span>);
train.<span class="fn">compute_normalization</span>();
test.<span class="fn">apply_normalization_from</span>(train);`

const tabularCode = `<span class="cmt">// From CSV — last column is the target by default</span>
<span class="tp">TabularDataset</span> ds = <span class="fn">load_csv</span>(<span class="str">"boston.csv"</span>);
ds.<span class="fn">compute_normalization</span>();
ds.<span class="fn">compute_target_normalization</span>();

<span class="cmt">// From Eigen matrices</span>
<span class="tp">TabularDataset</span> ds = <span class="tp">TabularDataset</span>::<span class="fn">from_matrices</span>(X_features, y_targets);`

/* ── TRAINING ── */
export function SectionTraining() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Training</Eyebrow>
        <DocH1>Training <em>Loops</em></DocH1>
        <p className={styles.headerDesc}>
          One call to kick off training. Shuffling, batching, and scheduler stepping are handled
          automatically.
        </p>
      </div>

      <Pre lang="C++" code={trainingCode} />

      <DocP>
        Both loops shuffle each epoch, skip partial batches, and call{' '}
        <InlineCode>optim.epoch_end()</InlineCode> for scheduler stepping.
      </DocP>

      <Callout green>
        <strong>Regression note:</strong> <InlineCode>train_regression</InlineCode> normalises
        targets automatically during training and de-normalises RMSE back into original units
        for reporting.
      </Callout>
    </>
  )
}

const trainingCode = `<span class="cmt">// Classification — cross-entropy loss + accuracy per epoch</span>
<span class="fn">train_module</span>(net, optim, train_set, test_set, epochs, batch_size);

<span class="cmt">// Regression — normalises targets, reports RMSE in original units</span>
<span class="fn">train_regression</span>(net, optim, train_set, test_set, epochs, batch_size);`

/* ── PERSISTENCE ── */
export function SectionPersistence() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>I/O</Eyebrow>
        <DocH1>Model <em>Persistence</em></DocH1>
        <p className={styles.headerDesc}>
          Custom .sand binary format — compact, versioned, and normalisation-aware.
        </p>
      </div>

      <DocP>
        The <InlineCode>.sand</InlineCode> format uses a 4-word header, an optional
        normalisation block, and Linear weight blocks in DFS traversal order. Include{' '}
        <InlineCode>sandokan/io.h</InlineCode> to use it.
      </DocP>

      <Pre lang="C++" code={persistCode} />
    </>
  )
}

const persistCode = `<span class="kw">#include</span> <span class="str">&lt;sandokan/io.h&gt;</span>

<span class="cmt">// Save weights only</span>
<span class="fn">save_model</span>(net, <span class="str">"letter_net.sand"</span>);

<span class="cmt">// Save weights + normalisation state</span>
<span class="fn">save_model</span>&lt;<span class="tp">TabularDataset</span>&gt;(net, <span class="str">"model.sand"</span>, ds);

<span class="cmt">// Load</span>
<span class="fn">load_model</span>(net, <span class="str">"letter_net.sand"</span>);
<span class="fn">load_model</span>&lt;<span class="tp">TabularDataset</span>&gt;(net, <span class="str">"model.sand"</span>, ds);`

/* ── INFERENCE ── */
export function SectionInference() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>I/O</Eyebrow>
        <DocH1><em>Inference</em></DocH1>
        <p className={styles.headerDesc}>
          Predict, rank top-K results, and display ASCII visualizations. Include
          sandokan/inference.h.
        </p>
      </div>

      <Pre lang="C++" code={inferCode} />
    </>
  )
}

const inferCode = `<span class="kw">#include</span> <span class="str">&lt;sandokan/inference.h&gt;</span>

<span class="cmt">// Single prediction — {label, confidence}</span>
<span class="kw">auto</span> pred = <span class="fn">predict</span>(net, x);

<span class="cmt">// Top-K predictions</span>
<span class="kw">auto</span> topk = <span class="fn">predict_topk</span>(net, x, <span class="num">5</span>);

<span class="cmt">// ASCII art preview + ranked confidence list</span>
<span class="fn">show_prediction</span>(raw_image, true_label, topk, label_names);`

/* ── PERFORMANCE ── */
export function SectionPerformance() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Reference</Eyebrow>
        <DocH1>Benchmark <em>Results</em></DocH1>
        <p className={styles.headerDesc}>
          Apple Silicon (M-series) · EIGEN_USE_BLAS · 784→64→64→26 · batch=128.
        </p>
      </div>

      <DocH2>EMNIST Letters — 124 800 training samples</DocH2>
      <Table
        head={['Backend', 'Total (ms)', 'ms / epoch', 'ms / sample', 'Samples / sec']}
        rows={[
          ['Sandokan single-sample',      '7 540', '1 508', '0.0121', '82 757'],
          ['Eigen single-sample',         '9 257', '1 851', '0.0148', '67 408'],
          ['Sandokan batched + parallel', '386',   '77',    '0.0006', '1 615 666'],
          ['Eigen batched',               '614',   '123',   '0.0010', '1 015 951'],
        ]}
      />

      <DocH2>Fashion MNIST — 60 000 training samples</DocH2>
      <Table
        head={['Backend', 'ms / epoch', 'Samples / sec']}
        rows={[
          ['Sandokan batched + parallel', '34.4', '1 742 000'],
          ['Eigen batched',               '40.9', '1 464 000'],
        ]}
      />

      <Callout>
        Sandokan&apos;s batched path is <strong>19.5× faster than single-sample</strong> and{' '}
        <strong>1.5× faster than plain Eigen batched</strong> on EMNIST Letters.
      </Callout>
    </>
  )
}

/* ── EXAMPLES ── */
export function SectionExamples() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Reference</Eyebrow>
        <DocH1>Included <em>Examples</em></DocH1>
        <p className={styles.headerDesc}>
          Run all examples from the project root so relative data/ paths resolve correctly.
        </p>
      </div>

      <Table
        head={['Example', 'Task', 'Dataset']}
        rows={[
          ['emnist_letters',       '26-class letter recognition',                    'EMNIST Letters'],
          ['tabular_demo',         'Generic CSV classification',                      'any numeric CSV'],
          ['benchmark',            'Full timing sweep (single / batched / Module)',   'EMNIST Letters'],
          ['emnist_bench',         'Sandokan vs Eigen — per-epoch CSV + figure',     'EMNIST Letters'],
          ['fashion_mnist_bench',  'Sandokan vs Eigen — per-epoch CSV + figure',     'Fashion MNIST'],
        ]}
      />

      <Pre lang="bash" code={examplesCode} />
    </>
  )
}

const examplesCode =
  `./build/examples/emnist_letters/emnist_letters\n` +
  `./build/examples/emnist_bench/emnist_bench\n` +
  `./build/examples/fashion_mnist_bench/fashion_mnist_bench`

/* ── ACCURACY ── */
export function SectionAccuracy() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Reference</Eyebrow>
        <DocH1>Accuracy <em>Results</em></DocH1>
        <p className={styles.headerDesc}>
          Measured on standard benchmarks using the built-in training loops.
        </p>
      </div>

      <Table
        head={['Dataset', 'Architecture', 'Optimizer', 'Result']}
        rows={[
          ['EMNIST Letters', '784 → 64 → ResBlock(64) → 26', 'Adam + LinearLR', '88.25% test accuracy'],
          ['Fashion MNIST',  '784 → 64 → 64 → 10',           'SGD',             '~85% (converges)'],
        ]}
      />
    </>
  )
}

/* ── MMAP ── */
export function SectionMmap() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Internals</Eyebrow>
        <DocH1>Memory-Mapped <em>Datasets</em></DocH1>
        <p className={styles.headerDesc}>
          <InlineCode>ImageDataset</InlineCode> maps the raw IDX file into virtual memory with{' '}
          <InlineCode>mmap()</InlineCode>. RSS stays bounded regardless of dataset size.
        </p>
      </div>

      <DocP>
        When you call <InlineCode>load_emnist_letters()</InlineCode> or{' '}
        <InlineCode>load_fashion_mnist()</InlineCode>, Sandokan opens the IDX file and maps it
        into the process&apos;s virtual address space. No data is copied into RAM at that point —
        the mapping is a promise: any virtual address in the range that gets read will be backed
        by the corresponding bytes from the file.
      </DocP>

      <DocP>
        Accessing <InlineCode>image[i]</InlineCode> via <InlineCode>operator[]</InlineCode>{' '}
        computes the byte offset for sample <em>i</em> and reads from that virtual address. If
        the page holding that sample has not been accessed before, the CPU raises a page fault,
        the OS loads the 4 KB page from disk, and execution continues transparently. Only pages
        you actually touch ever enter physical RAM.
      </DocP>

      <DocH2>Why this matters</DocH2>

      <DocP>
        The full EMNIST Letters dataset is roughly 47 MB on disk. A typical mini-batch of 128
        samples spans a small number of 4 KB pages. After a few epochs, the frequently accessed
        pages converge and the OS keeps them resident. The effective RSS is a fraction of the
        total dataset size — bounded by the working set of pages touched in one epoch, not by
        the file size.
      </DocP>

      <Callout>
        <strong>The kernel manages caching.</strong> When free RAM is needed elsewhere, the OS
        can evict clean mmap pages at zero cost — they can always be re-faulted from the
        original file. No explicit cache management is needed in application code.
      </Callout>

      <DocH2>Diagram</DocH2>
      <DiagramMmap />
    </>
  )
}

/* ── PARALLEL ── */
export function SectionParallel() {
  return (
    <>
      <div className={styles.header}>
        <Eyebrow>Internals</Eyebrow>
        <DocH1>Batch <em>Parallelism</em></DocH1>
        <p className={styles.headerDesc}>
          128 samples. One matrix multiply. Apple AMX tiles handle the rest.
        </p>
      </div>

      <DocP>
        In single-sample mode, each training step calls <InlineCode>forward()</InlineCode> once
        per sample — 128 separate matrix-vector products per layer. Batched mode reshapes this
        into a single matrix-matrix product (GEMM): <InlineCode>[128×784] · [784×64]</InlineCode>{' '}
        at once. A single GEMM is far more efficient than 128 matrix-vector multiplies because
        it amortises loop overhead, maximises cache reuse, and exposes parallelism across all
        output rows simultaneously.
      </DocP>

      <DocP>
        When <InlineCode>EIGEN_USE_BLAS</InlineCode> is set and Accelerate is linked, Eigen
        routes all GEMM calls through Apple&apos;s Accelerate BLAS, which dispatches to the AMX
        co-processor built into Apple Silicon. AMX divides the output matrix into fixed-size tiles
        and processes multiple tiles concurrently using dedicated multiply-accumulate hardware. The
        host CPU submits work to AMX and is free to progress while tiles compute in parallel.
      </DocP>

      <DocH2>PMAD Slab role</DocH2>

      <DocP>
        The PMAD allocator ensures the backward pass is equally fast. All gradient buffers —
        weight gradients and bias gradients for every layer — are pre-allocated in a single
        contiguous slab before training begins. During backward, no <InlineCode>malloc()</InlineCode>{' '}
        or <InlineCode>free()</InlineCode> is called; gradient writes go directly to known,
        fixed addresses in the slab. Combined with batched GEMM, this eliminates all dynamic
        allocation from the hot training path.
      </DocP>

      <Callout green>
        <strong>Result:</strong> Sandokan&apos;s batched path reaches 1.6 M samples/sec on
        EMNIST Letters (Apple M-series) — <strong>19.5× faster than single-sample</strong> and{' '}
        <strong>1.5× faster than plain Eigen batched</strong>.
      </Callout>

      <DocH2>Diagram</DocH2>
      <DiagramParallel />
    </>
  )
}

/* re-export for unused imports */
export { DocH2, DocH3 }
