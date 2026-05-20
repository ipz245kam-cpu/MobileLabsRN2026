# Лабораторна робота №3 — Gesture Clicker

## Що реалізовано
- Гра-клікер з 6 типами жестів
- TapGestureHandler — одиночний клік (+1 очко)
- TapGestureHandler — подвійний клік (+2 очки)
- LongPressGestureHandler — утримання 3 секунди (+5 очок)
- PanGestureHandler — перетягування об'єкта
- FlingGestureHandler — свайп вправо/вліво (+1-10 очок)
- PinchGestureHandler — масштабування (+3 очки)
- Екран завдань з прогресом виконання
- Екран налаштувань зі статистикою

## Структура
- `app/index.js` — навігація та стан
- `screens/GameScreen.js` — головний екран гри
- `screens/ChallengesScreen.js` — екран завдань
- `screens/SettingsScreen.js` — екран налаштувань

## Запуск
npm install
npx expo start
