require('dotenv').config();
const db_conn = require('./db/db_conn.js');
const app = require('./app.js');
db_conn().then(() => {
    app.listen(process.env.PORT || 3210, () => {
    console.log(`Server is Listening on port ${process.env.PORT}`);
  });
}).catch((err) => {
    console.log(err);
    process.exit(1);
});