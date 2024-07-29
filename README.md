# PDF Generation Tool

## Overview

This project was developed with the initiative to treat it as if it were a new feature for the Mesplaques website. PDF Generator allows users to upload an image and text to generate a personalized PDF. A key requirement was to ensure that the image in the PDF was always displayed as a square. This meant implementing logic to handle different image aspect ratios effectively. If an image wasn’t square but had a width higher than height, users would be given options to adjust the image, ensuring that the final PDF met the required format.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Features and Implementation](#features-and-implementation)
- [Testing](#testing)
- [Libraries and Dependencies](#libraries-and-dependencies)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Challenges and Solutions](#challenges-and-solutions)
- [Documentation Prompt](#documentation-prompt)
- [Future Improvements](#future-improvements)

## Project Structure

The project is organized into the following folders:

root/
├── client/ - Contains the React frontend application.
├── server/ - Contains the Node.js backend server.
└── php/ - Contains PHP scripts and folders for PDF generation.
    ├── php-service.php - Contains PHP server files.
    └── fpdf/ - Contains fpdf class content to generate PDFs.


## Installation

### Backend (Node.js)

1. Navigate to the server directory:
    ```bash
    cd server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```

4. For development:
    ```bash
    npm run dev
    ```

5. Run tests:
    ```bash
    npm test
    ```

6. Environment Variables: Create a `.env` file and include the following:
    ```ini
    PORT=5252
    NODE_ENV=development
    ```

### Server PHP

1. Verify PHP Installation:
    ```bash
    php -v
    ```

2. Navigate to the PHP folder:
    ```bash
    cd server/php
    ```

3. Start the server:
    ```bash
    php -S localhost:8000 -t .
    ```

### Frontend (React)

1. Navigate to the client directory:
    ```bash
    cd client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Build for production:
    ```bash
    npm run build
    ```

5. Run tests:
    ```bash
    npm test
    ```

## Configuration

### PHP Configuration

To handle larger file uploads, adjust the PHP configuration settings by editing the `php.ini` file to increase the maximum file upload size and post size. Locate `php.ini` (common locations include `/etc/php/7.x/apache2/php.ini` or `/usr/local/etc/php/php.ini`) and update the following settings:

**Only if you want to test the project with big size images**

```ini
upload_max_filesize = 5M
post_max_size = 5M

Restart the PHP server to apply changes:
sudo service apache2 restart





## Features and Implementation

- **Aspect Ratio Logic:** If an uploaded image is not square, users can choose between two options to fit the image into the PDF. The logic for aspect ratio management ensures that the final PDF meets the required dimensions.

- **Image Conversion:** The tool captures a snapshot of the HTML content and converts it to a PNG format before generating the PDF. This approach ensures higher quality and sharper images in the final PDF document. The conversion process, handled by the frontend, may impact performance due to the additional step involved, but it significantly enhances the visual output of the generated PDF.

- **Multi-language Support:** The tool supports both English and French, making it accessible to a broader audience.

- **SEO Optimization:** Using React Helmet, I ensured that each page has meta descriptions and titles, which helps improve search engine visibility.

- **User Interface:** I incorporated modal portals for image previews and designed the UI to be responsive across different devices.

- **Accessibility:** I took steps to make the application accessible by using ARIA attributes and adhering to good HTML practices. This is crucial for ensuring that the tool is usable by everyone, including those with disabilities.

- **Design Consistency:** I followed the design guidelines of Mesplaques to ensure the new feature seamlessly blended with the existing website.





## Testing

### Backend Testing

- **Libraries Used:**
  - `axios-mock-adapter`
  - `chai`
  - `chai-http`
  - `mocha`
  - `sinon`
  - `sinon-chai`

- **Testing Approach:** Mocking HTTP requests and responses to test backend functionality thoroughly.

- **Applied to:** Comprehensive testing was conducted for the primary controller and associated PHP functions to validate their reliability and performance.

### Frontend Testing

- **Libraries Used:**
  - `@testing-library/jest-dom`
  - `@testing-library/user-event`

- **Testing Approach:** Focused on testing React components, hooks, and user interactions.

- **Applied to:** Testing was systematically applied to all React hooks and actions to ensure their proper functionality and integration within the application.

### Common Issues

- Testing both the frontend and backend presented some challenges. I encountered issues related to how components interacted and how the backend handled requests. I resolved these by consulting community forums and using AI assistance for troubleshooting.





## Libraries and Dependencies

### Backend (server/package.json)

- **Dependencies:**
  - `axios`
  - `cors`
  - `dotenv`
  - `express`
  - `express-async-handler`
  - `form-data`
  - `multer`

- **DevDependencies:**
  - `axios-mock-adapter`
  - `chai`
  - `chai-http`
  - `esm`
  - `mocha`
  - `nodemon`
  - `sinon`
  - `sinon-chai`

### Frontend (client/package.json)

- **Dependencies:**
  - `@testing-library/jest-dom`
  - `@testing-library/user-event`
  - `axios`
  - `html-to-image`
  - `html2canvas`
  - `http-proxy-middleware`
  - `react`
  - `react-dom`
  - `react-helmet-async`
  - `react-icons`
  - `react-router-dom`
  - `react-scripts`
  - `react-toastify`
  - `web-vitals`

- **DevDependencies:**
  - `@testing-library/react`
  - `jest`





## Error Handling

### Frontend

- **Error Handling & Notifications:**
  - Errors are managed with `try-catch` blocks.
  - Errors and notifications are displayed using [react-toastify](https://github.com/fkhadra/react-toastify), which provides:
    - Notifications for process completions
    - User feedback for error handling

### Backend

- **Error Handling Middleware:**
  - Custom middleware is implemented to:
    - Capture and log errors
    - Ensure proper HTTP status codes
    - Send user-friendly error responses





## Best Practices

- **Custom Hooks:** 
  - Developed several custom hooks to manage component logic and state more efficiently.
  - This approach helped keep the React codebase clean and maintainable.

- **Context API:** 
  - Utilized React Context to handle global state.
  - Enabled smoother data flow across components.

- **Reusable Components:** 
  - Created reusable components such as buttons and selectors.
  - This practice helped maintain consistency and reduce code duplication.

- **Backend Structure:** 
  - Implemented a modular backend architecture with separate files for:
    - **Routes:** Defined API endpoints and linked them to controller functions.
    - **Controllers:** Handled business logic and interacted with external services or databases.





## Challenges and Solutions

- **Aspect Ratio Management:**
  - **Challenge:** Handling images with various aspect ratios.
  - **Solution:** Developed a system that allows users to select between different cropping options if the uploaded image wasnt square. This involved calculating dimensions and ensuring the image fit well within the PDF layout.

- **PDF Quality:**
  - **Challenge:** Achieving high-quality output while maintaining performance.
  - **Solution:** Opted to convert images to PNG format to ensure better quality. Balancing this approach with processing time was crucial, and involved optimizing the conversion process to minimize performance impacts.

- **Testing Difficulties:**
  - **Challenge:** Issues with how components interacted and how the backend handled requests during testing.
  - **Solution:** Addressed these difficulties by consulting community forums and using AI assistance for troubleshooting. Implemented thorough testing strategies for both frontend and backend to validate functionality and performance.





## Documentation Prompt

In accordance with the project requirements specifying the use of React and Node.js, and given that TypeScript was not utilized, I have incorporated comprehensive inline documentation throughout the codebase.

For documenting the code, the following prompt was used to ensure clarity and completeness:

### Prompt

Please document the following code snippet with detailed and clear comments. Ensure that the comments are understandable for other developers who may read or maintain this code in the future. Here are the specific instructions for documenting the code:

- **Function Descriptions:** Provide a brief but comprehensive description of what each function does. Explain its purpose, any parameters it takes, and what it returns.
- **Variable Types and Descriptions:** For each variable, include the type (e.g., `int`, `string`, `List`, etc.) and a description of its role within the code. If a variable’s name is not immediately clear, provide additional context to explain its purpose.
- **Code Logic:** Add comments explaining the logic of complex or non-obvious sections of the code. Break down how the code works step-by-step and highlight key operations or algorithms.
- **Edge Cases and Assumptions:** Note any edge cases the code handles or assumptions it makes. This will help others understand the context and constraints under which the code operates.
- **Example Usage:** If applicable, include a brief example of how the function or code snippet can be used. This helps in understanding its practical application.
- **Consistency:** Ensure that the style and tone of comments are consistent throughout the code. Use clear, concise language and avoid jargon or overly technical terms where possible.
- **Error Handling:** Describe how errors or exceptions are managed, and note any potential issues that may arise.

### Application

- Applied this prompt to document each code snippet meticulously.
- Re-tested code to ensure functionality remained intact post-documentation.
- Verified the accuracy and clarity of comments.





## Future Improvements

- **Mobile Experience:** The mobile version of the tool could definitely use some enhancement. I’d like to refine it further to ensure a smoother experience on smaller screens.

- **Performance Optimization:** Improving the image processing pipeline to speed up PDF generation without sacrificing quality is a key area for future development.

- **Image Editor:** An image editing feature for adjusting colors, text, and sizes was in progress but remains incomplete. Future updates will focus on finalizing this functionality to provide users with more customization options.
