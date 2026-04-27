const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const MONGO_URI = process.env.MONGO_URI;
console.log("DEBUG: Actual MONGO_URI being used ->", MONGO_URI);

if (!MONGO_URI) {
    console.error('❌ Error: MONGO_URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(MONGO_URI, { family: 4 })
    .then(() => {
        console.log('🚀 Successfully connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:');
        console.error(err.message);
        console.log('\n💡 Tip: If you see "querySrv ECONNREFUSED", it is likely a DNS issue with your internet.');
        console.log('   Try changing your computer DNS to 8.8.8.8 or use a different internet connection.');
    });

// Routes
const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

// Base Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`✨ Server is live at: http://localhost:${PORT}`);
});