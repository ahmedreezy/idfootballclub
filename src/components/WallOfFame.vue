<template>
  <section class="py-16 bg-navy overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-reveal class="text-center mb-10">
        <p class="section-subheading mb-2">Our Network</p>
        <h2 class="section-heading">Wall of Fame</h2>
        <div class="gold-divider"></div>
        <p class="font-body text-white/60 mt-4 max-w-xl mx-auto">
          Players developed at ID All Stars have gone on to represent these clubs and nations.
        </p>
      </div>

      <!-- National Teams -->
      <div class="mb-12">
        <h3 class="font-heading font-semibold text-gold text-sm uppercase tracking-widest text-center mb-6">National Teams</h3>
        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="(nation, i) in nations"
            :key="nation.name"
            v-reveal.left="i + 1"
            class="flex items-center gap-3 bg-navy-dark border border-white/10 rounded-xl px-5 py-3 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300 group"
          >
            <img
              :src="`https://flagcdn.com/32x24/${nation.code}.png`"
              :alt="nation.name"
              class="w-8 h-auto rounded-sm group-hover:scale-125 transition-transform duration-300"
            />
            <div>
              <p class="font-heading font-bold text-white text-sm">{{ nation.name }}</p>
              <p class="font-body text-gold text-xs">National Team</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="flex items-center gap-4 mb-12">
        <div class="flex-1 h-px bg-white/10"></div>
        <span class="font-heading font-semibold text-gold text-sm uppercase tracking-widest">Professional Clubs</span>
        <div class="flex-1 h-px bg-white/10"></div>
      </div>

      <!-- Pro Clubs grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div
          v-for="(club, i) in clubs"
          :key="club.name"
          v-reveal="(i % 5) + 1"
          class="bg-navy-dark border border-white/10 rounded-xl p-4 text-center hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300 hover:-translate-y-1 group cursor-default"
        >
          <div class="w-12 h-12 rounded-full bg-white border border-gold/20 flex items-center justify-center mx-auto mb-3 group-hover:border-gold/60 transition-colors overflow-hidden p-1">
            <img
              v-if="!club.imgError"
              :src="club.badge"
              :alt="club.name + ' badge'"
              class="w-full h-full object-contain"
              @error="club.imgError = true"
            />
            <span v-else class="font-heading font-black text-gold text-lg">{{ club.initials }}</span>
          </div>
          <p class="font-heading font-semibold text-white text-xs leading-tight">{{ club.name }}</p>
          <p class="font-body text-white/40 text-xs mt-0.5">{{ club.league }}</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-12">
        <p class="font-body text-white/60 mb-4">Could your player be next on this wall?</p>
        <button
          @click="scrollTo('register')"
          class="btn-primary"
        >
          Register Today
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const nations = [
  { name: 'England', code: 'gb-eng' },
  { name: 'Germany', code: 'de' },
  { name: 'UAE', code: 'ae' },
  { name: 'Nigeria', code: 'ng' },
  { name: 'Syria', code: 'sy' },
]

const clubs = reactive([
  { name: 'Manchester City', initials: 'MC', league: 'Premier League', badge: 'https://crests.football-data.org/65.svg', imgError: false },
  { name: 'Manchester United', initials: 'MU', league: 'Premier League', badge: 'https://crests.football-data.org/66.svg', imgError: false },
  { name: 'Everton', initials: 'EFC', league: 'Premier League', badge: 'https://crests.football-data.org/62.svg', imgError: false },
  { name: 'Liverpool', initials: 'LFC', league: 'Premier League', badge: 'https://crests.football-data.org/64.svg', imgError: false },
  { name: 'Stoke City', initials: 'SC', league: 'EFL Championship', badge: 'https://crests.football-data.org/70.svg', imgError: false },
  { name: 'Blackburn Rovers', initials: 'BR', league: 'EFL Championship', badge: 'https://crests.football-data.org/59.svg', imgError: false },
  { name: 'Burnley', initials: 'BFC', league: 'Premier League', badge: 'https://crests.football-data.org/328.svg', imgError: false },
  { name: 'Wigan Athletic', initials: 'WA', league: 'EFL League One', badge: 'https://crests.football-data.org/75.svg', imgError: false },
  { name: 'Bolton Wanderers', initials: 'BW', league: 'EFL League One', badge: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Bolton_Wanderers_FC_logo.svg', imgError: false },
  { name: 'Accrington Stanley', initials: 'AS', league: 'EFL League One', badge: 'https://crests.football-data.org/333.svg', imgError: false },
])

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
