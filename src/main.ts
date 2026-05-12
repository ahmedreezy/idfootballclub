import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// v-reveal directive — slides elements in when they enter the viewport
// Usage: v-reveal (up), v-reveal.left, v-reveal.right
// Pass a number for stagger delay: v-reveal="2" → 200ms delay
app.directive('reveal', {
  mounted(el: HTMLElement, binding) {
    const mod = binding.modifiers
    if (mod.left) el.classList.add('reveal-left')
    else if (mod.right) el.classList.add('reveal-right')
    else el.classList.add('reveal')

    if (typeof binding.value === 'number' && binding.value >= 1) {
      el.classList.add(`reveal-d${Math.min(binding.value, 5)}`)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
  },
})

app.mount('#app')
