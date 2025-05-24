<script setup lang="ts">
import { onMounted } from 'vue'
import { useLaunchStore } from '@/stores/useLaunchStore'

const store = useLaunchStore()

async function fetchSaved() {
  try {
    await store.fetchSaved()
  } catch (e) {
    console.error('Error fetching saved:', e)
  }
}

onMounted(fetchSaved)

function formatDate(d: string): string {
  return new Date(d).toLocaleString('de-DE', { timeZone: 'UTC' })
}
</script>

<template>
  <div class="main">

    <NuxtLink to="/" class="link-button">
      Go to Latest SpaceX Launches
    </NuxtLink>

    <h1 class="text-2xl font-bold mb-4">Saved Launches</h1>

    <button class="button bg-blue mb-4" @click="fetchSaved()">
      Refresh
    </button>

    <div v-if="!store.saved.length">
      No launches saved yet.
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="launch in store.saved" :key="launch._id" class="border">
        <table>
          <tbody>
            <tr>
              <th class="py-2">Flight No.</th>
              <td class="py-2">{{ launch.flight_number }}</td>
            </tr>
            <tr>
              <th class="py-2">Name</th>
              <td class="py-2">{{ launch.name }}</td>
            </tr>
            <tr>
              <th class="py-2">Date</th>
              <td class="py-2">{{ formatDate(launch.date_utc) }}</td>
            </tr>
            <tr>
              <th>
                <button class="button bg-red mb-4" @click="store.remove(launch._id!)">
                  Remove
                </button>
              </th>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

  </div>
</template>

<style src="../styles.css" />
<style scoped>
.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

.gap-4 {
  gap: 1rem;
}
</style>