### Технологии
- React
- React Router
- Vite
- CSS Modules

---

### Всего 4 урока:

- Урок 1: Архитектура, структура папок и настройка React Router.

- Урок 2: Каунтер (инкремент/декремент) на WelcomePage, динамическая строка прогресса в игре и каркас для разбора ошибок (верные/неверные карточки) на ResultPage.

- **Урок 3:** Самый сок логики! Импорт нашего JSON, алгоритм случайного выбора флагов, генерация 4 вариантов ответа (без дублирования правильной страны в неправильных кнопках) и обработка кликов с подсветкой (зеленый/красный).

- Урок 4: Подсчет и передача реального финального счета на ResultsPage, вывод итоговых результатов, кнопка «Играть заново» для полного сброса состояния игры и финальная полировка стилей.

---

## Урок 3: Логика вопросов, генерация вариантов без дубликатов и подсветка

Сегодня мы полностью перепишем `StartPage.jsx`. Нам нужно:

1. Взять случайные вопросы из JSON в количестве, которое пользователь выбрал на первом шаге.
2. Для каждого вопроса сгенерировать 4 кнопки: 1 правильный ответ + 3 случайных из массива `countries` (следя за тем, чтобы правильный ответ **не попал** в список неправильных).
3. Сделать кнопки интерактивными: при клике правильный вариант красится в зеленый, неверный — в красный, а остальные кнопки блокируются.

---

### Шаг 1: Обновление `StartPage.jsx`

Замени весь код в файле `src/pages/start/StartPage.jsx` на следующий. Обрати внимание на чистые функции `shuffleArray` и `generateOptions` — они находятся вне компонента, чтобы не пересоздаваться при каждом рендере.

```jsx
import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import quizData from '../../data/quiz_questions.json';
import styles from './StartPage.module.css';

// 1. Функция перемешивания массива (Алгоритм Фишера-Йетса)
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// 2. Функция генерации 4 вариантов ответов без дублирования
function generateOptions(correctAnswer, allCountries) {
  // Фильтруем массив: убираем правильный ответ 
  // из списка потенциально неправильных
  const wrongCountriesFiltered = 
    allCountries.filter(country => country !== correctAnswer);
  
  // Перемешиваем отфильтрованные страны и берем первые 3
  const randomWrongAnswers = 
    shuffleArray(wrongCountriesFiltered).slice(0, 3);
  
  // Объединяем 3 неправильных и 1 правильный,
  // затем перемешиваем их между собой
  return shuffleArray([...randomWrongAnswers, correctAnswer]);
}

export default function StartPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Получаем количество вопросов из WelcomePage (по умолчанию 10)
  const totalCount = location.state?.totalCount || 10;

  // Отбираем нужное количество
  // случайных вопросов ОДИН РАЗ за всю игру
  const questionsForGame = useMemo(() => {
    return shuffleArray(quizData.questions).slice(0, totalCount);
  }, [totalCount]);

  // Стейты для управления игрой:
  // Индекс текущего вопроса
  const [currentIndex, setCurrentIndex] = useState(0);
  // Массив из 4 вариантов ответов
  const [options, setOptions] = useState([]);
  // Какой ответ выбрал юзер (текст)
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Сбор истории ответов
  const [answersHistory, setAnswersHistory] = useState([]);

  const currentQuestion = questionsForGame[currentIndex];

  // Генерируем новые варианты ответов каждый раз,
  // когда меняется вопрос
  useEffect(() => {
    if (currentQuestion) {
      const generated = 
        generateOptions(currentQuestion.correctAnswer, quizData.countries);

      setOptions(generated);
      setSelectedAnswer(null); // Сбрасываем выбор для нового вопроса
    }
  }, [currentIndex, currentQuestion]);

  // Защита на случай, если игра завершилась или
  // вопросы не загрузились
  if (!currentQuestion) return null;

  // Обработка клика по варианту ответа
  const handleOptionClick = (chosenOption) => {
    if (selectedAnswer) return; // Если уже кликнули, 
                                // игнорируем последующие клики

    setSelectedAnswer(chosenOption);
    const isCorrect = chosenOption === currentQuestion.correctAnswer;

    // Записываем этот шаг в историю
    // (понадобится для ResultPage на Уроке 4)
    setAnswersHistory(prev => [
      ...prev,
      {
        question: currentQuestion.question,
        correctAns: currentQuestion.correctAnswer,
        userAns: chosenOption,
        isCorrect: isCorrect,
        flag: currentQuestion.flag
      }
    ]);
  };

  // Переход к следующему вопросу или завершение игры
  const handleNext = () => {
    if (currentIndex < questionsForGame.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Переходим на страницу результатов и 
      // передаем НАСТОЯЩУЮ историю
      navigate('/results', { state: { history: answersHistory } });
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.progress}>
        Вопрос {currentIndex + 1} из {questionsForGame.length}
      </div>

      <h2 className={styles.questionText}>{currentQuestion.question}</h2>
      
      <img 
        src={currentQuestion.flag} 
        alt="Флаг страны" 
        className={styles.flagImage} 
      />

      <div className={styles.optionsGrid}>
        {options.map((option, index) => {
          // Базовый класс для кнопки
          let btnClass = styles.optionBtn;

          // Если пользователь уже сделал выбор, включаем подсветку
          if (selectedAnswer) {
            if (option === currentQuestion.correctAnswer) {
              // Правильный ответ всегда зеленый
              btnClass += ` ${styles.correct}`; 
            } else if (option === selectedAnswer) {
              // Выбранный неверный — красный
              btnClass += ` ${styles.wrong}`;   
            }
          }

          return (
            <button
              key={index}
              className={btnClass}
              onClick={() => handleOptionClick(option)}
              // Блокируем кнопку после клика
              disabled={!!selectedAnswer} 
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Кнопка "Дальше" появляется 
      'только после выбора ответа */}
      {selectedAnswer && (
        <button onClick={handleNext} className={styles.nextBtn}>
          {currentIndex === questionsForGame.length - 1 
            ? 'Посмотреть результаты' 
            : 'Дальше →'
          }
        </button>
      )}
    </div>
  );
}
```

---

### Шаг 2: Стилизация CSS Modules

Теперь обновим файл **`src/pages/start/StartPage.module.css`**, добавив туда полноценные стили для сетки вариантов, флага и цветов (`.correct` и `.wrong`).

```css
.card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.progress {
  font-size: 1rem;
  font-weight: bold;
  color: #7f8c8d;
  margin-bottom: 1rem;
}

.questionText {
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  color: #2c3e50;
}

.flagImage {
  width: 100%;
  max-width: 280px;
  height: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.optionsGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.optionBtn {
  padding: 1rem;
  font-size: 1rem;
  background-color: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  color: #4a5568;
}

.optionBtn:not(:disabled):hover {
  background-color: #e2e8f0;
  border-color: #cbd5e1;
}

/* Зеленый для правильного */
.optionBtn.correct {
  background-color: #2ecc71 !important;
  border-color: #27ae60 !important;
  color: white;
}

/* Красный для ошибочного */
.optionBtn.wrong {
  background-color: #e74c3c !important;
  border-color: #c0392b !important;
  color: white;
}

.optionBtn:disabled {
  cursor: not-allowed;
}

.nextBtn {
  padding: 0.8rem 2rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  transition: background 0.2s;
}

.nextBtn:hover {
  background-color: #2980b9;
}
```

---

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

## 🎯 Проверка Урока 3:

1. Запусти игру, выбрав, например, 3 вопроса на стартовом экране.
2. Проверь логику кнопок:
* Названия стран на кнопках никогда не повторяются.
* При клике на правильную страну — она горит зеленым.
* При клике на неправильную — она горит красным, а правильная всё равно подсвечивается зеленым (чтобы подсказать верный ответ).
* После клика по кнопкам повторно кликнуть нельзя.


3. Пройди раунд до конца и нажми «Посмотреть результаты». Страница результатов (`ResultsPage`) должна автоматически отобразить твой **настоящий** разбор полетов, который ты сделал на Уроке 2.

Мы перейдем к финальному **Уроке 4**, где посчитаем итоговый счет и сделаем кнопку перезапуска викторины!