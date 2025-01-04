
# Live Demo

Watch a live demo here: YouTube Video (Placeholder)

# Instructions for Running the Project locally

Follow these steps to set up and run Phreddit on your local machine:

### Prerequisites - Ensure the following are installed on your system:
- **MongoDB** (Database)
- **MongoDB Shell** (mongosh) (For database interaction)
- **Node.js** (Runtime environment, which includes npm)

---

### Steps to Run the Application 

#### 1. Set up MongoDB
1. Open a terminal
2. Enter `mongosh`

#### 2. Set up and start the Server
1. Open a terminal
2. Enter `cd server`
3. Enter `npm install`
4. Enter `node initializeDB.js mongodb://127.0.0.1:27017`
5. Enter `node server.js`

#### 3. Set up and start the Client
1. Open a terminal
2. Enter `cd client`
3. Enter `npm install`
4. Enter `npm start`
