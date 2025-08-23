const styles = {
  root: 'min-h-screen bg-slate-50',
  header: 'sticky top-0 z-10 bg-white/80 backdrop-blur border-b',
  headerInner: 'mx-auto max-w-6xl flex items-center justify-between p-4',
  brand: 'text-lg font-semibold',
  nav: 'hidden md:flex items-center gap-4 text-sm text-slate-600',
  navLink: 'hover:text-indigo-600',

  container: 'mx-auto max-w-6xl p-6',
  intro: 'mb-4',
  title: 'text-2xl font-bold',
  subtitle: 'text-sm text-slate-600',

  main: 'mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
  card: 'rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
  cardHeader: 'flex items-center gap-3',
  icon: 'text-2xl',
  cardTitle: 'font-semibold',
  cardText: 'text-sm text-slate-600',
  cardActions: 'mt-3',
  btn: 'inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50',
}

export default function Dashboard() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>Placement Portal</div>
          <nav className={styles.nav}>
            <a className={styles.navLink} href="#">
              Coding Questions
            </a>
            <a className={styles.navLink} href="#">
              Company-wise
            </a>
            <a className={styles.navLink} href="#">
              Quizzes
            </a>
            <a className={styles.navLink} href="#">
              Reports
            </a>
            <a className={styles.navLink} href="#">
              Profile
            </a>
          </nav>
        </div>
      </header>

      <div className={styles.container}>
        <section className={styles.intro}>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>
            Quick access to practice, quizzes, and reports.
          </p>
        </section>

        <main className={styles.main}>
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.icon}>💻</div>
              <h2 className={styles.cardTitle}>Coding Questions</h2>
            </div>
            <p className={styles.cardText}>Search and filter by difficulty.</p>
            <div className={styles.cardActions}>
              <button className={styles.btn}>Browse</button>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.icon}>📝</div>
              <h2 className={styles.cardTitle}>Quizzes</h2>
            </div>
            <p className={styles.cardText}>Timed quizzes with scorecards.</p>
            <div className={styles.cardActions}>
              <button className={styles.btn}>Start</button>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.icon}>🏢</div>
              <h2 className={styles.cardTitle}>Company-wise</h2>
            </div>
            <p className={styles.cardText}>Explore interview experiences.</p>
            <div className={styles.cardActions}>
              <button className={styles.btn}>Explore</button>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.icon}>📊</div>
              <h2 className={styles.cardTitle}>Reports</h2>
            </div>
            <p className={styles.cardText}>Track your progress and scores.</p>
            <div className={styles.cardActions}>
              <button className={styles.btn}>View</button>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.icon}>👤</div>
              <h2 className={styles.cardTitle}>Profile</h2>
            </div>
            <p className={styles.cardText}>Manage your details and settings.</p>
            <div className={styles.cardActions}>
              <button className={styles.btn}>Edit</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
