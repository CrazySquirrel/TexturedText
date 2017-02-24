
# TexturedText

[![Code Climate](https://codeclimate.com/github/TexturedText/AnimationFrame/badges/gpa.svg)](https://codeclimate.com/github/TexturedText/AnimationFrame)
[![Test Coverage](https://codeclimate.com/github/TexturedText/AnimationFrame/badges/coverage.svg)](https://codeclimate.com/github/TexturedText/AnimationFrame/coverage)
[![Issue Count](https://codeclimate.com/github/TexturedText/AnimationFrame/badges/issue_count.svg)](https://codeclimate.com/github/TexturedText/AnimationFrame)
[![Donate](https://img.shields.io/badge/donate-%E2%99%A5-red.svg)](http://crazysquirrel.ru/support/)


JavaScript plugin for textured text.

## Build

The repository contains pre-compiled files, but if you want to add your files and compile, then run the following commands in the repository folder.

* npm install
* npm run production

or

* npm run development

The build required NodeJs version 6 or higher.

## Usage

```
//If you use TypeScript in your project.
import TexturedText from TexturedText.ts
    
//If you use JavaScript in your project.
let window = global;
request("TexturedText.js");
let TexturedText = window["TexturedText"];
    
//If you just want to use JavaScript as usual.
<script src="js/TexturedText.js"></script>
    
//Then call just TexturedText class with parameters.
new TexturedText(<domTextElement>,<objParams>);
```

### Parameters

```
- domTextElement
    The DOM element with text
        
- objParams
    The parameters are describing the text textures.
    
    - textureSrc
        The path to texture image
        
    - offsetX
        The image texture x offset
        
    - offsetY
        The image texture y offset
```

## Example

```javascript
    new TexturedText(
            document.getElementById("TexturedText"),
            {
                "textureSrc": "./images/det_cont_fon.jpg",
                "offsetX": 150,
                "offsetY": 150
            }
    );
```
