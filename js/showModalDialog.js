(function() {
    window.spawn = window.spawn || function(gen) {
        function continuer(verb, arg) {
            var result;
            try {
                result = generator[verb](arg);
            } catch (err) {
                return Promise.reject(err);
            }
            if (result.done) {
                return result.value;
            } else {
                return Promise.resolve(result.value).then(onFulfilled, onRejected);
            }
        }
        var generator = gen();
        var onFulfilled = continuer.bind(continuer, 'next');
        var onRejected = continuer.bind(continuer, 'throw');
        return onFulfilled();
    };
    window.showModalDialog = window.showModalDialog || function(url, arg, opt) {
        url = url || ''; //URL of a dialog
        arg = arg || null; //arguments to a dialog
        opt = opt || 'border-width:20px'; //options: dialogTop;dialogLeft;dialogWidth;dialogHeight or CSS styles
        var caller = showModalDialog.caller.toString();
        var dialog = document.body.appendChild(document.createElement('dialog'));
        dialog.setAttribute('style', opt.replace(/dialog/gi, ''));
        dialog.innerHTML = '<a href="#" id="dialog-close" style="position: absolute; top: 0; right: 4px; font-size: 25px; color: #F00; text-decoration: none; outline: none;" title="Close">&times;</a><button onclick="clickSaveFileAsInput()" onmousedown="sa()" title="Save" style="position:absolute;top:3px;left:280px;background:white;" >Save</button><iframe id="dialogBody" name="upabc" scrolling="no" src="' + url + '" style="border:0; width: 100%; height: 100%;" onload="lod()"></iframe>';
        document.getElementById('dialogBody').contentWindow.dialogArguments = arg;
        document.getElementById('dialog-close').addEventListener('click', function(e) {
            e.preventDefault();
            dialog.close();
        });
        dialog.showModal();
        //if using yield
        if(caller.indexOf('yield') >= 0) {
            return new Promise(function(resolve, reject) {
                dialog.addEventListener('close', function() {
                    var returnValue = document.getElementById('dialogBody').contentWindow.returnValue;
                    document.body.removeChild(dialog);
                    resolve(returnValue);
                });
            });
        }
		
		
		
        //if using eval
        var isNext = false;
        var nextStmts = caller.split('\n').filter(function(stmt) {
            if(isNext || stmt.indexOf('showModalDialog(') >= 0)
                return isNext = true;
            return false;
        });
        dialog.addEventListener('close', function() {
            var returnValue = document.getElementById('dialogBody').contentWindow.returnValue;
            document.body.removeChild(dialog);
            nextStmts[0] = nextStmts[0].replace(/(window\.)?showModalDialog\(.*\)/g, JSON.stringify(returnValue));
            eval('{\n' + nextStmts.join('\n'));
        });
        throw 'Execution stopped until showModalDialog is closed';
    };
})();


function sa(){
	var t;
	t=upabc.document.getElementById('txt2').value;
	var msg="<!DOCTYPE html><html><head><meta http-equiv='Content-Type' content='text/html;charset=UTF-8'> </head><body onmousemove='mov(event)' onmousedown='dw()' onmouseup='up()' onmouseout='out()'><svg style='border:solid thin;position:absolute;top:125px' width='250px' height='250px'>"+  upabc.document.getElementById('txt1').value  + "</svg><script>"+ t +" </script></body></html>"
	txt.value= msg;
	
	
	}

