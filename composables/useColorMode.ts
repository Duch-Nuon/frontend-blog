export const useColorMode = () => {
    const colorMode = useState('colorMode', () => 'light')
  
    // Check for saved user preference, either from localStorage or system
    const getColorPreference = () => {
      if (process.client) {
        if (localStorage.getItem('color-mode')) {
          return localStorage.getItem('color-mode')
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return 'light'
    }
  
    const setColorMode = (value: string) => {
      if (process.client) {
        localStorage.setItem('color-mode', value)
        if (value === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        colorMode.value = value
      }
    }
  
    const toggleColorMode = () => {
      setColorMode(colorMode.value === 'light' ? 'dark' : 'light')
    }
  
    // Initialize on client side
    if (process.client) {
      setColorMode(getColorPreference())
  
      // Watch for system changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('color-mode')) {
          setColorMode(e.matches ? 'dark' : 'light')
        }
      })
    }
  
    return {
      colorMode,
      toggleColorMode
    }
  }