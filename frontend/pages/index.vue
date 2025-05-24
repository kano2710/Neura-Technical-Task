<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useLaunchStore } from '@/stores/useLaunchStore'

const store = useLaunchStore()

async function refresh() {
    await store.fetchSaved()
    await store.fetchAll()
}
onMounted(refresh)

function isSaved(launch: Launch): boolean {
  return store.saved.some(s => s.spacex_id === launch.spacex_id)
}

function formatDate(d: string): string {
  return new Date(d).toLocaleString('de-DE', { timeZone: 'UTC' })
}

</script>

<template>
    <div class="main">

        <NuxtLink to="/screen2" class="link-button">
            Go to Saved Launches
        </NuxtLink>

        <h1 class="text-2xl font-bold">Latest SpaceX Launches</h1>

        <button class="button bg-blue mb-4" @click="refresh()" :disabled="store.loading">
            {{ store.loading ? 'Loading…' : 'Refresh' }}
        </button>

        <table class="border">
            <thead class="bg-gray">
                <tr>
                    <th class="py-2 border">Flight No.</th>
                    <th class="py-2 border">Name</th>
                    <th class="py-2 border">Date</th>
                    <th class="py-2 border w-32">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="launch in store.all" :key="launch.spacex_id" class="hover:bg-gray">
                    <td class="py-2 border">{{ launch.flight_number }}</td>
                    <td class="py-2 border">{{ launch.name }}</td>
                    <td class="py-2 border">{{ formatDate(launch.date_utc) }}</td>
                    <td class="py-2 border w-32">
                        <button v-if="!isSaved(launch)" class="button bg-green"
                            @click="store.save(launch)" :disabled="store.savingId === launch.flight_number">
                            {{ store.savingId === launch.flight_number ? 'Saving…' : 'Save' }}
                        </button>
                        <span v-else class="italic">Saved</span>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<style src="./styles.css" />
<style scoped>
.hover\:bg-gray:hover {
    background-color: #fafafa;
}

.w-32 {
    width: 8rem;
}
</style>