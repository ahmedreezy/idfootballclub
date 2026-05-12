<template>
  <section id="vision" class="py-24 bg-navy-dark relative overflow-hidden">
    <!-- Background image with overlay -->
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1920&q=80"
        alt="Football stadium"
        class="w-full h-full object-cover object-center opacity-10"
      />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-16">
        <p class="section-subheading mb-2">What Drives Us</p>
        <h2 class="section-heading">Vision & Mission</h2>
        <div class="gold-divider"></div>
      </div>

      <!-- Vision + Mission cards -->
      <div class="grid md:grid-cols-2 gap-8 mb-16">
        <!-- Vision -->
        <div class="relative bg-navy border-2 border-gold/30 rounded-3xl p-8 md:p-10 overflow-hidden group hover:border-gold/60 transition-colors duration-300">
          <div class="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-gold/10 transition-colors"></div>
          <div class="relative">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center">
                <svg class="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <div>
                <span class="font-body text-gold text-xs uppercase tracking-widest">Our</span>
                <h3 class="font-heading font-black text-white text-2xl">Vision</h3>
              </div>
            </div>
            <p class="font-body text-white/75 leading-relaxed text-base mb-6">
              To become the premier global <strong class="text-gold">"Kingmaker"</strong> brand —
              synonymous with professional player development, character building, and sustained success
              at every level of the beautiful game.
            </p>
            <ul class="space-y-3">
              <li v-for="point in visionPoints" :key="point" class="flex items-start gap-3 font-body text-white/65 text-sm">
                <span class="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="w-2 h-2 rounded-full bg-gold"></span>
                </span>
                {{ point }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Mission -->
        <div class="relative bg-gold rounded-3xl p-8 md:p-10 overflow-hidden group">
          <div class="absolute top-0 right-0 w-40 h-40 bg-navy/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div class="relative">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 rounded-xl bg-navy/20 border border-navy/30 flex items-center justify-center">
                <svg class="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div>
                <span class="font-body text-navy/60 text-xs uppercase tracking-widest">Our</span>
                <h3 class="font-heading font-black text-navy text-2xl">Mission</h3>
              </div>
            </div>
            <p class="font-body text-navy/80 leading-relaxed text-base mb-6">
              To provide a world-class, high-repetition football environment that develops the
              <strong class="text-navy">complete athlete</strong> — technically elite, tactically
              aware, and morally disciplined.
            </p>
            <ul class="space-y-3">
              <li v-for="point in missionPoints" :key="point" class="flex items-start gap-3 font-body text-navy/70 text-sm">
                <span class="w-5 h-5 rounded-full bg-navy/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="w-2 h-2 rounded-full bg-navy"></span>
                </span>
                {{ point }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Core Values -->
      <div class="text-center mb-10">
        <h3 class="font-heading font-bold text-2xl text-white mb-2">Our Core Values</h3>
        <div class="gold-divider"></div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          v-for="value in coreValues"
          :key="value.title"
          class="bg-navy rounded-2xl p-5 text-center border border-white/10 hover:border-gold/40 hover:bg-navy-light transition-all duration-300 group"
        >
          <div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{{ value.icon }}</div>
          <p class="font-heading font-bold text-white text-sm">{{ value.title }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const visionPoints = [
  'A globally recognised "Kingmaker" brand',
  'Franchise academies in multiple cities',
  'Elite player management division',
  'Certified ID Coach training programme',
]

const missionPoints = [
  'World-class technical training with high ball repetition',
  'Tactical awareness through cognitive loading',
  'Character development via the Character Matrix',
  'Creating responsible young men and women',
]

const coreValues = [
  { icon: '⚽', title: 'Excellence' },
  { icon: '🤝', title: 'Selflessness' },
  { icon: '🕐', title: 'Discipline' },
  { icon: '❤️', title: 'Love & Unity' },
  { icon: '🎓', title: 'Education' },
  { icon: '👑', title: 'Character' },
]
</script>
