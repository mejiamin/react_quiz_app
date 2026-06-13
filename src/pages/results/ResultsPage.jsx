import styles from './resultsPage.module.css'

export const ResultsPage = () => {
  

  return (
    <div className={styles.container}>
      <h2>Разбор полетов</h2>

      <div className={styles.list}>
        {/* map */}
        <div
          className={`${styles.item}`}
        >
          <img
            src={``}
            alt="Флаг"
            className={styles.flag}
          />

          <div className={styles.info}>
            <p><strong>Вопрос 1:</strong> question</p>

            <p>Ваш ответ: <span className={styles.badge}>userAns</span></p>

            {true && (
              <p>Правильный ответ: <strong>correctAns</strong></p>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
