jQuery.fn.imgtotext = function(param) {	
	function wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight)
    {
		var words = text.split(" ");
        var countWords = words.length;
        var line = "";
        for (var n = 0; n < countWords; n++) {
            var testLine = line + words[n] + " ";
            var testWidth = context.measureText(testLine).width;
            if (testWidth > maxWidth) {
				context.fillText(line, marginLeft, marginTop);
                line = words[n] + " ";
                marginTop += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, marginLeft, marginTop);
    }
	var obj = jQuery(this);	
	param['x']=param['x']||'0';
	param['y']=param['y']||'0';
	param['family']=param['family']||'tahoma';
	param['color']=param['color']||'#000';
	param['size']=param['size']||'12';
	param['text_shadow']=param['text_shadow']||'off';
	param['text_shadow_x']=param['text_shadow_x']||'1';
	param['text_shadow_y']=param['text_shadow_y']||'1';
	param['text_shadow_blur']=param['text_shadow_blur']||'0';
	param['text_shadow_color']=param['text_shadow_color']||'#fff';	
	param['text_transform']=param['text_transform']||'normal';		
	var font = param['style']+' '+param['weight']+' '+param['size']+'px '+param['family'];
	jQuery(obj).css({'white-space':'nowrap','font':font,'color':'transparent','text-shadow':param['text_shadow_x']+'px '+param['text_shadow_y']+'px '+param['text_shadow_blur']+'px '+param['text_shadow_color']});
		var obj_html = jQuery(obj).html();
		var obj_text = jQuery(obj).text();
		param['txt'] = obj_html;
		switch(param['text_transform']){
			case'upper':
				obj_text = obj_text.toUpperCase();
				jQuery(obj).css({'text-transform':'uppercase'});
			break;
			case'lower':
				obj_text = obj_text.toLowerCase();
				jQuery(obj).css({'text-transform':'lowercase'});
			break;
		}
		var obj_h = jQuery(obj).height();
		var obj_w = jQuery(obj).width()+5;
		jQuery(obj).width(obj_w);
	var img = new Image();
	img.src = param['img'];
	img.onload = function() {
		var cnv = jQuery('<canvas style="display:none;" width="'+img.width+'" height="'+img.height+'"></canvas>');
		obj.after(cnv);
		var canvas = cnv.get(0);
		if ((!$.browser.msie || ($.browser.msie && parseInt($.browser.version)>9)) && canvas.getContext) {
			var ctx = canvas.getContext('2d');
			ctx.fillStyle=param['color'];
			ctx.fillRect(0,0,img.width,img.height);
			ctx.drawImage(img, -param['x'], -param['y']);	
			ctx.drawImage(img, img.width-param['x'], -param['y']);
			ctx.drawImage(img, -param['x'], img.height-param['y']);
			ctx.drawImage(img, img.width-param['x'], img.height-param['y']);
			var ptrn = ctx.createPattern(canvas,'repeat');

			canvas.width = obj_w;
			canvas.height = obj_h;
			ctx = canvas.getContext('2d');
			ctx.clearRect(0,0,obj_w,obj_h);
			ctx.fillStyle = ptrn;	
			ctx.font = font;			
			ctx.textAlign = "left";
			ctx.textBaseline = "bottom";
			if(param['text_shadow']=='on'){
				ctx.shadowColor = param['text_shadow_color'];
				ctx.shadowOffsetX = param['text_shadow_x'];
				ctx.shadowOffsetY = param['text_shadow_y'];
				ctx.shadowBlur = param['text_shadow_blur'];
			}
			if(obj_html != null){
				if(obj_html.indexOf('br')==-1){
					ctx.fillText(obj_text, 0, obj_h);
				}
				else{
					wrapText(ctx,obj_text,0,parseInt(param['size'])*1.2,obj_w+20,parseInt(param['size']));
				}
			}

			var im = canvas.toDataURL();
			param['im'] = im;
			param['do'] = 'set';
			jQuery(obj).css({'background-position':'left top','background-repeat':'no-repeat','background-image':'url('+im+')','text-shadow':'none'});
			$.ajax({
				type: "POST",
				url: "../text_to_img/text_to_img.php",
				data: param
			});
			jQuery(cnv).remove();
		}
		else{
			param['do'] = 'get';
			$.ajax({
				type: "POST",
				url: "../text_to_img/text_to_img.php",
				data: param,
				success: function(im){
					if(im!='no'){
						jQuery(obj).css({'background-position':'left top','background-repeat':'no-repeat','background-image':'url(/text_to_img/cache/'+im+'.png)','text-shadow':'none','text-indent':'-10000px'});
					}
				}
			});	
		}
	}
}