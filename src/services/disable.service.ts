const csv = require("fast-csv");
const fs = require("fs");

exports.uploadFileToMongo = (filePath: string) => {
  let stream = fs.createReadStream(filePath);
  let csvData: string[] = [];
  let csvStream = csv
    .parse()
    .on("data", function (data: string) {
      csvData.push(data);
    })
    .on("end", function () {
      // Remove Header ROW
      csvData.shift();

      //Save to mongo
      console.log(csvData);

      // delete file after saving to MySQL database
      // -> you can comment the statement to see the uploaded CSV file.
      //   fs.unlinkSync(filePath);
    });

  stream.pipe(csvStream);
};
