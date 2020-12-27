# Fantastical Enterprise

Working, simple full-stack concept of a theoretical Fantastical Enterprise. 

Site is currently [live on my personal Linode server](http://45.79.55.168:8006).

## Installation

- Clone repo
- `cd fantastical-enterprise && npm install`
- Install MySQL
- Make sure the MySQL process is running
- Create database `fantastical` in MySQL
- Create user `fantastical` with password `calendar` in MySQL
- Give user `fantastical` all privileges to database `fantastical`
- Import `fantastical-db.sql` ([instructions](https://www.digitalocean.com/community/tutorials/how-to-import-and-export-databases-and-reset-a-root-password-in-mysql)) into database `fantastical`
- In MySQL, run `ALTER USER 'fantastical'@'localhost' IDENTIFIED WITH mysql_native_password BY 'calendar';`
- `npm run build`
- `mkdir build/backend`
- Create `build/backend/.env` with the content:

```
MYSQL_USER=fantastical
MYSQL_PASSWORD=calendar
PORT=8006
```

- `npm run app`
- Open browser to `http://localhost:8006`

## Tech Stack

I'll explain a couple of my technical choices.

### Express

This web app is a simple Express backend that serves a React frontend and accepts its HTTP requests. I went with Express simply because I am more familiar with it and wanted to go quickly. 

Additionally, using client- and server-side TypeScript meant I was able to share models using the exact same code.

### TypeScript

I will always choose to work with TypeScript. It's easier to write and easier to read. A good type expresses everything to other developers and makes it easy to understand what old code does.

### Ant Design

I wanted to build a site quickly, and I did not want to spend that time replicating common functionality, such as forms and a card layout. I picked Ant Design because I liked the aesthetic and it seemed to git Flexibits' branding better than, say, [Material UI](https://material-ui.com).

### MySQL

Any relational database could have worked here, but I wanted to use the one you guys asked for!

### DayJS

[Moment is in maintenance mode](https://www.reddit.com/r/javascript/comments/j9fq3n/momentjs_is_deprecated_heres_how_i_chose_a/), cool people use DayJS. DayJS is immutable and only 2KB. 

## Features

I tried to stick reasonably close to 8-10 hours (though I did a little extra to deploy it).

### Features Included

- Mobile- and desktop-friendly layouts
- User signup
- Email/password validation
- Logging out and back in
- Users can create a company
- Users can select a plan when they've made a company
- Users can see their unused seats, monthly costs and current plan
- Users, plans and companies persist server-side in MySQL
- CORS

### Features Cut

As you know, in real development work, there are time constraints. I tried to stick to 8-10 hours to show I will respect time limits at a real job, even though I really wanted to implement some of these.

- Server-side integration tests
- Client-side component unit tests
- Model unit tests
- Password hashing
- Inviting other users
- Calculating active seats based on other users accepting invitations, not as a number to input
- JWTs stored in localStorage, so the user does not lose all client-side session data on refresh
- Server rendering in Express (right now you cannot refresh the browser on any sub-route)
- API authorization checks
- Using JSON Schema or any other tool to validate POST/PATCH request bodies
- Useful API errors
- Client-side error display
- Some fancy animations for the the colorful seats used display on `/plan`
- TS types for `mysql-promisify`
- Create MySQL db in code
- Localized currency display

## Small Touches

I hope you like some of the small bits of polish I threw in. 

- Uses Flexibits' logo
- Replicates Flexibits website header
- Uses Flexibits' font
