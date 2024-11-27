# Beaderd Blogger server

**My Express Server Project**

_Based on the [Node Express Boilerplate](https://github.com/hagopj13/node-express-boilerplate) by Hagop Jamkojian (@hagopj13)_

---

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Project Description

This project is a Node.js and Express server designed to handle [your project's purpose, e.g., article creation, user authentication, etc.]. It is built upon the [Node Express Boilerplate](https://github.com/eddiesosera/node-express-boilerplate-master) by Hagop Jamkojian (https://github.com/@hagopj13), adopting its file structure and naming conventions to ensure scalability and maintainability.

Key functionalities include:

- **User Authentication:** Secure login and registration using JWT.
- **CRUD Operations:** Create, Read, Update, and Delete operations for articles.
- **Image Uploads:** Integration with Cloudinary for handling image uploads.
- **Validation:** Robust request validation using Joi or similar libraries.
- **Error Handling:** Centralized error handling for consistent API responses.
- **Logging:** Request and error logging using Morgan and Winston.

---

## Features

- **Modular Architecture:** Organized folder structure for routes, controllers, models, and middleware.
- **Environment Configuration:** Manage configurations using environment variables.
- **Security Enhancements:** Implement security best practices with Helmet and CORS.
- **Database Integration:** Connect to MongoDB/PostgreSQL for data persistence.
- **API Documentation:** Comprehensive API documentation with Swagger or similar tools.

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Installed (version 14.x or higher recommended). [Download Node.js](https://nodejs.org/)
- **npm or Yarn:** Package manager installed with Node.js.
- **Database:** MongoDB/PostgreSQL installed and running locally or accessible via cloud.
- **Cloudinary Account:** For image upload functionality. [Sign up for Cloudinary](https://cloudinary.com/)

---

## Installation

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
```

Navigate to the project directory:

```bash
cd your-repo-name
```

### 2. Install Dependencies

Install the required npm packages:

```bash
npm install
```

_Alternatively, if you're using Yarn:_

```bash
yarn install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory of the project based on the provided `.env.example`:

```bash
cp .env.example .env
```

Open the `.env` file and configure the necessary environment variables:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/your-database-name
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
```

**Note:**

- Replace `your-database-name` with your actual database name.
- Replace `your_jwt_secret` with a strong secret key for JWT.
- Replace Cloudinary variables with your actual Cloudinary account details.

### 4. Setup the Database

Ensure your database server is running. For MongoDB:

```bash
mongod
```

_For PostgreSQL:_

```bash
sudo service postgresql start
```

Create the necessary databases and collections/tables as required by the project.

### 5. Run Database Migrations (If Applicable)

If your project uses migrations (e.g., with Sequelize for PostgreSQL), run the migration scripts:

```bash
npm run migrate
```

_Or with Yarn:_

```bash
yarn migrate
```

### 6. Seed the Database (Optional)

If you have seed scripts to populate the database with initial data:

```bash
npm run seed
```

_Or with Yarn:_

```bash
yarn seed
```

---

## Running the Server

Start the development server with hot-reloading:

```bash
npm run dev
```

_Or with Yarn:_

```bash
yarn dev
```

The server should now be running at `http://localhost:5000` (or the port you specified).

### Production Build

To build and run the project in production mode:

1. **Build the Project:**

   ```bash
   npm run build
   ```

   _Or with Yarn:_

   ```bash
   yarn build
   ```

2. **Start the Server:**

   ```bash
   npm start
   ```

   _Or with Yarn:_

   ```bash
   yarn start
   ```

---

## Project Structure

The project follows a modular structure inspired by the [Node Express Boilerplate](https://github.com/eddiesosera/node-express-boilerplate-master). Here's an overview of the folder structure:

```
your-repo-name/
├── src/
│   ├── controllers/
│   │   └── articleController.ts
│   ├── models/
│   │   └── Article.ts
│   ├── routes/
│   │   └── articleRoutes.ts
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   └── errorMiddleware.ts
│   ├── utils/
│   │   ├── cloudinaryConfig.ts
│   │   └── cloudinaryUpload.ts
│   ├── config/
│   │   └── db.ts
│   ├── app.ts
│   └── server.ts
├── .env.example
├── package.json
├── tsconfig.json
├── README.md
└── ...other files
```

**Key Directories:**

- **controllers/**: Contains controller files handling the business logic.
- **models/**: Defines data models/schema.
- **routes/**: Defines API routes.
- **middleware/**: Custom middleware for authentication, error handling, etc.
- **utils/**: Utility functions and configurations (e.g., Cloudinary setup).
- **config/**: Configuration files (e.g., database connection).
- **app.ts**: Initializes Express app, applies middleware and routes.
- **server.ts**: Starts the server.

---

## Scripts

The `package.json` includes several scripts to facilitate development and deployment.

```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "lint": "eslint . --ext .ts",
    "migrate": "sequelize db:migrate",
    "seed": "sequelize db:seed:all"
  }
}
```

**Available Scripts:**

- **`npm run dev` / `yarn dev`**: Starts the development server with hot-reloading using Nodemon.
- **`npm run build` / `yarn build`**: Compiles TypeScript files into JavaScript.
- **`npm start` / `yarn start`**: Starts the production server.
- **`npm run lint` / `yarn lint`**: Runs ESLint to analyze code for potential errors and enforce code style.
- **`npm run migrate` / `yarn migrate`**: Runs database migration scripts.
- **`npm run seed` / `yarn seed`**: Seeds the database with initial data.

---

## Contributing

Contributions are welcome! Please follow these steps to contribute to the project:

1. **Fork the Repository**

   Click the "Fork" button at the top right of the repository page to create a forked copy.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

3. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Make Changes and Commit**

   ```bash
   git commit -m "Add some feature"
   ```

5. **Push to Your Fork**

   ```bash
   git push origin feature/YourFeatureName
   ```

6. **Open a Pull Request**

   Navigate to the original repository and click "Compare & pull request" to submit your changes.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- **[Node Express Boilerplate](https://github.com/eddiesosera/node-express-boilerplate-master)** for providing a solid foundation for building scalable Node.js applications.

---

## Contact

For any inquiries or support, please contact [your-email@example.com](mailto:your-email@example.com).

---

**Happy Coding!**

---
