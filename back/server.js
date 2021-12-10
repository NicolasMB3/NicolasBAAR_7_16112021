// Required module import
// Express = Building REST API
const express = require('express');
// Provide Express middleware to enable CORS (Cross-origin resource sharing)
const cors = require('cors');

const app = express();

var corsOption = {
   origin: "http://localhost:8081"
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
const Role = db.role;

db.sequelize.sync({ force: true })
   .then(() => {
      console.log('Drop and Resync DB');
      initial();
   });

// Route
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
});

// Helps us to create 3 row in database
function initial() {
   Role.create({
      id: 1,
      name: 'user'
   });

   Role.create({
      id: 2,
      name: 'moderator'
   })

   Role.create({
      id: 3,
      name: 'admin'
   });
}