<template>
  <section id="founder" class="py-24 bg-navy relative overflow-hidden">
    <!-- Subtle pitch lines decoration -->
    <div class="absolute inset-0 opacity-5">
      <div class="border-2 border-white rounded-full w-96 h-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div class="border border-white/50 w-full h-px absolute top-1/2"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div v-reveal class="text-center mb-16">
        <p class="section-subheading mb-2">Meet the Kingmaker</p>
        <h2 class="section-heading">Our Founder</h2>
        <div class="gold-divider"></div>
      </div>

      <div class="grid lg:grid-cols-5 gap-12 items-start">
        <!-- Photo column -->
        <div v-reveal.left class="lg:col-span-2 flex flex-col items-center lg:items-start">
          <div class="relative">
            <div class="w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border-4 border-gold/40 shadow-2xl shadow-black/60">
              <img
            :src="founderImg"
              alt="Mr. ID - ID All Stars Founder"
                class="w-full h-full object-cover object-top"
              />
            </div>
            <!-- Gold accent frame -->
            <div class="absolute -bottom-4 -right-4 w-72 h-80 md:w-80 md:h-96 rounded-2xl border-2 border-gold/20 -z-10"></div>
          </div>

          <!-- Name card -->
          <div class="mt-10 bg-gold rounded-2xl p-5 w-72 md:w-80">
            <p class="font-heading font-black text-navy text-xl">Mr. ID</p>
            <p class="font-body text-navy/70 text-sm">Founder & Head Coach</p>
            <p class="font-body text-navy/60 text-xs mt-1 tracking-wider">Manchester, United Kingdom</p>
          </div>
        </div>

        <!-- Bio column -->
        <div v-reveal.right class="lg:col-span-3">
          <div class="space-y-5 font-body text-white/75 leading-relaxed">
            <p class="text-lg text-white/90">
              Mr. ID's identity is more than a name -
              it's a calling. In football, he transformed that identity into a mission:
              <strong class="text-white">ID — Identification of Stars.</strong>
            </p>
            <p>
              Over 14 years, Mr. ID has built one of the most respected player development platforms
              in the North West of England, not by seeking fame, but by quietly crafting careers.
              His method is simple and powerful: put thousands of touches on the ball, build the
              discipline to go with the talent, and create young people of substance.
            </p>
            <p>
              The results speak for themselves. Players from Mr. ID's platform have gone on to
              represent <strong class="text-white">5 national teams</strong> and signed for
              some of the biggest clubs in English football.
            </p>
          </div>

          <!-- National Teams -->
          <div class="mt-8">
            <h4 class="font-heading font-semibold text-gold text-sm uppercase tracking-widest mb-4">National Team Representation</h4>
            <div class="flex flex-wrap gap-3">
              <div v-for="nation in nations" :key="nation.name"
                class="flex items-center gap-2 bg-navy-dark border border-white/10 rounded-full px-4 py-2 hover:border-gold/40 transition-colors">
                <img
                  :src="`https://flagcdn.com/24x18/${nation.code}.png`"
                  :alt="nation.name"
                  class="w-6 h-auto rounded-sm"
                />
                <span class="font-body text-white/80 text-sm font-medium">{{ nation.name }}</span>
              </div>
            </div>
          </div>

          <!-- Pro Clubs -->
          <div class="mt-8">
            <h4 class="font-heading font-semibold text-gold text-sm uppercase tracking-widest mb-4">Players Placed At</h4>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="club in clubs"
                :key="club.name"
                class="flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-lg px-3 py-1.5 hover:bg-gold/20 hover:border-gold/40 transition-all cursor-default"
              >
                <div class="w-6 h-6 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    v-if="!club.imgError"
                    :src="club.badge"
                    :alt="club.name"
                    class="w-full h-full object-contain p-0.5"
                    @error="club.imgError = true"
                  />
                  <span v-else class="font-heading font-black text-navy text-xs">{{ club.initials }}</span>
                </div>
                <span class="text-white/80 font-body text-sm">{{ club.name }}</span>
              </div>
            </div>
          </div>

          <!-- Philosophy quote -->
          <div class="mt-10 bg-navy-dark rounded-2xl p-6 border-l-4 border-gold">
            <p class="font-heading font-bold text-white text-lg italic leading-snug">
              "At ID All Stars, we don't just train players; we build young men and women of
              substance. The game will eventually end, but the character we build together
              will last a lifetime."
            </p>
            <p class="font-body text-gold text-sm mt-3">— Mr. ID, Founder</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import founderImg from '../assets/founder.png.jpeg'
import accringtonBadge from '../assets/accrington-badge.svg'
import { reactive } from 'vue'

const nations = [
  { name: 'England', code: 'gb-eng' },
  { name: 'Germany', code: 'de' },
  { name: 'UAE', code: 'ae' },
  { name: 'Nigeria', code: 'ng' },
  { name: 'Syria', code: 'sy' },
]

const clubs = reactive([
  { name: 'Manchester City', initials: 'MC', badge: 'https://crests.football-data.org/65.svg', imgError: false },
  { name: 'Manchester United', initials: 'MU', badge: 'https://crests.football-data.org/66.svg', imgError: false },
  { name: 'Everton', initials: 'EFC', badge: 'https://crests.football-data.org/62.svg', imgError: false },
  { name: 'Liverpool', initials: 'LFC', badge: 'https://crests.football-data.org/64.svg', imgError: false },
  { name: 'Stoke City', initials: 'SC', badge: 'https://crests.football-data.org/70.svg', imgError: false },
  { name: 'Blackburn Rovers', initials: 'BR', badge: 'https://crests.football-data.org/59.svg', imgError: false },
  { name: 'Burnley', initials: 'BFC', badge: 'https://crests.football-data.org/328.svg', imgError: false },
  { name: 'Wigan Athletic', initials: 'WA', badge: 'https://crests.football-data.org/75.svg', imgError: false },
  { name: 'Bolton Wanderers', initials: 'BW', badge: 'https://crests.football-data.org/389.svg', imgError: false },
  { name: 'Accrington Stanley', initials: 'AS', badge: accringtonBadge, imgError: false },
])
</script>
