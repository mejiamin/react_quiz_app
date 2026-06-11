import { Outlet } from 'react-router-dom'
import styles from './appLayout.module.css'

export const AppLayout = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Quiz</h1>
      </header>

      <main className={styles.main}>

        <Outlet />

      </main>
    </div>
  )
}
