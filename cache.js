import express from 'express';
import apicache from 'apicache';

const app = express();
const port = 3000;

// Initialize apicache middleware
const cache = apicache.middleware;

// Sample API that simulates slow processing
app.get('/api/slow', cache('10 seconds'), async (req, res) => {
  console.log('⏳ Processing request...');
  
  // Simulate a slow API with a delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  res.json({
    message: '✅ This response is now cached!',
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
