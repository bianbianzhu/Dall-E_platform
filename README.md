# Project Name

Dall-E Platform

## Description

This project is a simple demo showcasing the ease and excitement of creating AI-generated images for clients. It provides a hands-on experience of the process and highlights the capabilities of AI technology in the field of image generation. This readme file provides an overview of the project, its purpose, features, installation instructions, and any other relevant information.

## Table of Contents

- [Project Name](#project-name)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [tech stack](#tech-stack)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Features

- Feature 1: Generate AI images using openai apis
- Feature 2: Share the images with the community

## Tech stack

The idea and styling are inspired by https://labs.openai.com/ and online resource

The frontend: React, Vite, TailwindCSS (amazing experience with copliot), Typescript
The backend: Node.js, Express, MongoDB, Mongoose, Typescript (to improve the developer experience, I am using node-ts with nodemon to watch the changes and restart the server automatically)

Database: MongoDB Atlas (because it is free 😈)
Image storage: Cloudinary (because it is free 😈)

APIs: OpenAI API, https://platform.openai.com/docs/guides/images/introduction

## Setup

### Prerequisites

- Node version: v18.16.0 (LTS)

1. Clone the repository
2. Install the required dependencies: `yarn install`
3. Configure the client settings: Open the `.env` file for frontend and update the following environmental variables

- VITE_BACKEND_ENDPOINT (Example: VITE_BACKEND_ENDPOINT='http://localhost:3001/api/v1')

4. Configure the server settings: Open the `.env` file for backend and update the following environmental variables

- PORT (Example: PORT=3001)
- MONGODB_URI (Example: MONGODB_URI='mongodb+srv://admin:yourPassword@cluster0.rlktm9k.mongodb.net/?retryWrites=true&w=majority')
- OPENAI_API_KEY (Example: OPENAI_API_KEY='sk-xxxxxx')
- CLOUDINARY_CLOUD_NAME (Example: CLOUDINARY_CLOUD_NAME='xxxxxx')
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

5. Run the project:

- Frontend: `yarn run dev`
- Backend: `yarn run dev`

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.
