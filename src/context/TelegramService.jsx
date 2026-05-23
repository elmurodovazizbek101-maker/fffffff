import React, { createContext, useContext, useEffect, useState } from 'react'

const TelegramContext = createContext()

const useTelegramHook = () => {
  const context = useContext(TelegramContext)
  if (!context) {
    throw new Error('useTelegramHook must be used within a TelegramProvider')
  }
  return context
}

const TelegramProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isFromTelegram, setIsFromTelegram] = useState(false)
  const [themeParams, setThemeParams] = useState({})

  useEffect(() => {
    try {
      // Telegram Web App mavjudligini tekshirish
      if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp

        // Telegram WebApp ni ishga tushirish
        tg.ready()

        // Faqat mavjud bo'lgan funksiyalarni ishlatish
        const telegramUser = tg.initDataUnsafe?.user || null
        const fromTelegram = !!tg.initData

        setUser(telegramUser)
        setIsFromTelegram(fromTelegram)

        // Theme parametrlarini olish (agar mavjud bo'lsa)
        if (tg.themeParams) {
          setThemeParams(tg.themeParams)
        }

        // Main button ni yashirish
        if (tg.MainButton) {
          tg.MainButton.hide()
        }
      }
    } catch (error) {
      setIsFromTelegram(false)
      console.error('Telegram service initialization failed:', error)
    }
  }, [])

  const showMainButton = (text, callback) => {
    try {
      if (window.Telegram?.WebApp?.MainButton) {
        const mainButton = window.Telegram.WebApp.MainButton
        mainButton.setText(text)
        mainButton.show()
        mainButton.onClick(callback)
      }
    } catch (error) {
      // Xatolarni yashirish
    }
  }

  const hideMainButton = () => {
    try {
      if (window.Telegram?.WebApp?.MainButton) {
        window.Telegram.WebApp.MainButton.hide()
      }
    } catch (error) {
      // Xatolarni yashirish
    }
  }

  const sendCartData = (cartItems, totalPrice) => {
    try {
      if (window.Telegram?.WebApp) {
        const data = JSON.stringify({ cartItems, totalPrice })
        window.Telegram.WebApp.sendData(data)
      }
    } catch (error) {
      // Xatolarni yashirish
    }
  }

  const hapticFeedback = (type) => {
    try {
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(type)
      }
    } catch (error) {
      // Xatolarni yashirish
    }
  }

  const showAlert = (message) => {
    try {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert(message)
      } else {
        alert(message)
      }
    } catch (error) {
      alert(message)
    }
  }

  const showConfirm = (message, callback) => {
    try {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showConfirm(message, callback)
      } else {
        const result = confirm(message)
        callback(result)
      }
    } catch (error) {
      const result = confirm(message)
      callback(result)
    }
  }

  const close = () => {
    try {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.close()
      }
    } catch (error) {
      // Xatolarni yashirish
    }
  }

  return (
    <TelegramContext.Provider value={{
      user,
      isFromTelegram,
      themeParams,
      showMainButton,
      hideMainButton,
      sendCartData,
      hapticFeedback,
      showAlert,
      showConfirm,
      close
    }}>
      {children}
    </TelegramContext.Provider>
  )
}

export { TelegramProvider, useTelegramHook }
