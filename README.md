# Contact Management API

A RESTful API for managing contacts, built with Express.js and TypeScript.

## Features

- CRUD operations for contacts
- Validation using Zod schemas
- TypeScript for type safety
- Error handling middleware
- CORS enabled
- Request logging with Morgan

## Project Decissions Explanation

I used a really simple express app after exploring other options like NestJS
and FeathersJS. I took this decision as I found NestJS to be overcomplicated
for a simple API, FeathersJS seemed interesting option but the documentation
was really confusing.

As suggested I used a lot of IA to build the app, for this particular project
I used mostly [bolt](https://bolt.new) and I wanted to test it out, and some
minor fixes and improvements have been done by cursor-small model integrated
in my IDE.

I built this app in a little more than an hour, but mostly because of previous
exploration and then extensive improvements, deployment and testing, as the
base code has took just a few minutes thanks to IA.

## Demo

This API is currently deployed on render:
[Deployed app](https://contact-api-lksv.onrender.com/contacts)

For simplicity, a postman workspace and collection is available to try it:
[Postman Collection](https://www.postman.com/payload-physicist-42769988/test-contacts-app/collection/ajdxxf0/contacts)

As this project does not persist data and render shuts down the apps when
they are inactive, data can be resetted after a few minutes of inactivity.