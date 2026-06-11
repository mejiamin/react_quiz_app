import { useNavigate } from 'react-router-dom'
import styles from './welcomePage.module.css'

export const WelcomePage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.card}>
      <h2>🌍 Викторина по странам</h2>
      <p>Выберите количество вопросов:</p>

      <div className={styles.counter}>
        <button className={styles.btn}>-</button>
        <span className={styles.value}>Count</span>
        <button className={styles.btn}>+</button>
      </div>

      <button className={styles.startBtn}>
        Начать
      </button>
    </div>
  );
}
