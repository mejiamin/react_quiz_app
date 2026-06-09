import styles from './resultsPage.module.css'

export const ResultsPage = () => {

  return (
    <div className={styles.card}>
      <h2>Результаты</h2>
      <p>Вы ответили правильно на ... вопросов</p>
      <button type='button'>Играть снова</button>
    </div>
  )
}
