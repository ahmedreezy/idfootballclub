import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Reactively tracks the current kit theme by observing the data-kit-theme
 * attribute on the root app element.
 * - 'home' = light mode (cream/beige backgrounds) → use black logo
 * - 'away' = dark mode (navy backgrounds)         → use white logo
 */
export function useKitTheme() {
  const isLightMode = ref(false)

  function update() {
    const el = document.querySelector('[data-kit-theme]')
    isLightMode.value = el?.getAttribute('data-kit-theme') !== 'away'
  }

  let observer: MutationObserver | undefined

  onMounted(() => {
    update()
    const el = document.querySelector('[data-kit-theme]')
    if (el) {
      observer = new MutationObserver(update)
      observer.observe(el, { attributes: true, attributeFilter: ['data-kit-theme'] })
    }
  })

  onUnmounted(() => observer?.disconnect())

  return { isLightMode }
}
