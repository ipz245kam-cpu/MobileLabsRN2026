import { createSlice } from "@reduxjs/toolkit";

const initialProducts = [
  {
    id: "1",
    name: "Навушники Sony WH-1000XM5",
    description: "Бездротові навушники з шумозаглушенням",
    price: 8999,
    image: "https://picsum.photos/id/1/300/300",
  },
  {
    id: "2",
    name: "Смартфон Samsung Galaxy S24",
    description: "Флагманський смартфон з AI-функціями",
    price: 32999,
    image: "https://picsum.photos/id/2/300/300",
  },
  {
    id: "3",
    name: "Ноутбук Apple MacBook Air M3",
    description: "Легкий ноутбук з потужним чипом M3",
    price: 54999,
    image: "https://picsum.photos/id/3/300/300",
  },
  {
    id: "4",
    name: "Планшет iPad Pro 11",
    description: "Професійний планшет для роботи і творчості",
    price: 28999,
    image: "https://picsum.photos/id/4/300/300",
  },
  {
    id: "5",
    name: "Розумний годинник Apple Watch Series 9",
    description: "Стильний годинник з функціями здоров'я",
    price: 14999,
    image: "https://picsum.photos/id/5/300/300",
  },
  {
    id: "6",
    name: "Клавіатура Logitech MX Keys",
    description: "Бездротова клавіатура для продуктивної роботи",
    price: 4999,
    image: "https://picsum.photos/id/6/300/300",
  },
];

const productsSlice = createSlice({
  name: "products",
  initialState: { list: initialProducts },
  reducers: {},
});

export default productsSlice.reducer;