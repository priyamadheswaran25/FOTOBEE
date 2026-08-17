# FotoBee Admin API Documentation

## Authentication

### Admin Login
- **URL**: \`/api/v1/auth/login\`
- **Method**: \`POST\`
- **Body**:
  \`\`\`json
  {
    "email": "admin@fotobee.com",
    "password": "yourpassword"
  }
  \`\`\`
- **Response**: Returns a JWT token.
  \`\`\`json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOiJIUzI1...",
      "admin": { "id": "...", "email": "admin@fotobee.com" }
    }
  }
  \`\`\`

## Admin Routes (Protected)

All admin routes require the JWT token in the \`Authorization\` header:
\`Authorization: Bearer <token>\`

### Image Upload
- **URL**: \`/api/v1/admin/upload\`
- **Method**: \`POST\`
- **Body**: \`multipart/form-data\` (Field name: \`image\`)
- **Response**: Returns the URL of the uploaded image.
  \`\`\`json
  {
    "success": true,
    "data": {
      "url": "/uploads/1628172812.jpg"
    }
  }
  \`\`\`

### Categories
- **GET** \`/api/v1/admin/categories\` - List all categories
- **GET** \`/api/v1/admin/categories/:id\` - Get category by ID
- **POST** \`/api/v1/admin/categories\` - Create new category
- **PUT** \`/api/v1/admin/categories/:id\` - Update category
- **DELETE** \`/api/v1/admin/categories/:id\` - Delete category

### Services
- **GET** \`/api/v1/admin/services\` - List all services
- **GET** \`/api/v1/admin/services/:id\` - Get service by ID
- **POST** \`/api/v1/admin/services\` - Create new service
- **PUT** \`/api/v1/admin/services/:id\` - Update service
- **DELETE** \`/api/v1/admin/services/:id\` - Delete service

### Packages
- **GET** \`/api/v1/admin/packages\` - List all packages
- **GET** \`/api/v1/admin/packages/:id\` - Get package by ID
- **POST** \`/api/v1/admin/packages\` - Create new package (nested features supported)
- **PUT** \`/api/v1/admin/packages/:id\` - Update package
- **DELETE** \`/api/v1/admin/packages/:id\` - Delete package

### Stories
- **GET** \`/api/v1/admin/stories\` - List all stories
- **GET** \`/api/v1/admin/stories/:id\` - Get story by ID
- **POST** \`/api/v1/admin/stories\` - Create new story
- **PUT** \`/api/v1/admin/stories/:id\` - Update story
- **DELETE** \`/api/v1/admin/stories/:id\` - Delete story

### Testimonials
- **GET** \`/api/v1/admin/testimonials\` - List all testimonials
- **GET** \`/api/v1/admin/testimonials/:id\` - Get testimonial by ID
- **POST** \`/api/v1/admin/testimonials\` - Create new testimonial
- **PUT** \`/api/v1/admin/testimonials/:id\` - Update testimonial
- **DELETE** \`/api/v1/admin/testimonials/:id\` - Delete testimonial

### Inquiries
- **GET** \`/api/v1/admin/inquiries\` - List all inquiries
- **GET** \`/api/v1/admin/inquiries/:id\` - Get inquiry by ID
- **PUT** \`/api/v1/admin/inquiries/:id\` - Update inquiry status (New, Contacted, Closed)

### Site Config
- **GET** \`/api/v1/admin/config\` - Get global site configuration
- **PUT** \`/api/v1/admin/config\` - Update global site configuration
