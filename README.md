# Madurai Meenakshi Finance Admin Backend

Node.js + Express + MongoDB backend for the Madurai Meenakshi Finance admin panel.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or cloud connection string)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Update `.env` file with your settings:
   ```
   MONGODB_URI=mongodb://localhost:27017/madurai-meenakshi-finance
   JWT_SECRET=your-secret-key-change-in-production
   PORT=5000
   NODE_ENV=development
   ```

3. **Create Default Admin User**
   
   Run the seed script to create the default admin account:
   ```bash
   node scripts/seedAdmin.js
   ```

   This creates:
   - Email: `dkadmin@gmail.com`
   - Password: `admin@123`

### Running the Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

#### Login
- **POST** `/api/auth/login`
- Body: `{ email: string, password: string }`
- Returns: `{ success: boolean, token: string, admin: {...} }`

#### Register (Admin only - use seedAdmin.js instead)
- **POST** `/api/auth/register`
- Body: `{ email: string, password: string, name: string }`

#### Get Current Admin (Protected)
- **GET** `/api/auth/me`
- Headers: `Authorization: Bearer <token>`

#### Logout
- **GET** `/api/auth/logout`

### Health Check
- **GET** `/api/health`

## Database Models

### Admin Model
```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  role: String (admin/superadmin),
  createdAt: Date
}
```

## Middleware

### Authentication Middleware
- Verifies JWT tokens
- Adds admin info to request object
- Returns 401 if token is invalid or missing

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- CORS enabled for frontend
- Environment variables for secrets
- Token expiration (7 days)

## Frontend Integration

The frontend expects:
- Backend running on `http://localhost:5000`
- Tokens stored in `authToken` cookie
- Admin info in `adminInfo` cookie

## Testing

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "dkadmin@gmail.com",
    "password": "admin@123"
  }'
```

### Test Protected Route
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your-token>"
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

### Port Already in Use
- Change PORT in `.env` file
- Or kill process using port 5000: `lsof -ti:5000 | xargs kill -9`

### Token Issues
- Clear cookies in browser
- Re-login to get new token
- Check JWT_SECRET in `.env`
