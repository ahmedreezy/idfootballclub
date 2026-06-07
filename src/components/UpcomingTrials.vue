<template>
  <section class="relative overflow-hidden border-y border-gold/20 bg-navy py-12">
    <div class="absolute inset-0 bg-[linear-gradient(110deg,rgba(212,175,55,0.16),transparent_34%,rgba(255,255,255,0.06)_56%,transparent_76%)]"></div>
    <!-- Logo watermark -->
    <img
      :src="whiteLogo"
      alt=""
      aria-hidden="true"
      class="pointer-events-none select-none absolute -top-8 -right-8 w-64 h-64 rounded-full object-cover opacity-[0.06]"
    />
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-[1.05fr_1.4fr_auto] lg:items-center">
        <div v-reveal.left>
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2">
            <span class="h-2 w-2 rounded-full bg-gold shadow-[0_0_18px_rgba(212,175,55,0.9)] animate-pulse"></span>
            <span class="font-body text-xs font-semibold uppercase tracking-widest text-gold">Next Open Trial</span>
          </div>
          <h2 class="font-heading text-3xl font-black text-white md:text-4xl">Turn Interest Into a Training Ground Visit</h2>
          <p class="font-body mt-3 max-w-xl text-white/65">Give parents a clear next step with a live trial window, coach-led assessment, and a fast route into registration.</p>
        </div>

        <div v-reveal class="grid gap-3 sm:grid-cols-3">
          <div v-for="detail in trialDetails" :key="detail.label" class="rounded-2xl border border-white/10 bg-navy-dark/70 p-5 backdrop-blur-sm">
            <p class="font-body text-xs uppercase tracking-widest text-white/40">{{ detail.label }}</p>
            <p class="font-heading mt-2 text-lg font-bold text-white">{{ detail.value }}</p>
            <p class="font-body mt-1 text-sm text-gold">{{ detail.note }}</p>
          </div>
        </div>

        <div v-reveal.right class="rounded-3xl border border-gold/30 bg-gold p-5 text-navy shadow-xl shadow-gold/20 lg:min-w-64">
          <p class="font-body text-xs font-bold uppercase tracking-widest text-navy/60">Trial starts in</p>
          <div class="mt-3 grid grid-cols-4 gap-2 text-center">
            <div v-for="unit in countdownUnits" :key="unit.label" class="rounded-xl bg-navy/10 px-2 py-3">
              <span class="font-heading block text-2xl font-black">{{ unit.value }}</span>
              <span class="font-body text-[10px] font-bold uppercase tracking-wider text-navy/60">{{ unit.label }}</span>
            </div>
          </div>
          <button @click="scrollTo('register')" class="mt-5 w-full rounded-full bg-navy px-6 py-3 font-heading font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-light">
            Secure Your Spot
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import whiteLogo from '../assets/whitelogo.jpg.png'

const trialDate = new Date('2026-06-14T10:00:00+01:00')
const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | undefined

const trialDetails = [
  { label: 'Date', value: 'Sat 14 Jun', note: '10:00 AM start' },
  { label: 'Location', value: 'Manchester', note: 'Venue confirmed by email' },
  { label: 'For Ages', value: '4 to 18+', note: 'Grouped by ability' },
]

const countdownUnits = computed(() => {
  const remaining = Math.max(0, trialDate.getTime() - now.value.getTime())
  const days = Math.floor(remaining / 86400000)
  const hours = Math.floor((remaining % 86400000) / 3600000)
  const minutes = Math.floor((remaining % 3600000) / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)

  return [
    { label: 'Days', value: days.toString().padStart(2, '0') },
    { label: 'Hrs', value: hours.toString().padStart(2, '0') },
    { label: 'Min', value: minutes.toString().padStart(2, '0') },
    { label: 'Sec', value: seconds.toString().padStart(2, '0') },
  ]
})

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
