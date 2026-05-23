import React, { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const translations = {
  uz: {
    // Login
    login: 'Kirish',
    password: 'Parol',
    createAccount: 'Hisob yaratish',
    haveAccount: 'Hisobingiz bormi?',
    name: 'Ism',
    phone: 'Telefon raqam',

    // Navigation
    dashboard: 'Boshqaruv paneli',
    sales: 'Savdo',
    products: 'Mahsulotlar',
    categories: 'Kategoriyalar',
    debts: 'Qarzlar',
    customers: 'Mijozlar',
    suppliers: 'Ta\'minotchilar',
    expenses: 'Xarajatlar',
    employees: 'Xodimlar',
    settings: 'Sozlamalar',
    scanner: 'Skaner',

    // Dashboard
    totalSales: 'Jami sotuv',
    netProfit: 'Sof foyda',
    discount: 'Chegirma',
    activeDebts: 'Faol qarzlar',
    cash: 'Naqd pul',
    card: 'Karta puli',
    click: 'Click pul',
    debtSales: 'Qarzga sotuv',
    topProducts: 'Top mahsulotlar',
    topCustomers: 'Top mijozlar',
    debtPeriods: 'Qarz muddatlari',

    // Products
    totalProducts: 'Jami mahsulotlar',
    lowStock: 'Kam qolgan',
    outOfStock: 'Tugagan',
    create: 'Yaratish',
    select: 'Tanlash',
    productName: 'Mahsulot nomi',
    shortDescription: 'Qisqa izoh',
    category: 'Kategoriya',
    price: 'Narx',
    quantity: 'Miqdor',
    image: 'Rasm',
    save: 'Saqlash',
    cancel: 'Bekor qilish',

    // Categories
    edit: 'Tahrirlash',
    delete: 'O\'chirish',

    // Common
    search: 'Qidirish',
    add: 'Qo\'shish',
    close: 'Yopish',
    confirm: 'Tasdiqlash',

    // Units
    piece: 'Dona',
    box: 'Quti',
    meter: 'Metr',

    // Currencies
    usd: 'USD',
    uzs: 'UZS'
  },

  en: {
    // Login
    login: 'Login',
    password: 'Password',
    createAccount: 'Create Account',
    haveAccount: 'Have an account?',
    name: 'Name',
    phone: 'Phone Number',

    // Navigation
    dashboard: 'Dashboard',
    sales: 'Sales',
    products: 'Products',
    categories: 'Categories',
    debts: 'Debts',
    customers: 'Customers',
    suppliers: 'Suppliers',
    expenses: 'Expenses',
    employees: 'Employees',
    settings: 'Settings',
    scanner: 'Scanner',

    // Dashboard
    totalSales: 'Total Sales',
    netProfit: 'Net Profit',
    discount: 'Discount',
    activeDebts: 'Active Debts',
    cash: 'Cash',
    card: 'Card Money',
    click: 'Click Money',
    debtSales: 'Debt Sales',
    topProducts: 'Top Products',
    topCustomers: 'Top Customers',
    debtPeriods: 'Debt Periods',

    // Products
    totalProducts: 'Total Products',
    lowStock: 'Low Stock',
    outOfStock: 'Out of Stock',
    create: 'Create',
    select: 'Select',
    productName: 'Product Name',
    shortDescription: 'Short Description',
    category: 'Category',
    price: 'Price',
    quantity: 'Quantity',
    image: 'Image',
    save: 'Save',
    cancel: 'Cancel',

    // Categories
    edit: 'Edit',
    delete: 'Delete',

    // Common
    search: 'Search',
    add: 'Add',
    close: 'Close',
    confirm: 'Confirm',

    // Units
    piece: 'Piece',
    box: 'Box',
    meter: 'Meter',

    // Currencies
    usd: 'USD',
    uzs: 'UZS'
  },

  ru: {
    // Login
    login: 'Войти',
    password: 'Пароль',
    createAccount: 'Создать аккаунт',
    haveAccount: 'Есть аккаунт?',
    name: 'Имя',
    phone: 'Номер телефона',

    // Navigation
    dashboard: 'Панель управления',
    sales: 'Продажи',
    products: 'Товары',
    categories: 'Категории',
    debts: 'Долги',
    customers: 'Клиенты',
    suppliers: 'Поставщики',
    expenses: 'Расходы',
    employees: 'Сотрудники',
    settings: 'Настройки',
    scanner: 'Сканер',

    // Dashboard
    totalSales: 'Общие продажи',
    netProfit: 'Чистая прибыль',
    discount: 'Скидка',
    activeDebts: 'Активные долги',
    cash: 'Наличные',
    card: 'Карточные деньги',
    click: 'Click деньги',
    debtSales: 'Продажи в долг',
    topProducts: 'Топ товары',
    topCustomers: 'Топ клиенты',
    debtPeriods: 'Периоды долгов',

    // Products
    totalProducts: 'Всего товаров',
    lowStock: 'Мало на складе',
    outOfStock: 'Закончились',
    create: 'Создать',
    select: 'Выбрать',
    productName: 'Название товара',
    shortDescription: 'Краткое описание',
    category: 'Категория',
    price: 'Цена',
    quantity: 'Количество',
    image: 'Изображение',
    save: 'Сохранить',
    cancel: 'Отмена',

    // Categories
    edit: 'Редактировать',
    delete: 'Удалить',

    // Common
    search: 'Поиск',
    add: 'Добавить',
    close: 'Закрыть',
    confirm: 'Подтвердить',

    // Units
    piece: 'Штука',
    box: 'Коробка',
    meter: 'Метр',

    // Currencies
    usd: 'USD',
    uzs: 'UZS'
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('uz')

  const t = (key) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
