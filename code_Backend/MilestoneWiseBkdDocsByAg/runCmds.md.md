# 🚀 2. How to Run the Backend (Spring Boot)
Open Terminal 1 (in VS Code or PowerShell):
powershell

### 1. Navigate to the backend directory
cd f:\INTERN_PROJ\TripNestAgFtd_SYBkd\TripNestProjVer2_M2\code_Backend

### 2. Start the Spring Boot server using the Maven wrapper
.\mvnw.cmd spring-boot:run

### Check on site - 
Backend Port: http://localhost:8080
What to look for in the console:
You will see the Spring Boot banner, followed by: text


--- 

# 💻 3. How to Run the Frontend (React + Vite)
Open Terminal 2 (side-by-side with Terminal 1):

### 1. Navigate to the frontend directory
cd f:\INTERN_PROJ\TripNestAgFtd_SYBkd\TripNestProjVer2_M2\code_FrontEnd

### 2. (First time only) Ensure packages are installed
npm install

### 3. Start the local development server
npm run dev

### Check on site - 
Frontend URL: http://localhost:5173
Open your browser to http://localhost:5173 to interact with TripNest!



----

### Step Postgresql : Open psql and create the new database
sql
>> psql -U postgres
Type pw

Once inside:
sql
-- Create the new database for Milestone 2
>> CREATE DATABASE "Ur_db_name";    
-- write ur db name, ex-TripNestDb2Ag


-- Verify it was created
>> \l

-- Connect to the new database
>> \c "TripNestDb2Ag"



---

## 📋 Gist - 4. Quick Verification Commands (Quality Check)

If you ever want to verify that your code compiles cleanly with 0 errors:
bash

# Frontend Lint Check (0 errors, 0 warnings)
cd code_FrontEnd
npm run lint

# Frontend Production Build Test (Builds in < 300ms)
npm run build

# Backend Compile Check (BUILD SUCCESS)
cd ../code_Backend
.\mvnw.cmd compile


---------------


