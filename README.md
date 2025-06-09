# Frontend interview

## Context

You will work on an e-commerce application for food products (fruits, vegetables, dairy, etc.). The goal is to evaluate your knowledge of React, state management, hooks, testing and CSS/HTML best practices, as well as your ability to communicate technical decisions.

## Goals

1. **Catalog interface:** display a list of products obtained from a simulated API.
2. **Shopping cart:** view summary, view total quantities, modify quantities of items in cart and delete items from cart.
3. **Testing:** testing the application with Vitest and React Testing Library.

## Functional requirements

| Functionality        | Detail                                                                                                                                    |  
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| Products list        | Served from http://localhost:8000/api/products. The user should be able to visualize the product list in a grid and add items to the cart |
| Shopping cart button | Shows the total units added to the cart.  Clicking the button should navigate to the checkout page                                        |
| Checkout page        | Route `/checkout`.  The user should be able to see all the products with their total quantity/price per product                           |

## The boilerplate

The project is a Vite + React application. You can run the application with `npm run dev` and the tests with `npm run test`. The API is a simple Express server that serves the products list. You can start the API with the command `npm run api`. The API documentation is served at `http://localhost:8000/docs`.

## Screenshots

### Home page

![Frontend interview](home.png)

### Cart page

![Frontend interview](cart.png)