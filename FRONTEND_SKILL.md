Ты — senior frontend-разработчик с глубоким пониманием CRO (Conversion Rate Optimization) и UI/UX.
Твоя задача — переделать первый экран (HeroScreen) лендинга NEVA LAB так, чтобы его конверсионная сила
поднялась с текущих 3/10 до 8/10.

Ниже — точное техническое задание. Выполняй пункты строго по порядку приоритетов.
Не добавляй ничего лишнего. Не пропускай ни один пункт.

---

# СТЕК ПРОЕКТА

- React 19 + Vite 7
- Framer Motion 12 (уже установлен, но не используется на первом экране)
- React Router DOM 7
- Шрифт: Montserrat (400, 500, 600, 700)
- CSS-модули не используются — обычные .css файлы

---

# СТРУКТУРА ФАЙЛОВ ПЕРВОГО ЭКРАНА

```
src/
├── components/Header/Header.jsx + Header.css
├── pages/FirstPage/HeroScreen/
│   ├── HeroScreen.jsx + HeroScreen.css
│   ├── BG_FOR_NEVA_LAB.jpg
│   └── components/HeroSection/
│       ├── HeroSection.jsx
│       └── HeroSection.css
```

---

# P0 — КРИТИЧЕСКИЕ ИЗМЕНЕНИЯ (без них конверсия <= 30%)

## 1. Переписать заголовочный блок

Текущий код в `HeroSection.jsx`:
```jsx
<h1 className="hero__title">Студенческая лаборатория</h1>
<h2 className="hero__subtitle">цифровых технологий</h2>
<span className="hero__brand">NEVA</span>
```

Заменить на:
```jsx
<span className="hero__brand">NEVA</span>
<h1 className="hero__title">Прокачай реальные IT-навыки в команде единомышленников</h1>
<p className="hero__subtitle">
  Студенческая лаборатория цифровых технологий — делай настоящие проекты,
  получай менторство и собирай портфолио ещё до выпуска
</p>
```

Требования к стилям заголовка `.hero__title`:
- Размер: `clamp(28px, 4.5vw, 56px)`
- Вес: 700
- Цвет: `#1e3a6e` (тёмный, контрастный на голубом фоне)
- `line-height: 1.15`
- `max-width: 800px`, по центру
- `text-align: center`

Требования к `.hero__subtitle`:
- Размер: `clamp(16px, 2vw, 22px)`
- Вес: 400
- Цвет: `#3d5a80`
- `line-height: 1.5`
- `max-width: 620px`, по центру
- `margin-top: 16px`

Бренд `.hero__brand`:
- Размер: `clamp(20px, 2.5vw, 32px)`
- Вес: 600
- Цвет: `#5176af`
- `letter-spacing: clamp(3px, 0.5vw, 8px)`
- `text-transform: uppercase`
- Располагается НАД заголовком h1, как лейбл

---

## 2. Добавить блок цифр (социальные доказательства)

Сразу после `.hero__subtitle` добавить:
```jsx
<div className="hero__stats">
  <div className="hero__stat">
    <span className="hero__stat-number">150+</span>
    <span className="hero__stat-label">участников</span>
  </div>
  <div className="hero__stat">
    <span className="hero__stat-number">30+</span>
    <span className="hero__stat-label">проектов</span>
  </div>
  <div className="hero__stat">
    <span className="hero__stat-number">5</span>
    <span className="hero__stat-label">направлений</span>
  </div>
  <div className="hero__stat">
    <span className="hero__stat-number">2</span>
    <span className="hero__stat-label">года работы</span>
  </div>
</div>
```

Стили `.hero__stats`:
- `display: flex`, `gap: clamp(24px, 4vw, 56px)`, `justify-content: center`, `flex-wrap: wrap`
- `margin-top: clamp(24px, 3vw, 40px)`

Стили `.hero__stat-number`:
- Размер: `clamp(28px, 3.5vw, 44px)`
- Вес: 700
- Цвет: `#1e3a6e`
- `display: block`

Стили `.hero__stat-label`:
- Размер: `clamp(12px, 1.2vw, 16px)`
- Вес: 400
- Цвет: `#5a7aa0`
- `display: block`
- `text-align: center`

На мобилке (<=480px) — сетка 2x2 с `gap: 16px 32px`.

---

## 3. Усилить CTA-кнопку

Текущий код:
```jsx
<button className="hero__cta">Присоединиться</button>
```

Заменить на:
```jsx
<div className="hero__cta-block">
  <button className="hero__cta" onClick={() => {/* прокрутка к форме или открытие модалки */}}>
    Присоединиться бесплатно
  </button>
  <p className="hero__cta-hint">Без опыта. Старт каждый месяц</p>
</div>
```

Текст кнопки: **«Присоединиться бесплатно»**

Стили `.hero__cta-hint`:
- Размер: `clamp(12px, 1.2vw, 15px)`
- Вес: 400
- Цвет: `#5a7aa0`
- `margin-top: 12px`
- `text-align: center`

Стили кнопки оставить текущие, но обновить:
- Текст кнопки: цвет `#ffffff`
- Фон: `linear-gradient(135deg, #2c5aa0 0%, #4a7fd4 100%)` — сделать кнопку КОНТРАСТНОЙ (тёмная на светлом фоне)
- Hover-фон: `linear-gradient(135deg, #1e4a8a 0%, #3a6fc4 100%)`
- Тень: `0 8px 25px rgba(44, 90, 160, 0.35)`

---

## 4. Убрать position: absolute — переверстать в нормальный поток

Текущая проблема: `.content_about__block` и `.button_container` используют `position: absolute`,
из-за чего контент разлетается и между заголовком и кнопкой — пустая дыра.

Новая структура `HeroSection.jsx`:
```jsx
import { motion } from 'framer-motion'
import './HeroSection.css'

function HeroSection() {
  return (
    <section className="hero">
      <motion.div
        className="hero__content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <span className="hero__brand">NEVA</span>
        <h1 className="hero__title">
          Прокачай реальные IT-навыки в команде единомышленников
        </h1>
        <p className="hero__subtitle">
          Студенческая лаборатория цифровых технологий — делай настоящие проекты,
          получай менторство и собирай портфолио ещё до выпуска
        </p>

        <div className="hero__directions">
          <span className="hero__direction">Веб-разработка</span>
          <span className="hero__direction">Мобильные приложения</span>
          <span className="hero__direction">Искусственный интеллект</span>
          <span className="hero__direction">UI/UX Дизайн</span>
          <span className="hero__direction">Data Science</span>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">150+</span>
            <span className="hero__stat-label">участников</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">30+</span>
            <span className="hero__stat-label">проектов</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">5</span>
            <span className="hero__stat-label">направлений</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">2</span>
            <span className="hero__stat-label">года работы</span>
          </div>
        </div>

        <div className="hero__cta-block">
          <button className="hero__cta">Присоединиться бесплатно</button>
          <p className="hero__cta-hint">Без опыта. Старт каждый месяц</p>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
```

Новые стили `.hero` и `.hero__content`:
```css
.hero {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(40px, 5vw, 80px) 20px;
}

.hero__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 900px;
  width: 100%;
  gap: 0;
}
```

УДАЛИТЬ полностью: `.content_about__block`, `.content_about`, `.button_container`,
и все связанные с ними `position: absolute` правила.

---

# P1 — ВАЖНЫЕ УЛУЧШЕНИЯ

## 5. Добавить логотип в хедер

В `Header.jsx` добавить лого перед навигацией:
```jsx
<header className="header">
  <div className="header__logo">NEVA</div>
  <nav className="header__nav">
    ...
  </nav>
</header>
```

Стили `.header`:
- `display: flex`, `justify-content: space-between`, `align-items: center`

Стили `.header__logo`:
- Размер: `clamp(18px, 2vw, 24px)`
- Вес: 700
- Цвет: `#1e3a6e`
- `letter-spacing: 4px`

На мобилке (<=480px): лого по центру сверху, навигация под ним.

---

## 6. Добавить блок направлений (теги)

Между `.hero__subtitle` и `.hero__stats` (уже включён в структуру пункта 4):
```jsx
<div className="hero__directions">
  <span className="hero__direction">Веб-разработка</span>
  <span className="hero__direction">Мобильные приложения</span>
  <span className="hero__direction">Искусственный интеллект</span>
  <span className="hero__direction">UI/UX Дизайн</span>
  <span className="hero__direction">Data Science</span>
</div>
```

Стили `.hero__directions`:
- `display: flex`, `flex-wrap: wrap`, `justify-content: center`, `gap: 8px 12px`
- `margin-top: clamp(16px, 2vw, 24px)`

Стили `.hero__direction`:
- `padding: 6px 16px`
- `border-radius: 999px`
- `background: rgba(255, 255, 255, 0.5)`
- `backdrop-filter: blur(4px)`
- `font-size: clamp(12px, 1.2vw, 15px)`
- `font-weight: 500`
- `color: #2c5aa0`
- `border: 1px solid rgba(44, 90, 160, 0.15)`

---

## 7. Усилить контраст текста

Заменить все бледные цвета первого экрана:
- Заголовок h1: с `#5f7fb0` на `#1e3a6e`
- Подзаголовок: с `#8192b3` на `#3d5a80`
- Бренд: с `#5176af` на `#2c5aa0`

Это увеличит читаемость на светло-голубом фоне минимум в 2 раза.

---

## 8. Оптимизация фона

- Конвертировать `BG_FOR_NEVA_LAB.jpg` (683 КБ) в формат WebP → ожидаемый размер ~200-300 КБ
- Сохранить как `BG_FOR_NEVA_LAB.webp`
- В CSS использовать:
```css
.hero_screen_bg {
  min-height: 100vh;
  background-image: url('./BG_FOR_NEVA_LAB.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```
- Оставить jpg как fallback можно, но для современных браузеров webp приоритетнее

---

## 9. Добавить favicon

- Заменить `/vite.svg` в `index.html` на брендированный favicon NEVA
- Минимум: простая иконка с буквой «N» в стиле лаборатории
- Форматы: `.svg` (для вектора) или `.ico` / `.png` 32x32

---

## 10. Исправить CSS-баг

В текущем `.content_about__block`:
```css
display: inline-block;
flex-direction: column;
```
`inline-block` не поддерживает `flex-direction` — это конфликт.
При переверстке (пункт 4) этот класс удаляется целиком, баг уходит автоматически.

---

# P2 — ПОЛИРОВКА

## 11. Анимация появления через Framer Motion

Framer Motion уже установлен. Обернуть `.hero__content` в `motion.div` (см. пункт 4).

Дополнительно — поэтапное появление элементов:
```jsx
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}
```

Применить `stagger` к `.hero__content`, `fadeUp` — к каждому дочернему элементу
(brand, title, subtitle, directions, stats, cta).

---

## 12. Индикатор скролла

Добавить внизу первого экрана анимированную стрелку вниз:
```jsx
<motion.div
  className="hero__scroll-hint"
  animate={{ y: [0, 8, 0] }}
  transition={{ repeat: Infinity, duration: 1.5 }}
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12l7 7 7-7" stroke="#5a7aa0" strokeWidth="2" strokeLinecap="round"/>
  </svg>
</motion.div>
```

Стили:
- `position: absolute`, `bottom: 24px`, `left: 50%`, `transform: translateX(-50%)`
- `opacity: 0.6`

---

## 13. Sticky-хедер при скролле

Добавить в `Header.css`:
```css
.header {
  position: sticky;
  top: 0;
  background: rgba(240, 247, 255, 0.85);
  backdrop-filter: blur(12px);
  transition: box-shadow 0.3s ease;
  z-index: 100;
}

.header--scrolled {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}
```

В `Header.jsx` — отслеживать скролл через `useEffect` + `useState` и добавлять класс
`.header--scrolled` при `scrollY > 50`.

---

## 14. SEO-оптимизация

В `index.html` добавить:
```html
<meta name="description" content="NEVA — студенческая лаборатория цифровых технологий. Реальные IT-проекты, менторство, портфолио. Присоединяйся бесплатно!">
<meta name="keywords" content="студенческая лаборатория, IT, веб-разработка, AI, мобильные приложения, NEVA">
<meta property="og:title" content="NEVA — Прокачай IT-навыки в команде">
<meta property="og:description" content="Делай реальные проекты, получай менторство и собирай портфолио ещё до выпуска">
<meta property="og:type" content="website">
```

Обновить `<title>`:
```html
<title>NEVA — Студенческая IT-лаборатория | Реальные проекты и менторство</title>
```

---

# ИТОГОВАЯ СТРУКТУРА ПЕРВОГО ЭКРАНА ПОСЛЕ ВСЕХ ИЗМЕНЕНИЙ

```
┌──────────────────────────────────────────────────┐
│  NEVA (лого)          О лаб. | Напр. | Проекты  │  ← sticky header
├──────────────────────────────────────────────────┤
│                                                  │
│                    N E V A                        │  ← бренд-лейбл
│                                                  │
│        Прокачай реальные IT-навыки                │  ← h1 заголовок
│      в команде единомышленников                   │
│                                                  │
│   Студенческая лаборатория цифровых технологий   │  ← подзаголовок
│   — делай настоящие проекты, получай менторство  │
│     и собирай портфолио ещё до выпуска           │
│                                                  │
│  [Веб] [Мобайл] [AI] [Дизайн] [Data Science]    │  ← теги направлений
│                                                  │
│    150+          30+         5          2         │  ← цифры
│  участников    проектов  направлений  года        │
│                                                  │
│        ┌──────────────────────────────┐          │
│        │  Присоединиться бесплатно    │          │  ← CTA (контрастная)
│        └──────────────────────────────┘          │
│        Без опыта. Старт каждый месяц             │  ← микро-копирайтинг
│                                                  │
│                    ↓                              │  ← scroll hint
└──────────────────────────────────────────────────┘
```

---

# ЧЕКЛИСТ ПРОВЕРКИ ПОСЛЕ РЕАЛИЗАЦИИ

- [ ] Заголовок отвечает на вопрос «Что я получу?» за 2 секунды
- [ ] Подзаголовок объясняет кто это и для кого
- [ ] Бренд NEVA виден, но не доминирует над оффером
- [ ] Есть минимум 3 числовых доказательства
- [ ] CTA-кнопка контрастная (тёмная на светлом), с текстом «бесплатно»
- [ ] Под кнопкой есть снятие возражений (микро-копирайтинг)
- [ ] Контент идёт в нормальном потоке (никаких position: absolute для контента)
- [ ] Контраст текста проходит WCAG AA на голубом фоне
- [ ] Анимация появления работает плавно (Framer Motion)
- [ ] Логотип в хедере присутствует
- [ ] На мобилке (375px) всё читаемо и ничего не наезжает
- [ ] Фон оптимизирован (WebP, < 300 КБ)
- [ ] Favicon заменён на брендированный
- [ ] Meta-теги для SEO и OG добавлены
- [ ] Кнопка имеет обработчик клика (скролл к форме или открытие модалки)
