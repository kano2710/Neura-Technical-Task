import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from '#imports'

export interface Launch {
  _id?: string
  spacex_id: string
  flight_number: number
  name: string
  date_utc: string
}

export const useLaunchStore = defineStore('launch', {
  state: () => ({
    all: [] as Launch[],
    saved: [] as Launch[],
    loading: false,
    savingId: null as number | null,
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const res = await axios.post<{ docs: any[] }>(
          'https://api.spacexdata.com/v4/launches/query',
          {
            options: {
              limit: 30,
              sort: { date_utc: 'desc' },
              select: ['id', 'flight_number', 'name', 'date_utc']
            }
          }
        )
        this.all = res.data.docs.map(data => ({
          spacex_id: data.id,
          flight_number: data.flight_number,
          name: data.name,
          date_utc: data.date_utc
        }))
      } finally {
        this.loading = false
      }
    },

    async save(launch: Launch) {
      this.savingId = launch.flight_number
      try {
        await axios.post(
          `${useRuntimeConfig().public.apiBase}/launches/save`,
          {
            spacex_id: launch.spacex_id,
            flight_number: launch.flight_number,
            name: launch.name,
            date_utc: launch.date_utc
          }
        )
        await this.fetchSaved()
      } finally {
        this.savingId = null
      }
    },

    async fetchSaved() {
      const res = await axios.get<Launch[]>(
        `${useRuntimeConfig().public.apiBase}/launches/saved`
      )
      this.saved = res.data
    },

    async remove(id: string) {
      await axios.delete(
        `${useRuntimeConfig().public.apiBase}/launches/${id}`
      )
      await this.fetchSaved()
    }
  }
})
