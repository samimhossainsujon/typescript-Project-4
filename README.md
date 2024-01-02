# typescript Project 4
# typescript Project 4

#### Instructions on how to run the application locally.

GitHub repository link:-

```bash
https://github.com/Porgramming-Hero-web-course/l2b2a4-course-review-with-auth-samimhossainsujon
```

Vercel Live site link:-

```bash
https://assignment-4-gilt.vercel.app/
```

Post man Docomention Url

```bash
https://documenter.getpostman.com/view/29367929/2s9YsDjaQ9
```

Clone the Project.

```bash
https://github.com/Porgramming-Hero-web-course/l2b2a4-course-review-with-auth-samimhossainsujon
```

Go To Project Directory

```bash
    cd the project
```

Install Require Dependance

```bash
    npm install
```

Run Server

```bash
npm run start:dev

```

##### Then check how to work this project go to Postman

Auth Route

Create User

```bash
 http://localhost:5000/api/auth/register
```

Login User

```bash
http://localhost:5000/api/auth/login
```

Possword Change User

```bash
http://localhost:5000/api/auth/change-password
```

Create a Course

```bash
 http://localhost:5000/api/courses
```

Get All Courses Paginated and Filtered Courses
Filter

```bash
  http://localhost:5000/api/courses?language=English
```

Paginated

```bash
  http://localhost:5000/api/courses?page=1&limit=1
```

PUT: Courses Data Dynamic Update

```bash
  http://localhost:5000/api/courses/:_id
```

Create categories Post

```bash
 http://localhost:5000/api/categories
```

Get All categories

```bash
 http://localhost:5000/api/categories
```

###### Reviews Related Api

Create Reviews Post

```bash
  http://localhost:5000/api/reviews
```

Get Course by ID with Reviews

```bash
http://localhost:5000/api/courses/:courseId/reviews
```

Get the Best Course Based on Average Review

```bash
 http://localhost:5000/api/course/best
```
