# Description

[WittyBlog](https://github.com/sakarious/witty-blog-restfulAPI) API Backend for blog

# Setup

## Requirements

To run this application, you'll need:

- Node.js and

- Node Package Manager (NPM), installed in your environment.

- A MongoDB database

### Node

- #### Node installation on Windows

Just go on [official Node.js website](https://nodejs.org/) and download the installer.

Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

You can install nodejs and npm easily with apt install, just run the following commands.

$ sudo apt install nodejs

$ sudo apt install npm

- #### Other Operating Systems

You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

$ node --version

v16.1.0

$ npm --version

7.11.2

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

$ npm install npm -g

### MongoDB

The project uses MongoDB as a database. You can download MongoDB Compass for your platform or use [Atlas](https://www.mongodb.com/cloud/atlas/signup) (MongoDB Cloud Databse.

---

## Install / Clone Repo

$ git clone https://github.com/sakarious/witty-blog-restfulAPI.git

$ cd witty-blog-restfulAPI

## Configure app

Create a .env file and put the following:

- MONGODB='`<mongodbURL>`'

- Where `<mongodbURL>` is a valid mongodb url.

## Installation

```bash

$ npm install

```

## Running the app

```bash

# development

$ npm run start



# watch mode

$ npm run dev

```

## Test

```bash

# unit tests

$ npm run test

```

## API Documentation

The API Documentation is present in the repository/project folder root directory. Kindly find a file with the name:

```

API Documentation.md

```

# PAY SPECIAL ATTENTION TO:

## Features

- Get all Blog Posts

- Get all Blog Posts with Pagination

- Get Post By ID

- Create Blog Post

- Update Blog Post

- Delete Blog Post

- Add Comment to a Blog Post

- Get Comment on a Blog Post

- Edit Comment on a Blog Post

- Delete Comment on a Blog Post

## Architectural Pattern Used.

I used the Model View Controller Architectural Pattern

- Model View Controller (MVC)

Model View Controller is a software architectural pattern that involves the separation of the application logic into three interconnected elements the Model, View, and Controller.

I maintained Separation of Concern (SoC) technique. Separation of concerns (SoC) is a design principle for separating software applications into distinct sections such that each section addresses a separate concern. A concern is a set of information that affects the code of a Software Application.

## Software Design Principles.

I tried to follow the following principles:

- #### Don't Repeat Yourself (DRY) Principle

- #### SOLID Principle. SOLID is an acronym for:

- **S**ingle Responsibility Principle

- **O**pen/Closed Principle

- **L**iskov Substitution Principle

- **I**nterface Segregation Principle

- **D**ependency Inversion

- #### “Keep it simple, Stupid!” (KISS) design principle.

## Completeness

I tried as much as possible to validate data/payloads.

## Code Structure.

I used the Model-Routes-Controllers-Services Code Structure.

# TO-DO:

- Write more tests cases. I definitely didn't cover every scenario in my test. I hope I get to :)
- Write more comments.
- Optimize Code.
- Consider Security
- Give Better Description to success response. e.g "Post Update Successful" instead of "Success"

## Stay in touch

- Author - [Oluwasegun Ajayi](https://github.com/sakarious)

- Linkedin - [My profile](https://www.linkedin.com/in/oluwasegun-ajayi-0b16b0186/)
