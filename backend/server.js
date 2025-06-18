const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { sequelize } = require('./models');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/general-inquiries', require('./routes/generalInquiryRoutes'));

// DB Connection and Sync
sequelize.authenticate()
  .then(() => {
    console.log('DB connected.');
    return sequelize.sync({ alter: true }); // This is the fix!
  })
  .then(() => {
    console.log('Models synced.');
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
