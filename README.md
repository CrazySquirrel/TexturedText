# jQuery Textured Text
This plugin allows you to create texts with textures like on the website http://www.wisecom.ru/
The plugin hides the text and substitutes instead the texture. Texture is prepared automatically on the basis of the text, background and font settings. Also the generated picture is stored on the server for older browsers could emulate the behavior.
### Example of usage
```javascript
$('.phone_top').imgtotext(
	{
		'x':'285',
		'y':'132',
		'img':'text_to_img/det_cont_fon.jpg',
		'family':'benderblack_italic',
		'size':'40',
		'style':'normal',
		'weight':'normal',
		'text_shadow':'on',
		'text_transform':'upper'
	}
);
```		