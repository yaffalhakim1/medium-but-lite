# Assignment Next JS - News Portal Theme

## Overview

For the Assignment Next JS, you will work individually to build the front end of an application using Next JS. There will be 4 different themes for the Assignment Next JS, each with a different set of application flow and requirements. Each project will have general requirements as a minimum, including Admin Panel, Client Side, List of Items, Search, sorting, and pagination, User profile, Landing Page, Data seeding, etc.

After developing the projects based on the requirements, you have to present your project in front of the other trainees. The presentation will have these guidelines:

- Presentation Duration maximal 15 minutes
- Before starting the demonstration, show the git status of your project
- App Demonstration
- Brief code explanation
- Q&A Session

Important things that you have to keep in mind when you do the final project:

- Repository name: assignment-Nextjs-frontend-yourname
- Add README.md put with how to run your apps smoothly and add some useful information there
- Do frequent commit with meaningful commit messages
- Only commits before the defined deadline will be accepted
- Better to take a look and review your own MR
- Attach a screenshot of your test coverage on your MR description.
- You can use any components library for your Front End.
- The objective of the requirement document is to explain in brief what will be the minimum requirement to be developed when you are developing the product. You are still expected to develop your product with good common process practices, as well as good user experience with necessary validation, sorting, pagination, etc, even if it is not described in the document.
- Your application language should be presented in English.

## Application Features

### Features Admin Side (CMS)

1. Login
2. Logout
3. Manage Subscription
   - View the entire list of subscriptions
4. Manage Post
   - View the entire list of Posts
   - View Post details
   - Create a Post
   - Edit Post
   - Delete Post
5. Manage Transactions Invoice
   - View all User Transactions against Subscriptions
   - Update Transaction Status from process to completed
   - Update Transaction Status from process to canceled
   - Filter by transaction date and Transaction status
6. Manage voucher
   - View all Voucher Programs
7. Manage User Rewards
   - Displays a list of all User Gift Tracking that has been generated from the System
   - Updates Tracking Status from process to completed
   - Updates Tracking Status from process to canceled
8. Manage Gift
   - Displays gift list
   - Can update stock for gifts
9. Perform authorization so that data can only be managed by users who have the admin role

### User Portal Features

Using the react.js tech stack, you are asked to create a website for the selected display for users. The features that will be developed are:

1. Login
   - A separate page that will display the login form
2. Logout
3. Register
   - Page that will display the registration form with minimum input fields:
     - Name
     - Email
     - Password
     - Password confirmation
     - Address
     - Phone number
     - Referral
4. Home Search All Posts
   - The main menu accessed by logged-in users
   - Displays 5 trending posts in the week
   - Displays a section list of posts with filter features like title, dropdown category, and dropdown paid/unpaid.
   - Sorting feature based on the date the post was carried out (ascending/descending).
   - The default list of posts displayed will be sorted by the latest date the post was created.
   - Each News Post that is displayed will add to the reading history of the current user.
   - If the news is not free, a cost_quota is required to read and it will reduce the current quota from the user.
5. Details News Post
   - A separate page that displays detailed information about a post.
   - Details displayed will include:
     - Description
     - Count of user liked and shared
     - Like button and Share button
   - At the bottom, a section for my recommended news will be displayed, showing 3 recommended headline posts based on the user's reading history.
6. My Reading History
   - A separate menu that displays a list of news posts that have been read, sorted from the most recent.
   - Each post can be clicked to display its details.
7. Get Subscription Plan Payment
   - In one transaction, the user can only upgrade/buy a subscription.
   - Users can buy recurring subscriptions that will add quotas and increase the subscription validity period by 1 month.
   - Users can enter a voucher code available in My Profile > Voucher tab before making a payment.
   - Payment will be made via QR generate.
   - If successful, it will redirect to the application and display an invoice and a success dialog. The subscription status will be processed.
   - If it fails, it will be redirected to the application and keep on the order/payment page showing a failure to pay dialog. The subscription status becomes waiting payment.
8. Promo Referral Program
   - If the user shares a referral code and invites someone to register and spend a subscription above 100,000, the user will get a voucher of 25,000.
   - If the user shares the referral code and the person invited registers and buys posts above 200,000, the user will get a voucher of 50,000.
   - If the user shares the referral code and invites someone to register and purchase posts above

 250,000, the user will get a voucher of 75,000.
   - Each user can only use a maximum of 1 voucher from each category (25k 1x, 50k 1x, 75k 1x).
   - The validity period of the vouchers is 1 month from the reward given. If it is over, the vouchers will be forfeited and cannot be used.
9. My History Subscription Menu
   - Displays a list of the history of subscriptions that have been purchased.
   - If the user makes a subscription transaction within 1 month with a nominal value above 50,000, they will get a glass mug gift (as long as supplies last).
   - If within 1 month the user makes a subscription transaction with a nominal value above 150,000, they will get a coffee gift (as long as supplies last).
   - If the user makes a subscription transaction within 1 month with a nominal value above 200,000, they will get a gift coffee brewing tool (as long as supplies last).
   - Users can only get each gift in a maximum of 3 categories each month if qualified as per the above requirements, and the next month will be reset again.

10. My Profile Menu
    - A menu that can be accessed by the user to display the reward profile obtained from the application.
    - Displays personal information, including name, username, email, phone number, address, and referral code.
    - The referral tab displays a list of referrals from users who have successfully registered.
    - The referral tab also displays spending information from users who become referrals.
    - The vouchers tab displays a list of vouchers owned by the user, sorted from valid to expired validity that will expire.
    - Expired vouchers are displayed separately and cannot be copied, while valid vouchers have a copy code button.
    - The gift tab displays a list of gifts given from the application. Each gift can be clicked to display its details, including the status of gift delivery from the system to the user's address.

## Technical Requirements

### Frontend

- Using Next JS (with Typescript).
- Separate clients for users with the User role and users with the Admin role.
- Use state management like Redux, Zustand, or Redux toolkit for both user and admin sites.
- Ensure every page is reactive and does not require a website refresh to change the display.
- Use server-side rendering, static generation, or Incremental Static Regeneration appropriately.
- Utilize CSS modules, frameworks, or style components (SCSS, styled-components).
- Create reusable components like Table, TableRow/TableItem, Form (Add & Edit in one form), Button, footer, and Card/Item.
- Communicate with JSON Server via REST API for frontend-backend communication.
- Implement a mock authentication flow using JSON Server for pages based on logged-in user.
- Upload images to an image sharing platform and save the image URL to the JSON Server.
- Ensure Mobile Responsive design.
- Deploy the web application to any provider of your choice.

### Backend

- Create a REST API server using JSON Server.
- Define endpoints to fulfill application features with appropriate URL parameters, URL query, header, request body, response status, and response body.
- Document API for each endpoint.
- Simulate authentication and authorization flow using JSON Server.
- Implement a custom route in a routes.json file for user login and user data retrieval.
- Start JSON Server with the custom routes:
  ```
  json-server --watch db.json --routes routes.json
  ```
- Use POST request to /auth/login with username and password as query parameters to simulate user login.
- Use GET request to /auth/user/:id to retrieve user data after login, where :id is the user's ID obtained from successful login.
