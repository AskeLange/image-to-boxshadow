

// Imports
const fs = require ('fs');
var image = require ('get-image-data/native');
 
/**
 * Generates a css-string which displays an image using box-shadows.
 * @param {string} image_path The path to the image, that is going to be converted.
 * @param {string} element_name The class name of the element which the styling will be applied to - can be left blank for 'element'.
 * @param {string} result_path The path to the file in which the result will be saved - if left blank, it will simply return the string.
 * @returns {string} The function returns a promise, which, when resolved, will provide the string containing the styling.  
 */

exports.imageToBoxShadow = ((image_path, element_name='element', result_path=null) => new Promise ((resolve, reject) => { 
    image (image_path, (err, info) => {
      if (err) { reject (err); return; }

      // Image data
      var data = info.data;
      var width = info.width;
      var height = info.height;

      // Response - sets basic css properties
      var response = `.${element_name} {\n\n\twidth: 1px; height: 1px;\n`;
      response += `\tposition: absolute;\n`;
      response += `\ttop: calc(50% - ${height/2}px);\n\tleft: calc(50% - ${width/2}px);\n`;
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

      } response += `\n}`;

      // Resolves response or writes result to file
      if (result_path) {
        fs.writeFile (result_path, response, err => {
          if (err) { reject (err); }
          else { resolve (response); }
        });
      } else {
       resolve (response);
      }

    });
  })
);
