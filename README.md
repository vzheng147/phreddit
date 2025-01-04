
# Live Demo:

Watch a live demo here: [YouTube Video](https://www.youtube.com/watch?v=wyv9WTmgrJA&t=7s)

# Set up and run Phreddit on your local machine:

### Prerequisites - Ensure the following are installed on your system:
- **MongoDB** (Database)
- **MongoDB Shell** (mongosh) (For database interaction)
- **Node.js** (Runtime environment)

---

### Steps to Run the Application 

#### 1. Set up MongoDB
1. Open a terminal
2. Enter `mongosh`

#### 2. Set up and start the Server
1. Open a terminal
2. Enter `cd server`
3. Enter `npm install`
4. Enter `node initializeDB.js mongodb://127.0.0.1:27017/phreddit`
5. Enter `node server.js`

#### 3. Set up and start the Client
1. Open a terminal
2. Enter `cd client`
3. Enter `npm install`
4. Enter `npm start`
