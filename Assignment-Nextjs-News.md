# Assignment Next JS - News Portal Theme

## Overview

For the Assignment Next.js, you will work individually to build the front end of an application using Next.js. There will be three different themes for the Assignment Next.js, each with a different set of application flow and requirements. Each project will have general requirements as a minimum, including Admin Panel, Client Side, List of Items, Search, Sorting, and Pagination, User Profile, Landing Page, Data Seeding, etc.

After developing the projects based on the requirements, you have to present your project in front of the trainers and the other trainees. The presentation will have the following guidelines:

- Presentation duration: maximum 15 minutes.
- Before starting the demonstration, show the git status of your project and switch to the latest commit before the deadline.
- App demonstration.
- Brief code explanation.
- Q&A session.

Important things that you have to keep in mind when you do the final project:

- Repository name: `assignment-nextjs-frontend-<yourname>`.
- Add `README.md` with instructions on how to run your app smoothly and include some useful information.
- Make frequent commits with meaningful commit messages.
- Only commits before the defined deadline will be accepted.
- It is better to review your own MR.
- Attach a screenshot of your test coverage to your MR description.
- You can use any component library for your front end.
- The objective of the requirement document is to explain briefly what the minimum requirements are when developing the product. You are still expected to develop your product with good common process practices, as well as good user experience with necessary validation, sorting, pagination, etc., even if it is not described in the document.
- Your application language should be presented in English.

## Application Features

## reference example :

- medium.com with premium content
- bisnis.com with premium content

### Features Admin Side (CMS)

1. Login (v)
2. Logout (v)
3. Manage Subscription
   - View the entire list of subscriptions user (v)
   - deactive user subscriptions (v)
4. Manage Post
   - View the entire list of Posts (v)
   - View Post details (v)
   - Create a Post (v)
     - validate title max 20 char (v)
     - validate description max 200 char (v)
     - validate category max 2 category
     - validate image max 1 image with resolution 1920x1080
     - validate premium post max 1 premium post
   - Edit Post (v)
   - Delete Post (v)
5. Manage Transactions Invoice
   - View all User Transactions against Subscriptions (v)
   - Update Transaction Status from process to completed (v)
   - Update Transaction Status from process to canceled (v)
   - Filter by transaction date and Transaction status (v)
6. Perform authorization so that data can only be managed by users who have the admin role (v)

### User Portal Features

Using the next.js tech stack, you are asked to create a website for the selected display for users. The features that will be developed are:

1. Login
   - A separate page that will display the login form (v)
2. Logout (v)
3. Register
   - Page that will display the registration form with minimum input fields:
     - Name (v)
     - Email (v)
     - Password (v)
     - Password confirmation (v)
     - Address (v)
     - Phone number (v)
     - Referral (v)
4. Home Search All Posts
   - The main menu accessed by logged-in users (v)
   - Dispalys tag for premium post (v)
   - Displays 5 trending posts the trending define by newest and most like. (v)
   - Displays a section list of posts with filter features like title, dropdown category, and dropdown paid/unpaid. (v)
   - Sorting feature based on the date the post was carried out (ascending/descending). (v)
   - The default list of posts displayed will be sorted by the latest date the post was created. (v)
   - Each News Post that is displayed will add to the reading history of the current user.(v)
   - If the news is premium, guest or unsubribe user just can see the news little bit (v)
5. Details News Post
   - A separate page that displays detailed information about a post. (v)
   - Details displayed will include:
     - Description (v)
     - Count of user liked and shared (v)
     - Like button and Share button (v)
   - At the bottom, a section for my recommended news will be displayed, showing 3 recommended headline posts based on the user's like. (v) (unstable)
   - if user not subscribed or only have expire subscription show only little bit post. and than have path to subscription plan (v)
6. Get Subscription Plan Payment
   - In one transaction, the user can buy subscription for one month or a year to be premium user. (v)
   - Payment will be made via QR generate. (v)
   - If successful, it will redirect to the application and display an invoice and a success dialog. The subscription status will be processed/success. (v) (not modal yet)
   - If it fails, it will be redirected to the application and keep on the order/payment page showing a failure to pay dialog. The subscription status becomes waiting payment. (v) (not modal yet)
7. My Profile Menu
   - Displays personal information, including name, username, email, phone number, and address. (v)

## Technical Requirements

### Frontend

- Using Next JS (with Typescript). (v)
- Separate clients for users with the User role and users with the Admin role. (v)
- Use state management like Redux, Zustand, or Redux toolkit for both user and admin sites. (v)
- Ensure every page is reactive and does not require a website refresh to change the display. (v)
- Use server-side rendering, static generation, or Incremental Static Regeneration appropriately. (v)
- Utilize CSS modules, frameworks, or style components (SCSS, styled-components). (v)
- Create reusable components like Table, TableRow/TableItem, Form (Add & Edit in one form), Button, footer, and Card/Item. (v)
- Communicate with JSON Server via REST API for frontend-backend communication. (v)
- Implement a mock authentication flow using JSON Server for pages based on logged-in user. (v)
- Upload images to an image sharing platform and save the image URL to the JSON Server. (v)
- Ensure Mobile Responsive design.(v)
- Deploy the web application

### Backend

- Create a REST API server using JSON Server. (v)
- Define endpoints to fulfill application features with appropriate URL parameters, URL query, header, request body, response status, and response body. (v)
- Document API for each endpoint.
- Simulate authentication and authorization flow using JSON Server. (v)
