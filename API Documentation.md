# Witty Blog API Documentation

## Introduction

Witty Blog API documentation for Witty Blog project.

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

## Allowed HTTP Requests

- GET : Get a resource or list of resources
- POST : Create a resource
- PUT : Update a resource
- DELETE : Delete a resource

## Description Of Server Responses

- 200 `OK` - the request was successful.
- 201 `Created` - the request was successful and a resource was created.
- 204 `No Content` - the request was successful but there is no representation to return (i.e. the response is empty).
- 400 `Bad Request` - the request could not be understood or failed validation.
- 404 `Not Found` - resource was not found.

## Base URL

`http://localhost:3000/api/v1`

## Endpoints

`GET: /posts` - Get all Posts.
`GET: /posts?page=1&limit=1` - Get all Posts with Pagination where page and limit are query parameters.
`GET: /post/:id` - Get a Post where Post ID is :id.
`POST: /post` - Create a Blog Post.
`PUT: /post/:id` - Update a blog post where Post ID is :id.
`Delete: /post/:id` - Delete a blog post where Post ID is :id.
`POST: /post/:postID/comment` - Add comment to a blog post where post ID is :postID.
`GET: /post/:postID/:commentID` - Get a comment on a blog post where post ID is :postID and comment ID is :commentID.
`PUT: /post/:postID/:commentID` - Update comment on a blog post where post ID is :postID and comment ID is :commentID.
`Delete: /post/:postID/:commentID` - Delete comment on a blog post where post ID is :postID and comment ID is :commentID.

## Resources

---

### Get All Blog Posts

---

Returns json data of all blog posts to the application.

- **URL and Method**
  `GET http://localhost:3000/api/v1/posts`

- **Success Response**

```
Status 200 OK
Content-Type: application/json; charset=utf-8

{
  "code": 200,
  "status": "Success",
  "data": {
    "_id": "60c0c429fe1d790640760ec0",
    "author": "Saka",
    "title": "New Post with validation",
    "content": "Latest Post",
    "comments": [
      {
        "_id": "60c11b0be548ba281878519d",
        "username": "Saarious Sakaa",
        "comment": "New Nice Post Geera",
        "Date": "2021-06-09T19:48:27.262Z",
        "__v": 0
      },
      {
        "_id": "60c11b2f234834450c04d763",
        "username": "Saarious Sakaa",
        "comment": "New Nice Post Geera New",
        "Date": "2021-06-09T19:49:03.071Z",
        "__v": 0
      },
      {
        "_id": "60c11b93ef3fae3138a67e85",
        "username": "Garri Man",
        "comment": "Nice one gee",
        "Date": "2021-06-09T19:50:43.327Z",
        "__v": 0
      },
      {
        "_id": "60c11c300eec982b80b8b255",
        "username": "Garri Man",
        "comment": " meran mtNice one gee",
        "Date": "2021-06-09T19:53:20.468Z",
        "__v": 0
      },
      {
        "_id": "60c1fc564aea772e780f494e",
        "username": "Ahmad",
        "comment": "You're Madd",
        "Date": "2021-06-10T11:49:42.975Z",
        "__v": 0
      }
    ],
    "Date": "2021-06-09T13:37:45.736Z",
    "__v": 0
  },
  "error": null
}

Where Post Object is:

| Field         			| Type         | Description                                     |
| --------------|--------------|-------------------------------------------------|
| _id            			| string       	  | A unique identifier for the post.
| author         			| string          | The post’s author
| title                     | string       	  | The post’s title
| content                   | string	   	  | The post’s content
| comments           		| Array of Objects| Post's Comment
| _id (comments object)  	| string          | A unique identifier for the post.
| username (comments object)| string          | Username of user commenting
| comment (comments object) | string          | User's comment
| Date (comments object)    | timestamp       | Date comment was posted.
```

- **Request Successful but Empty Response** - Simply means there's no post in the database.

```
Status 200 OK
{
  "code": 200,
  "status": "No Post in Database",
  "message": "No Post in Database,Start Writing."
}
```

- **Error Response**

```
Status 500 Internal Server Error
{
  "code": 500,
  "status": "Failed",
  "message": "You cannot get all posts at the moment"
}
```

---

### Get All Blog Posts With Pagination

---

Returns json data with pagination of blog posts to the application.

- **URL and Method**
  `GET http://localhost:3000/api/v1/posts?page=2&limit=2`

- **Query Params**

  **Required:**

  `page=[integer]`
  `limit=[integer]`

- **Success Response**

```
Status 200 OK
Content-Type: application/json; charset=utf-8

{
  "code": 200,
  "status": "Success",
  "data": {
    "next": {
      "page": 3,
      "limit": 2
    },
    "previous": {
      "page": 1,
      "limit": 2
    },
    "success": [
      {
        "_id": "60c0c455fe1d790640760ec2",
        "author": "Sakarious",
        "title": "Learn How to Learn in 34 mins",
        "content": "In this Post, I will teach you  How to Learn in 34 mins",
        "comments": [],
        "Date": "2021-06-09T13:38:29.876Z",
        "__v": 0
      },
      {
        "_id": "60c0c47efe1d790640760ec3",
        "author": "Sakarious",
        "title": "Learn How to Learn in 13 mins",
        "content": "In this Post, I will teach you  How to Learn in 23 mins",
        "comments": [],
        "Date": "2021-06-09T13:39:10.558Z",
        "__v": 0
      }
    ]
```

- **Request Successful but Empty Response** - Simply means there's no post in the database.

```
Status 200 OK
{
  "code": 200,
  "status": "Success",
  "data": {
    "previous": {
      "page": 1,
      "limit": 2
    },
    "success": []
  },
  "error": null
}
```

- **Error Response**

```
Status 500 Internal Server Error
{
  "code": 500,
  "status": "Failed",
  "message": "You cannot get all posts at the moment"
}
```

---

### Create a Blog Post

---

Creates a post in the application.

- **URL and Method**
  `POST http://localhost:3000/api/v1/post`

- **Request**

```
POST http://localhost:3000/api/v1/post HTTP/1.1
Content-Type: application/json

{
  "author": "Sakarious",
  "title": "New Blog Post",
  "content": "My first Blog Post"
}
```

With the following fields:

| Parameter | Type   | Required? | Description                  |
| --------- | ------ | --------- | ---------------------------- |
| author    | string | required  | Name of author of blog post. |
| title     | string | required  | Title of blog post           |
| content   | string | required  | The body of the post.        |

- **Success Response**

```
Status 201 Created
Content-Type: application/json; charset=utf-8

{
  "code": 201,
  "status": "New Post Created Successfully",
  "data": {
    "_id": "60c321d52fbb332d30880962",
    "author": "Sakarious",
    "title": "New Blog Post",
    "content": "My first Blog Post",
    "comments": [],
    "Date": "2021-06-11T08:41:57.938Z",
    "__v": 0
  },
  "error": null
}

Where Post Object is:

| Field         			| Type         | Description                                     |
| --------------|--------------|-------------------------------------------------|
| _id            			| string       	  | A unique identifier for the post.
| author         			| string          | The post’s author
| title                     | string       	  | The post’s title
| content                   | string	   	  | The post’s content
| comments           		| Array of Objects| Post's Comment
| Date (comments object)    | timestamp       | Date comment was posted.
```

Possible errors:

| Error code                | Description                                     |
| ------------------------- | ----------------------------------------------- |
| 400 Bad Request           | Required fields were invalid, validation failed |
| 500 Internal Server Error | Server Error                                    |

---

### Get Blog Post By ID

---

Returns json data of a blog post to the application.

- **URL and Method**
  `GET http://localhost:3000/api/v1/post/60c0c429fe1d790640760ec0`

- **Success Response**

```
Status 200 OK
Content-Type: application/json; charset=utf-8

{
  "code": 200,
  "status": "Success",
  "data": {
    "_id": "60c0c429fe1d790640760ec0",
    "author": "Saka",
    "title": "New Post with validation",
    "content": "Latest Post",
    "comments": [
      {
        "_id": "60c11b0be548ba281878519d",
        "username": "Saarious Sakaa",
        "comment": "New Nice Post Geera",
        "Date": "2021-06-09T19:48:27.262Z",
        "__v": 0
      },
      {
        "_id": "60c11b2f234834450c04d763",
        "username": "Saarious Sakaa",
        "comment": "New Nice Post Geera New",
        "Date": "2021-06-09T19:49:03.071Z",
        "__v": 0
      },
    ],
    "Date": "2021-06-09T13:37:45.736Z",
    "__v": 0
  },
  "error": null
}
Where Post Object is:

| Field         			| Type         | Description                                     |
| --------------|--------------|-------------------------------------------------|
| _id            			| string       	  | A unique identifier for the post.
| author         			| string          | The post’s author
| title                     | string       	  | The post’s title
| content                   | string	   	  | The post’s content
| comments           		| Array of Objects| Post's Comment
| _id (comments object)  	| string          | A unique identifier for the post.
| username (comments object)| string          | Username of user commenting
| comment (comments object) | string          | User's comment
| Date (comments object)    | timestamp       | Date comment was posted.
```

- **No Post Found**

```
Status 404 Not Found
{
  "code": 404,
  "status": "Post not found",
  "message": "Post not found in database"
}
```

- **Error Response**

```
Status 500 Internal Server Error
{
  "code": 500,
  "status": "Failed",
  "message": ""You cannot get post at the moment"
}
```

---

### Update a Blog Post

---

Update an existing post in the application.

- **URL and Method**
  `PUT http://localhost:3000/api/v1/post/60c0c429fe1d790640760ec0`

- **URL Params**

  **Required:**

  `PostID :id =[objectID]`

- **Request**

```
POST http://localhost:3000/api/v1/post/60c0c429fe1d790640760ec0 HTTP/1.1
Content-Type: application/json

{
  "title": "New Blog Post",
  "content": "My first Blog Post Updated"
}
```

With the following fields:

| Parameter | Type   | Required? | Description              |
| --------- | ------ | --------- | ------------------------ |
| title     | string | required  | New title of blog post.  |
| content   | string | required  | New Content of blog post |

- **Success Response**

```
Status 200 OK
Content-Type: application/json; charset=utf-8

{
  "code": 201,
  "status": "Success",
  "data": {
    "_id": "60c321d52fbb332d30880962",
    "author": "Sakarious",
    "title": "New Blog Post",
    "content": "My first Blog Post Updated",
    "comments": [],
    "Date": "2021-06-11T08:41:57.938Z",
    "__v": 0
  },
  "error": null
}

Where Post Object is:

| Field         			| Type         | Description                                     |
| --------------|--------------|-------------------------------------------------|
| _id            			| string       	  | A unique identifier for the post.
| author         			| string          | The post’s author
| title                     | string       	  | New post title
| content                   | string	   	  | New post content
| comments           		| Array of Objects| Post's Comment
| Date (comments object)    | timestamp       | Date comment was posted.
```

Possible errors:

| Error code                | Description                                      |
| ------------------------- | ------------------------------------------------ |
| 404 Not Found             | Post to be edited cant be found in the database. |
| 500 Internal Server Error | Server Error                                     |

---

### Delete a Blog Post

---

Returns json data of a blog post successfully deleted to the application.

- **URL and Method**
  `DELETE http://localhost:3000/api/v1/post/60c0c429fe1d790640760ec0`

- **URL Params**

  **Required:**

  `PostID :id =[objectID]`

- **Success Response**

```
Status 200 OK
Content-Type: application/json; charset=utf-8

{
  "code": 200,
  "status": "Success",
  "data": {
    "_id": "60c0c429fe1d790640760ec0",
    "author": "Saka",
    "title": "New Post with validation",
    "content": "Latest Post",
    "comments": [
      {
        "_id": "60c11b0be548ba281878519d",
        "username": "Saarious Sakaa",
        "comment": "New Nice Post Geera",
        "Date": "2021-06-09T19:48:27.262Z",
        "__v": 0
      },
      {
        "_id": "60c11b2f234834450c04d763",
        "username": "Saarious Sakaa",
        "comment": "New Nice Post Geera New",
        "Date": "2021-06-09T19:49:03.071Z",
        "__v": 0
      },
    ],
    "Date": "2021-06-09T13:37:45.736Z",
    "__v": 0
  },
  "error": null
}
Where Deleted Post Object is:

| Field         			| Type         | Description                                     |
| --------------|--------------|-------------------------------------------------|
| _id            			| string       	  | Deleted unique identifier for the post.
| author         			| string          |	Deleted post author
| title                     | string       	  | Deleted post title
| content                   | string	   	  | Deleted post content
| comments           		| Array of Objects| Deleted Comments

```

- **No Post Found**

```
Status 404 Not Found
{
  "code": 404,
  "status": "Post not found",
  "message": "Post not found in database"
}
```

- **Error Response**

```
Status 500 Internal Server Error
{
  "code": 500,
  "message": "Failed",
  "error": "You cannot delete post at the moment. P.S: Check if post ID is valid"
}
```

---

### Add Comment to Blog Post

---

Adds comment to a blog post in the application.

- **URL and Method**
  `POST http://localhost:3000/api/v1/post/60c0c44bfe1d790640760ec1/comment`

- **URL Params**

  **Required:**

  `PostID :id =[objectID]`

- **Request**

```
POST http://localhost:3000/api/v1/post/60c0c44bfe1d790640760ec1/comment HTTP/1.1
Content-Type: application/json

{
    "username": "Sakarious",
    "comment": "New Comment"
}
```

With the following fields:

| Parameter | Type   | Required? | Description                  |
| --------- | ------ | --------- | ---------------------------- |
| username  | string | required  | Username of user commenting. |
| comment   | string | required  | User's Comment               |

- **Success Response**

```
Status 201 Created
Content-Type: application/json; charset=utf-8

{
  "code": 201,
  "status": "Success",
  "data": {
    "_id": "60c0c44bfe1d790640760ec1",
    "author": "Sakarious",
    "title": "Learn How to Learn in 15 mins",
    "content": "In this Post, I will teach you  How to Learn in 15 mins",
    "comments": [
      {
        "_id": "60c129e019f9e94e209e0f83",
        "username": "Garri Boy",
        "comment": "Updated Comment",
        "Date": "2021-06-09T20:51:44.531Z",
        "__v": 0
      },
      {
        "_id": "60c33011a211530a74e63e60",
        "username": "Sakarious",
        "comment": "New Comment",
        "Date": "2021-06-11T09:42:41.429Z",
        "__v": 0
      }
    ],
    "Date": "2021-06-09T13:38:19.887Z",
    "__v": 0
  },
  "error": null
}

Where Post Object is:

| Field         			| Type         | Description                                     |
| --------------|--------------|-------------------------------------------------|
| _id            			| string       	  | A unique identifier for the post.
| author         			| string          | The post’s author
| title                     | string       	  | The post’s title
| content                   | string	   	  | The post’s content
| comments           		| Array of Objects| Post's Comment
| Date (comments object)    | timestamp       | Date comment was posted.
| _id (comments object)  	| string          | A unique identifier for the post.
| username (comments object)| string          | Username of user commenting
| comment (comments object) | string          | User's comment
| Date (comments object)    | timestamp       | Date comment was posted.
```

Possible errors:

| Error code                | Description                                     |
| ------------------------- | ----------------------------------------------- |
| 400 Bad Request           | Required fields were invalid, validation failed |
| 404 Not Found             | Post to comment to was not found                |
| 500 Internal Server Error | Server Error                                    |

---

### Get Post Comment By ID

---

Returns json data of a blog post comment to the application.

- **URL and Method**
  `GET http://localhost:3000/api/v1/post/60c0c44bfe1d790640760ec1/60c33011a211530a74e63e60`

- **URL Params**

  **Required:**

  `PostID :postID =[objectID]`
  `CommentID :commentID =[objectID]`

- **Success Response**

```
Status 200 OK
Content-Type: application/json; charset=utf-8

{
  "code": 200,
  "status": "Success",
  "data": {
    "_id": "60c0c44bfe1d790640760ec1",
    "comments": [
      {
        "_id": "60c33011a211530a74e63e60",
        "username": "Sakarious",
        "comment": "New Comment",
        "Date": "2021-06-11T09:42:41.429Z",
        "__v": 0
      }
    ]
  },
  "error": null
}
Where Post Object is:

| Field         			| Type         | Description                                     |
| --------------|--------------|-------------------------------------------------|
| _id            			| string       	  |Post unique identifier.
| comments           		| Array of Object| Post's Comment
| _id (comments object)  	| string          | A unique identifier for the post.
| username (comments object)| string          | Username of user commenting
| comment (comments object) | string          | User's comment
| Date (comments object)    | timestamp       | Date comment was posted.
```

- **No Post Found**

```
Status 404 Not Found
{
  "code": 404,
  "status": "Post comment not found",
  "message": "Post comment not found in database"
}
```

- **Error Response**

```
Status 500 Internal Server Error
{
  "code": 500,
  "message": "Failed",
  "error": "You cannot get comment at the moment. P.S: Check Post or Comment ID"
}
```

---

### Update Comment on a Blog Post

---

Update an existing post comment in the application.

- **URL and Method**
  `PUT http://localhost:3000/api/v1/post/60c0c44bfe1d790640760ec1/60c33011a211530a74e63e60`

- **URL Params**

  **Required:**

  `PostID :postID =[objectID]`
  `CommentID :commentID =[objectID]`

- **Request**

```
PUT http://localhost:3000/api/v1/post/60c0c44bfe1d790640760ec1/60c33011a211530a74e63e60 HTTP/1.1
Content-Type: application/json
{
    "username": "Sakarious",
    "comment": "Updated Comment"
}
```

With the following fields:

| Parameter | Type   | Required? | Description         |
| --------- | ------ | --------- | ------------------- |
| username  | string | required  | Username to update. |
| comment   | string | required  | New Comment         |

- **Success Response**

```
Status 200 OK
Content-Type: application/json; charset=utf-8

{
  "code": 201,
  "status": "Success",
  "data": {
    "_id": "60c0c44bfe1d790640760ec1",
    "author": "Sakarious",
    "title": "Learn How to Learn in 15 mins",
    "content": "In this Post, I will teach you  How to Learn in 15 mins",
    "comments": [
      {
        "_id": "60c129e019f9e94e209e0f83",
        "username": "Garri Boy",
        "comment": "Updated Comment",
        "Date": "2021-06-09T20:51:44.531Z",
        "__v": 0
      },
      {
        "_id": "60c33011a211530a74e63e60",
        "username": "Sakarious",
        "comment": "Updated Comment",
        "Date": "2021-06-11T09:42:41.429Z",
        "__v": 0
      }
    ],
    "Date": "2021-06-09T13:38:19.887Z",
    "__v": 0
  },
  "error": null
}

Where Post Object is:

| Field         			| Type         | Description                                     |
| --------------|--------------|-------------------------------------------------|
| _id            			| string       	  | A unique identifier for the post.
| author         			| string          | The post’s author
| title                     | string       	  | The post’s title
| content                   | string	   	  | The post’s content
| comments           		| Array of Objects| Post's Comment
| _id (comments object)  	| string          | A unique identifier for the post.
| username (comments object)| string          | Username of user commenting
| comment (comments object) | string          | User's comment
| Date (comments object)    | timestamp       | Date comment was posted.
| Date    | timestamp       | Date post was posted.
```

```


Possible errors:

| Error code           | Description                                                                                                          |
| ---------------------|----------------------------------------------------------------------------------------------------------------------|
|404 Not Found      | Post or comment to be edited cant be found in the database.                                                     |
|500 Internal Server Error     | Server Error                                                       |
```
