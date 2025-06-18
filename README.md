# Gym Trainer Project
A customizable fitness and diet tracking application designed to help users optimize their workout routines, track progress, and receive personalized meal plans. The app integrates gamification features such as milestone tracking and badge unlocking to keep users motivated.

#Project Purpose
- Generate dynamic workout plans based on user age, fitness goal, and experience level.
- Provide personalized diet plans with vegetarian & non-vegetarian options, including ingredients, images, and preparation procedures.
- Track progress with gamification, rewarding users as they hit milestones.
- Offer secure authentication for users to save fitness records & meal preferences.

# Tech Stack
1. Frontend: Next.js, React, CSS
2. Backend: Node.js, Express.js
3. Database: MongoDB (with Mongoose)
4. Authentication: NextAuth.js
4. UI Styling: CSS, Tailwind CSS
5. PDF Generation: pdfkit
6. Deployment: Vercel 

# Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com//gym-trainer.git
cd gym-trainer


2️⃣ Install Dependencies
npm install


3️⃣ Configure Environment Variables
Create a .env file in the root directory and add:
MONGODB_URI=<your_mongodb_connection_string>
NEXTAUTH_SECRET=<random_secret_key>
NEXTAUTH_URL=http://localhost:3000


4️⃣ Start the Development Server
npm run dev
Visit http://localhost:3000 in your browser.


5️⃣ Generate Grocery List PDF
Run the API to generate a grocery list PDF:
curl http://localhost:3000/api/fitness/generatePDF


6️⃣ Deployment
For Vercel, deploy with:
vercel deploy

This README.md provides a structured guide for onboarding and setup.

