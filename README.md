
# This project is a technical task for a Fullstack Engineer position at NEURA Robotics GmbH

An **MEVN** (MongoDB • Express • Vue 3 + Nuxt • Node.js) application that:

* Fetches the 30 most recent SpaceX launches (*API:* https://api.spacexdata.com/v4/launches)
* Lets you **Save** your favourites
* Displays saved launches in a separate view

---


## Task Description

This application will have two screens:

1. **Screen 1 (All Launches)**

   * Display a table of the 30 most recent SpaceX launches (newest first).

   * Show only flight_number, name, and a date field per row.

   * Provide a Save button to store a launch in the database via Pinia.

2. **Screen 2 (Saved Launches)**

   * Display all saved launches as cards.

   * Each card shows flight_number, name, and the date.

   * Include a Remove button to delete the launch from the database.

---

## Repository Structure

```text
Neura-Technical-Task/
├── backend/
│   ├── src/
│   │   ├── app.ts          # Express application entry point
│   │   ├── routes/
│   │   │   └── launches.ts # `/launches` API routes
│   │   └── models/
│   │       └── Launch.ts   # Mongoose schema
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── pages/
    │   ├── index.vue       # “All Launches” page (root)
    │   ├── styles.css      # Stylesheet from both screens
    │   └── screen2/
    │       └── index.vue   # “Saved Launches” page
    ├── stores/             # Pinia store
    ├── app.vue             
    ├── nuxt.config.ts
    ├── package.json
    └── tsconfig.json

```
---
## Prerequisites

* Node.js >= 16.x

* npm >= 8.x

* A MongoDB Atlas cluster (or any MongoDB URI)

---


## Backend Setup

1. **Install dependencies**

   ```bash
   cd Neura-Technical-Task/backend
   npm install
   ```

2. **Create your** `.env`

   In `Neura-Technical-Task/backend/`, create a file named `.env` (this file **must not** be committed to GitHub):

   ```dotenv
   PORT=4000
   MONGODB_URI=<MongoDB_URI>
   ```

3. **Run in Development**

   ```bash
   npm run dev
   ```

    * Runs on http://localhost:4000
    * Hot-reloads on code changes

4. **Build & Run in Production**

   ```bash
   npm run build
   npm start
   ```

    * Compiles TypeScript → `dist/`

---
## Frontend Setup

1. **Install dependencies**

   ```bash
   cd Neura-Technical-Task/frontend
   npm install
   ```

2. **Create your** `.env`

   In `Neura-Technical-Task/frontend/`, create a file named `.env` (this file **must not** be committed to GitHub):

   ```dotenv
   BASE_URL=http://localhost:4000
   ```

3. **Run Nuxt in Development**

   ```bash
   npm run dev
   ```

   * Nuxt dev server at http://localhost:3000

4. **Build Static Site**

   ```bash
   npm run build
   ```

   * Outputs the generated files into `../.output/public`

5. **Preview the Static Site Locally**

   ```bash
   cd ../.output/public
   npx serve .
   ```

---
## Usage

1. **All Launches**
   Browse https://neuratask.dhameliya.com/ to see the latest SpaceX launches.
   Click **Save** to add a launch to your saved list.
   <img width="1709" alt="Screen1" src="https://github.com/user-attachments/assets/20370310-d026-4682-b98d-ec4d27ac7db2" />


3. **Saved Launches**
   Click **Go to Saved Launches** (or visit `/screen2`) to view your favourites.
   Remove any entry with the **Remove** button.
   <img width="1709" alt="Screen2" src="https://github.com/user-attachments/assets/2d5c4c37-4178-4399-87d9-bae835d90e0a" />



## Developer's Declaration

I, Dharam Mukeshbhai Dhameliya, declare that I have developed this project, which results from my efforts and expertise in software development.


## Authors

* [@kano2710](https://github.com/kano2710)

## Contact Information:

If you have any inquiries or need further information about this project, please contact me at https://dhameliya.com/ or dharam.dhameliya27@gmail.com.

