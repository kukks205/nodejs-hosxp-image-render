var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',(req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/view/:hn', (req, res, next) => {
  let hn = req.params.hn;
  let db = req.db;
  db.getConnection((err, connection) => {
    let sql = `SELECT * FROM patient_image WHERE hn=?`;
    connection.query(sql, [hn], (err, rows) => {
      let image = rows[0].image;

      var img = new Buffer(image, 'base64');
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      });
      res.end(img);
    });
  });
});

module.exports = router;
