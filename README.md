# E-Commerce Backend (using Object-Relational Mapping (ORM) for SQL Database)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Tests In Insomnia](#tests-in-insomnia)
- [Credits](#credits)
- [License](#license)

## Description

In the world of Internet, online shopping and owning online businesses is a trend. This is an E-Commerce Backend built using Object-Relational Mapping (ORM) for SQL Database. It is a server-side application that powers the functionality of an online store. A few learning points for me were:

1. **Object-Relational Mapping (ORM):** Developing an E-Commerce Backend using ORM for SQL Database involves learning how to map object-oriented models to relational database tables. This enables developers to interact with the database using high-level programming languages like JavaScript.

2. **Database Design:** Understanding how to design an efficient and scalable database schema is crucial. It includes creating tables for products, categories, and tags, and managing relationships between them.

3. **Inventory Management:** Learning how to track and manage product inventory, including updating stock levels when orders are placed and handling out-of-stock situations.

**Problem this project should solve:**

The E-Commerce Backend using ORM for SQL Database addresses the following problems:

1. **Online Store Functionality:** It provides the necessary backend functionality to build and operate an online store, allowing businesses to sell products and services over the internet.

2. **Scalability:** It enables businesses to scale their operations as they grow, handling a large number of products, users, and orders efficiently.

3. **Data Integrity:** By using an SQL database, it ensures data integrity and consistency, which is crucial for managing product information, user accounts, and financial transactions.

4. **Security:** It implements security measures to protect user data, payment information, and prevent unauthorized access to the system.

5. **User Experience:** It contributes to a seamless and user-friendly shopping experience by managing shopping carts, order histories, and providing secure payment options.

6. **Inventory Management:** It assists in keeping track of product availability and automates inventory updates as orders are placed.

## Installation

No installation steps are required to view the project's functionality. Simply follow the walkthrough video below to see the routes and functionality in action.

[View Walkthrough Video](https://watch.screencastify.com/v/4SyidmgdqGKth92X8xXz)

## Tests In Insomnia

a. **Testing All Categories Routes**

Sent GET request to view all the categories with associated products information, results as expected

![All Category Routes Test](/assets/images/Allcategories.png)

b. **Testing All Product Routes**

Sent GET requests to view all the products by and associated category_id and tag_id, results as expected

![Products By Tag & Category Routes Test](assets/images/AllProducts.png)

c. **Testing All Tag Routes**

Sent GET request to view all the Tags with associated product_id and category_id, results as expected

![Tag Routes Test](assets/images/AllTags.png)

## Credits

[Louis Delia & Marcos Mujica](https://git.bootcampcontent.com/George-Washington-University/GWU-VIRT-FSF-PT-05-2023-U-LOLC/-/tree/main/13-ORM)

## License

MIT License

Copyright (c) [2023]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### Badge

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
