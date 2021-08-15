

// Imports
const fs = require ('fs');
var image = require ('get-image-data/native');
 
// Image to box shadow function
function imgToBoxShadow (image_path, result_path) {
  image (image_path, function (err, info) {
    if (err) { console.log (err); return; }

    // Image data
    var data = info.data;
    var width = info.width;
    var height = info.height;

    // Response - sets basic css properties
    var response = `.element {\n\n\twidth: 1px; height: 1px;\n`;
    response += `\tposition: absolute;\n`;
    response += `\ttop: calc(50% - ${height/2}px);\n`;
    response += `\tleft: calc(50% - ${width/2}px);\n`;
    response += `\tbackground-color: rgba(${data[0]},${data[1]},${data[2]},${data[3]});\n\n`;
    response += `\tbox-shadow:\n`;

    // Loops through data
    for (var n = 4; n < data.length; n+=4) {

      // Gets the x and y position of the pixel
      let y = Math.floor ((n/4) / width);
      let x = (n/4) - y*width;

      // Appends to response
      response += `\t\t${x}px ${y}px 0 rgba(`;
      response += `${data[n+0]},`
      response += `${data[n+1]},`
      response += `${data[n+2]},`
      response += `${data[n+3]})`;

      // Checks if theres any more pixels to loop over
      if (n+4 == data.length) response += `;\n`;
      else response += `,\n`; 

    }

    // Writes result to file
    response += `\n}`;
    fs.writeFile (result_path, response, err => {
      if (err) { console.error (err); return; }
    });

  })
};

// Entry point
// Replace './images/monalisa.jpeg' with the file you want to convert to a box-shadow.
// Replace './results/monalisa.txt' with where you want the result to be placed.
imgToBoxShadow ('./images/monalisa.jpeg', './results/monalisa.txt');