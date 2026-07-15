import { useLocation } from 'react-router-dom'
import styles from './resultsPage.module.css'

export const ResultsPage = () => {
  const location = useLocation()

  const history = location.state?.history || []

  if (false) {
    return (
      <div className={styles.container}>
        <div className={styles.summaryCard}>
          <h2>Нет данных для отображения 😔</h2>
          <button onClick={handleRestart} className={styles.restartBtn}>
            Начать игру
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.summaryCard}>
        <h2>🎉 Игра завершена!</h2>
        <p className={styles.scoreText}>
          Ваш результат: <span>correctCount</span> из <span>totalCount</span>
        </p>
        <button className={styles.restartBtn}>
          Сыграть еще раз
        </button>
      </div>

      <h3 className={styles.subtitle}>Детальный разбор полетов:</h3>

      <div className={styles.list}>
        {history.map((item, index) => (
          <div
            key={index}
            className={`${styles.item} ${item.isCorrect ? styles.correct : styles.wrong}`}
          >
            <img src={item.flag} alt="Флаг" className={styles.flag} />
            <div className={styles.info}>
              <p className={styles.questionTitle}><strong>Вопрос {index + 1}:</strong> {item.question}</p>
              <p>Ваш ответ: <span className={styles.badge}>{item.userAns}</span></p>
              {!item.isCorrect && (
                <p>Правильный ответ: <strong>{item.correctAns}</strong></p>
              )}
            </div>
            <div className={styles.icon}>
              {item.isCorrect ? '✅' : '❌'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
