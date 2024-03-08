# Medium Lite

A website that you can put your minds into it!

## Description

This is a website that provide space to your minds, along with management dashboard.

## Tech Used

- Next.js
- Tailwind CSS
- json-server
- Cloudinary
- pnpm
- react-hook-form
- swr

## How to run

In order to run the application, you need to run both the frontend and the backend. The backend is located in the `db.json` and served using `json-server`. The frontend is located in the `src` folder and served using `Next.js`.

### Frontend

1. Clone the repository
2. Navigate to the directory where you cloned the repository
3. Run `pnpm install` to install dependencies
4. Run `pnpm dev` to start the application
5. Navigate to `http://localhost:3000` in your browser to access the application

### env

Env is used to hide the base url of the backend.

1. create .env file in root folder
2. copy the content of .env.example to .env

### Backend

The schema of the backend is one user can have many portfolios. You can see the structure in db.json file after you fullfill the form.

How to run:

1. split terminal
2. type `pnpm run db` to start the backend
3. You should see `http://localhost:3001/` running in your terminal

Notes:
For the images, i use personal Cloudinary. the reason is because it is easy to store the images and i can get the image url easily. **Be careful** what image you upload because i can see it in my cloudinary dashboard.

I did not deploy the application since the **backend won't work properly because of json-server can't be deployed**.
