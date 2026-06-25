import { useLocation, useNavigate } from 'react-router-dom'
import styles from './startPage.module.css'



export const StartPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const totalCount = location.state?.totalCount || 10



  return (
    <div className={styles.card}>
      <div className={styles.progress}>
        Вопрос {1} из ...length
      </div>

      <h2 className={styles.questionText}>Страна</h2>

      <img
        alt="Флаг страны"
        className={styles.flagImage}
      />

      <div className={styles.optionsGrid}>

        {/* map */}
        <button
          className={styles.btnClass}
        >
          option
        </button>

      </div>

      {true && (
        <button className={styles.nextBtn}>
          {false
            ? 'Посмотреть результаты'
            : 'Дальше →'
          }
        </button>
      )}
    </div>
  )
}
