<template>
  <section id="opportunities" class="py-24 bg-navy-dark relative overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.06),transparent_60%)]"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div v-reveal class="text-center mb-16">
        <p class="section-subheading mb-2">Join the Academy</p>
        <h2 class="section-heading">ID Opportunities</h2>
        <div class="gold-divider"></div>
        <p class="font-body text-white/60 mt-4 max-w-2xl mx-auto">
          Whether your child is taking their first kick or chasing a professional contract,
          we have a programme tailored to their stage of development.
        </p>
      </div>

      <!-- Age Group Programs -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        <div
          v-for="(program, i) in programs"
          :key="program.group"
          v-reveal="i + 1"
          :class="[
            'card relative overflow-hidden group cursor-default',
            i === 2 ? 'lg:col-span-1 md:col-span-2 lg:md:col-auto' : '',
          ]"
        >
          <!-- Featured badge -->
          <div v-if="program.featured" class="absolute top-4 right-4 bg-gold text-navy font-heading font-bold text-xs px-3 py-1 rounded-full">
            Most Popular
          </div>
          <!-- Accent line -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div class="flex items-start gap-4 mb-4">
            <div class="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex flex-col items-center justify-center flex-shrink-0">
              <span class="font-heading font-black text-gold text-lg leading-none">{{ program.ageRange }}</span>
              <span class="font-body text-white/50 text-xs">yrs</span>
            </div>
            <div>
              <h3 class="font-heading font-bold text-xl text-white">{{ program.group }}</h3>
              <p class="font-body text-gold text-sm font-medium">Ages {{ program.ageRange }}</p>
            </div>
          </div>

          <p class="font-body text-white/65 text-sm leading-relaxed mb-5">{{ program.description }}</p>

          <ul class="space-y-2 mb-6">
            <li v-for="focus in program.focus" :key="focus" class="flex items-center gap-2 font-body text-white/60 text-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
              {{ focus }}
            </li>
          </ul>

          <div class="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <p class="font-body text-white/40 text-xs uppercase tracking-wider">Sessions</p>
              <p class="font-heading font-semibold text-white text-sm">{{ program.sessions }}</p>
            </div>
            <button
              @click="scrollTo('register')"
              class="btn-outline-gold text-sm px-5 py-2"
            >
              Register
            </button>
          </div>
        </div>
      </div>

      <!-- Franchise / Partner Section -->
      <div class="bg-navy rounded-3xl border border-gold/20 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p class="font-body text-gold text-sm uppercase tracking-widest mb-3">Coming Soon</p>
          <h3 class="font-heading font-bold text-3xl text-white mb-4">
            Franchise the <span class="text-gold">ID Method</span>
          </h3>
          <p class="font-body text-white/65 leading-relaxed mb-6">
            Want to bring the ID Method to your city? We are developing a
            <strong class="text-white">Certified ID Coach Programme</strong> —
            a franchise model that lets passionate coaches replicate the
            ID All Stars experience worldwide with full training, manuals, and support.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button @click="scrollTo('contact')" class="btn-primary">
              Express Interest
            </button>
            <button @click="scrollTo('about')" class="btn-outline-gold">
              Learn the Method
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="perk in franchisePerks" :key="perk.title" class="bg-navy-dark rounded-xl p-4 border border-white/10">
            <span class="text-2xl mb-2 block">{{ perk.icon }}</span>
            <p class="font-heading font-semibold text-white text-sm">{{ perk.title }}</p>
            <p class="font-body text-white/50 text-xs mt-1">{{ perk.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const programs = [
  {
    group: 'Mini Stars',
    ageRange: '4–7',
    description: 'An introduction to football through fun, games, and movement. We focus on building a love for the ball and developing coordination in a safe, joyful environment.',
    focus: ['Ball familiarisation', 'Coordination & agility', 'Fun-first approach', 'Team socialisation'],
    sessions: 'Sat & Sun mornings',
    featured: false,
  },
  {
    group: 'Foundation',
    ageRange: '8–10',
    description: 'Technical fundamentals are everything at this stage. Players develop their first touch, passing accuracy, and basic positional understanding.',
    focus: ['First touch & control', 'Passing & movement', 'Basic 1v1 skills', 'Teamwork & communication'],
    sessions: 'Tue, Thu & Sat',
    featured: false,
  },
  {
    group: 'Development',
    ageRange: '11–13',
    description: 'The high-repetition ID Method is applied in full. Players develop game intelligence alongside technical ability with thousands of touches per session.',
    focus: ['Advanced dribbling', 'Positional awareness', '2v2 & 3v3 scenarios', 'Character Matrix begins'],
    sessions: 'Mon, Wed, Fri & Sat',
    featured: true,
  },
  {
    group: 'Intermediate',
    ageRange: '14–16',
    description: 'Tactical systems, pressing, and decision-making under pressure. Players begin to be assessed against academy standards.',
    focus: ['Tactical shape & systems', 'Press & counter-press', 'Leadership development', 'Performance analysis'],
    sessions: 'Mon–Fri + match days',
    featured: false,
  },
  {
    group: 'Elite Academy',
    ageRange: '17–21',
    description: 'Pre-professional conditioning designed to bridge the gap between grassroots football and a professional contract. Network connections and club placements.',
    focus: ['Pro-level conditioning', 'Trial & placement support', 'Mental resilience coaching', 'Nutrition & recovery'],
    sessions: 'Full-time programme',
    featured: false,
  },
]

const franchisePerks = [
  { icon: '📋', title: 'Full Coaching Manual', desc: 'Every drill documented' },
  { icon: '🎓', title: 'Certified Training', desc: 'Become an ID Coach' },
  { icon: '🌍', title: 'Global Network', desc: 'Access our contacts' },
  { icon: '📈', title: 'Proven Model', desc: '14 years of results' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
