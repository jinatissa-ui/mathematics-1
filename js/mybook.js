

function updateDepth(book, newPage) {

	var page = book.turn('page'),
		pages = book.turn('pages'),
		depthWidth = 16*Math.min(1, page*2/pages);

		newPage = newPage || page;

	if (newPage>3)
		$('.sj-book .p2 .depth').css({
			width: depthWidth,
			left: 20 - depthWidth
		});
	else
		$('.sj-book .p2 .depth').css({width: 0});

		depthWidth = 16*Math.min(1, (pages-page)*2/pages);

	if (newPage<pages-3)
		$('.sj-book .p'+(pn-1)+' .depth').css({
			width: depthWidth,
			right: 20 - depthWidth
		});
	else
		$('.sj-book .p'+(pn-1)+' .depth').css({width: 0});

}

function loadPage(page) {

	

}

function addPage(page, book) {

	var id, pages = book.turn('pages');
	
var mypage=page-4;
	if (!book.turn('hasPage', page)) {
if(mypage%2==0){
		var element = $('<div />',
			{'class': 'own-size',
				css: {width: 500, height: 620}
			}).
			html("<div class='loader'      style='position:absolute;top:0px;left:0px' ><iframe style='position:absolute;top:40px;left:40px;width:420px;height:540px;border:0;background:#fff;' src='pages/page"+mypage+".html' scrolling='no' title='Page "+mypage+"'></iframe><div style='position:absolute;width:76px;height:25px;background:#ffffff;top:5px;left:212px;text-align:center;border-radius:15px;cursor:pointer;font-size:14px' class='up' onclick=$('.sj-book').turn('page',4)> Contents </div><p style='position:absolute;top:5px;left:460px'>"+mypage+"</p></div><button type='button' class='zoomb' title='Enlarge page' aria-label='Enlarge page'></button>");
			

		if (book.turn('addPage', element, page)) {
			loadPage(page);
		}
}else{
	var element = $('<div />',
			{'class': 'own-size',
				css: {width: 500, height: 620}
			}).
			html("<div class='loader'  id='div1'    style='position:absolute;top:0px;left:0px' ><iframe style='position:absolute;top:40px;left:40px;width:420px;height:540px;border:0;background:#fff;' src='pages/page"+mypage+".html' scrolling='no' title='Page "+mypage+"'></iframe><div style='position:absolute;width:76px;height:25px;background:#ffffff;top:5px;left:212px;text-align:center;border-radius:15px;cursor:pointer;font-size:14px' class='up' onclick=$('.sj-book').turn('page',4)> Contents </div><p style='position:absolute;top:5px;left:460px'>"+mypage+"</p></div><button type='button' class='zoomb' title='Enlarge page' aria-label='Enlarge page'></button>");
			

		if (book.turn('addPage', element, page)) {
			loadPage(page);
		}

	}
	
}
}
var pqr;
function sav(my){
	var tx;
	pqr=eval('pag'+my.tabIndex);
	tx=pqr.document.getElementById('txt2').value;
	var msg="<!DOCTYPE html><html><head><meta http-equiv='Content-Type' content='text/html;charset=UTF-8'> </head><body onmousemove='mov(event)' onmousedown='dw()' onmouseup='up()' onmouseout='out()'><svg style='border:solid thin;position:absolute;top:125px' width='250px' height='250px' >"+  pqr.document.getElementById('txt1').value  + "</svg><script>"+tx+" </script></body></html>"
	txt.value= msg;
	}




var num=0;
var ret;var abc="";var y;
function zo(me){
	//parent.cobox.value='#ffffff';parent.colbox.bgColor='#ffffff';
	abc="pages/can"+(eval(me.alt))+".html";
	
	var myob = new Object();
   myob.que = abc;

	
	
	  spawn(function*() {
	ret=yield window.showModalDialog(abc,myob, "dialogWidth:580px;dialogHeight:680px;color:gray;top:0px;");
	   //ret.document.body.style.WebkitTransform ='scale(1.5)translate(20%,20%)';
	  //ret.abc.document.body.style.color='red';
 
	
	  });
	 
	 

}
function lod(){
	
	upabc.document.body.style.WebkitTransform ='scale(1.2)translate(10%,10%)';
	if(mypage==70){upabc.document.body.style.WebkitTransform ='scale(1)translate(0%,0%)';}
	}


function numberOfViews(book) {

	return book.turn('pages') / 2 + 1;

}

function getViewNumber(book, page) {

	return parseInt((page || book.turn('page'))/2 + 1, 10);

}

function zoomHandle(e) {

	if ($('.sj-book').data().zoomIn)
		zoomOut();
	else if (e.target && $(e.target).hasClass('zoom-this')) {
		zoomThis($(e.target));
	}

}

function moveBar(yes) {
	if (Modernizr && Modernizr.csstransforms) {
		$('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000});
	}
}

function isChrome() {

	// Chrome's unsolved bug
	// http://code.google.com/p/chromium/issues/detail?id=128488

	return navigator.userAgent.indexOf('Chrome')!=-1;

}