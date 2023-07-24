# Assignment Next JS - Online Food Ordering System Theme

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

### Features User Side

1. Account Registration
   - Register with required data in the new user registration form.
   - Sign In.

2. User Profile
   - Profile page with options to change user data (Name, Contact).
   - Option to change, select, or delete user photos.
   - Display data on coupon codes owned.

3. Display Restaurant Menu
   - Display all available menus with several filter features:
     - Search menus by name
     - Sort menu by price
     - Filter menu by category
   - Provide options for portion size, toppings, etc.
   - Allow users to add menus to the cart with selected options.

4. Order Cart
   - Display all food menus that have been ordered.
   - Allow users to edit menu quantity ordered and remove orders from the cart.

5. Payment and Checkout System
   - Display a summary of the selected menu.
   - Allow users to remove one or all menus from the cart.
   - Show payment option options, including the use of existing coupon codes.
   - Create an order and send it to the admin side.

6. Order History List
   - Allow customers to give ratings and reviews of the menus they have ordered.
   - Display order history and provide filtering and searching options.
   - Display all order history from users with filters by menu name, category, and order date.
   - Provide sorting options for order history.

7. Games
   - Implement a multiple-choice quiz game with any theme.
   - Users receive a prize coupon if they can answer the quiz until it reaches the predetermined score.
   - Coupons will be added to the user profile.
   - Users have 3 chances in a day to play the game.
   - Show a leaderboard for players with the highest accumulated score.

### Features Admin Side

1. Dashboard
   - Show total transactions with date filter features (7 days last, last month, etc.).

2. Data Management Orders
   - Display a list of orders received from customers.
   - Display the status of delivery orders (In progress, in transit, received) and update the status of delivery orders.

3. Menu Data Management
   - Implement CRUD functions (Create, Read, Update, Delete) for food menus (Name, Description, Price, etc.).
   - Display the rating of each food menu.

4. Coupon Data Management
   - Display all available coupons and allow the deletion and creation of coupons.

5. User Review Management
   - Display all available menus and allow selection of one menu to open a new page containing all reviews and ratings from customers.

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

### Database

Make a database implementation of the ERD in Figure 1. Consider appropriate data types and constraints for each column.

## Database Design (ERD)

```
Users
- Customer id (UNIQUE, NOT NULL)
- Full Name
- Phone
- Email Address
- Password
- Profile Picture
- Register Date
- Payment options id
- Favorite Menu(s)
- Owned Coupon id(s)

Orders
- Order id (UNIQUE, NOT NULL)
- Customer id
- Menu id(s)
- Order date
- Delivery date
- Amount
- Price
- Available
- Menu photo

Delivery
- Delivery id (UNIQUE, NOT NULL)
- Customer id
- Payment options id
- Delivery status

Game
- Game id (UNIQUE, NOT NULL)
- Customer id
- Score
- Leaderboard id

Leaderboard
- Leaderboard id (UNIQUE, NOT NULL)
- Customer id
- Accumulated score

Coupon
- Coupon id (UNIQUE, NOT NULL)
- Coupon code
- Coupon discount amount

Customer Reviews
- Customer review id (UNIQUE, NOT NULL)
- Customer id
- Menu id
- Review description
- Rating
```

Example JSON Server data:
```json
{
  "email": "asd@gmail.com"
}
```
