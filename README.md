# TexturedText
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
## Help us
[![Help us](http://crazysquirrel.ru/bitrix/templates/crazysquirrel/images/yandex.money.png)](https://money.yandex.ru/quickpay/shop-widget?account=41001951616035&quickpay=shop&payment-type-choice=on&mobile-payment-type-choice=on&writer=seller&targets=%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0+%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%B0+CrazySquirrel&default-sum=50&button-text=03&successURL=http%3A%2F%2Fcrazysquirrel.ru%2Fsupport%2F%3Faction%3Dsuccess "Help us")
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
## Sponsors
[![BrowserStack](http://crazysquirrel.ru/bitrix/templates/crazysquirrel/images/browserstack.png)](https://www.browserstack.com/)