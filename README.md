# Awesome Send Message Form

## Project requirements

- [x] Develop contact form
- [x] Form should have validation rules
- [x] Implement custom validation for each field
- [x] Form should submit the data to a serverless function. Function should send email with submitted data to a given email address.

## How to start
### Install
``npm i``

### Set the SendGrid API key

You can set [your own](https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail#prerequisites) SENDGRID_API_KEY via `.env` file. For that you can copy and rename `.env.template`.

### Run
```npm run dev```

### Project structure /src

`components` - reusable React components

`layouts` - Astro layout

`pages` - Astro router and API Endpoint

`styles` - common styles

`types` - declarations of common types

`utils` - useful functions for validation and requests

### Technology stack

React, Astro, Vercel, SendGrid.
