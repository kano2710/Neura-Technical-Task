import { Schema, model, Document } from 'mongoose';

export interface ILaunch extends Document {
    spacex_id: string;
    flight_number: number;
    name: string;
    date_utc: string;
}

const LaunchSchema = new Schema<ILaunch>({
    spacex_id: { type: String, required: true, unique: true }, // Using spacex_id as unique identifier because flight_number can be repeated
    flight_number: { type: Number, required: true },
    name: { type: String, required: true },
    date_utc: { type: String, required: true },
});

export const Launch = model<ILaunch>('Launch', LaunchSchema);