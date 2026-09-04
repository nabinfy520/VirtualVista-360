# VirtualTour Pro — NO DOCKER VERSION

Honey, is version ke liye Docker ki zarurat nahi hai.

## STEP 1: Database (SQLite)
Terminal 1:
```powershell
cd C:\Users\User\Downloads\VirtualTour_Pro_No_Docker\database
npm.cmd install
Copy-Item .env.example .env
npm.cmd run generate
npm.cmd run push
npm.cmd run seed
```

## STEP 2: Backend
Terminal 2:
```powershell
cd C:\Users\User\Downloads\VirtualTour_Pro_No_Docker\backend
npm.cmd install
Copy-Item .env.example .env
npm.cmd run dev
```

Wait for:
`API running on http://localhost:4000`

## STEP 3: Frontend
Terminal 3:
```powershell
cd C:\Users\User\Downloads\VirtualTour_Pro_No_Docker\frontend
npm.cmd install
npm.cmd run dev
```

Open the Vite link, normally `http://localhost:5173`.

No Docker. No PostgreSQL server. SQLite database automatically local file me banega.
