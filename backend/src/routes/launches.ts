import { Router, Request, Response } from 'express'
import { Launch } from '../models/Launch'

const router = Router()

// save a launch to DB
router.post(
    '/save',
    async (req: Request, res: Response): Promise<void> => {
        try {
            const {
                spacex_id,
                flight_number,
                name,
                date_utc
            }: {
                spacex_id: string
                flight_number: number
                name: string
                date_utc: string
            } = req.body

            const launch = await Launch.findOneAndUpdate(
                { spacex_id },
                { spacex_id, flight_number, name, date_utc },
                { upsert: true, new: true, runValidators: true }
            )

            res.status(201).json(launch)
        } catch (err: any) {
            console.error('Error saving launch:', err)
            res.status(500).json({ error: err.message })
        }
    }
)

// get all saved launches from DB
router.get(
    '/saved',
    async (_req: Request, res: Response): Promise<void> => {
        try {
            const launches = await Launch.find().sort({ _id: -1 })
            res.json(launches)
        } catch (err: any) {
            console.error('Error fetching saved launches:', err)
            res.status(500).json({ error: err.message })
        }
    }
)

// delete a launch by ID
router.delete(
    '/:id',
    async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const { id } = req.params
            await Launch.findByIdAndDelete(id)
            res.json({ success: true })
        } catch (err: any) {
            console.error('Error deleting launch:', err)
            res.status(500).json({ error: err.message })
        }
    }
)

export default router