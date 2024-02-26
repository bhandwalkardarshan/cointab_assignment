# cointab_assignment
## Description
This is a users listing platform where admin can browse the users and able to add their posts in bulk.

## Installation
### For Backend Server
1. Clone the repository: `git clone https://github.com/bhandwalkardarshan/cointab_assignment`
2. Navigate to the project directory: `cd backend`
3. Install dependencies: `npm install`
4. Create .env file.
5. Add Supabase DB URL in .env file for connection : `SUPABASE_URL = <Supabase Database URL>` 
6. Add SUPABASE_KEY in .env file: `SUPABASE_KEY = <Your Supabase key>`
7. Add port number in .env file: `port = <port number>`
8. Start the backend server: `npm start` 

### For Frontend Server
1. Navigate to the project directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the frontend server: `npm run dev`

### TechStack
- Frontend: ReactJS + Vite
- Backend: Express, Supabase DB(SQL)

## API Endpoints

### Get All Users - `/users`
- **Method**: GET
- **Description**: Retrieve all users  

### Get Single User - `/users/:id`
- **Method**: GET
- **Description**: Retrieve single user

### Get All Posts of Specific User - `/user/posts/:id`
- **Method**: GET
- **Description**: Retrieve all posts of specific  user by id

### Add User to DB - `/users`
- **Method**: POST
- **Description**: Add a user to the users table
- **Request Body**:
    ```json
    {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
    ```
### Add User to DB - `/bulk/posts`
- **Method**: POST
- **Description**: To add  posts in bulk to the posts table

## Usage
Open your browser and visit `http://localhost:<port_number>`

## Deployed Links
    - Backend : `https://sleepy-sari-duck.cyclic.app`
    - Frontend : `https://legendary-malasada-09214f.netlify.app`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.



