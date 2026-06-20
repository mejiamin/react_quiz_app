import { useLocation } from 'react-router-dom'
import styles from './resultsPage.module.css'

export const ResultsPage = () => {
  const location = useLocation()

  const history = location.state?.history || []

  return (
    <div className={styles.container}>
      <h2>Разбор полетов</h2>

      <div className={styles.list}>
        {history.map((item, index) => (
          <div
            key={index}
            className={`${styles.item} ${item.isCorrect ? styles.correct : styles.wrong}`}
          >
            <img
              src={item.flag}
              alt="Флаг"
              className={styles.flag}
            />

            <div className={styles.info}>
              <p><strong>Вопрос {index + 1}:</strong> {item.question}</p>

              <p>Ваш ответ: <span className={styles.badge}>{item.userAns}</span></p>

              {!item.isCorrect && (
                <p>Правильный ответ: <strong>{item.correctAns}</strong></p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
