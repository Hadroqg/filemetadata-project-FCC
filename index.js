var express = require('express');
var cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const multer = require('multer');

var app = express();

app.use(cors());
app.use("/", bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(process.cwd() + '/public'));

const upload = multer({ dest: 'uploads/' });

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  let name = req.file.originalname;
  let type = req.file.mimetype;
  let size = req.file.size;

  res.json({ name: name, type: type, size: size });
});



const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
