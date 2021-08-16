# Image to box shadows.

Turns images (jpeg, png, whatever..) into pure css using box-shadows - because... Why not?.<br />
The result can either be returned as a string, or saved directly to a file.

[GitHub](https://github.com/AskeLange/image-to-boxshadow "GitHub page")<br />
[NPM](https://www.npmjs.com/package/image-to-boxshadow "Node Package Manager page")

### Installing

To install, simply run the command below.

`npm install image-to-boxshadow`

### Using

This package contains one function: imageToBoxShadow.<br />
So start by importing this.

`const { imageToBoxShadow } = require ('image-to-boxshadow');`

The function takes three parameters: image_path, element_name and result_path.

**image_path** - The path to the image, that is going to be converted.<br />
**element_name** - The class name of the element which the styling will be applied to - can be left blank for 'element'.<br />
**result_path** - The path to the file in which the result will be saved - if left blank, it will simply return the string.

Using this you can simply call the function like this:

`imageToBoxShadow ('./monalisa.jpeg', 'element', './monalisa.css')`

This will take the image, on the path "*./monalisa.jpeg*", and save it the file "*./monalisa.css*",
with the css selector pointing to "*.element*".
