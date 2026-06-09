import styles from './welcomePage.module.css'

export const WelcomePage = () => {

  return (
    <div className={styles.card}>
      <h2>Добро пожаловать в викторину!</h2>
      <p>Проверь свои знания флагов стран мира.</p>
      <button type='button'>Начать Игру</button>
    </div>
  )
}
