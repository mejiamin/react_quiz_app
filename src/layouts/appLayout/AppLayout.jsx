import styles from './appLayout.module.css'

export const AppLayout = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Quiz</h1>
      </header>

      <main className={styles.main}>
        {/* Здесь будет рендериться текущая страница */}
        
      </main>
    </div>
  )
}
