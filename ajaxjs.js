var msg;  //since we cant pas the secret parameter in a function we use a global msg (all thw xml tha we taged)
//var response;
var div_el;  //the picture we chose
var ph_id;   // the big picture
var i=1;    // var for next and previous page
var txtarea; //the input  criteria for the search
var key;     //the key from flikr

function createXHR()    // create the  XMLHttpRequest compatible with many browsers
{

    try {
        return new XMLHttpRequest();
    } catch(e) {}
    try {
        return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    } catch (e) {}
    try {
        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    } catch (e) {}
    try {
        return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {}
    try {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
    return null;
}

function setfocus(){

    document.getElementById("area").focus();
}

var timerId =0;
function tothree (txt){

clearTimeout(timerId);
timerId = setTimeout(function(){three(txt)}, 1000);
}

function slowAlert() {
  alert("That was really slow!");
  window.clearTimeout(timerId);
}

function three(txt){

    if(txt.length >=2){
        var xhr = createXHR();
        if (xhr)
        {
            xhr.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ff3335d86b0b20f3caeda7567300ae66&text="+txt+"&page="+i, true); // open connection
            xhr.onreadystatechange = function(){
                handleResponse(xhr);
            }
            xhr.send(null);
        }
    }
}


function sendRequest()
{
    i=1;            //give a value of 1 to the page
    usual();
}

function usual(){   // get the txt from the field and connects with the proxy
    var xhr = createXHR();
    if (xhr)
    {
        txtarea= document.getElementById("area").value;
        xhr.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ff3335d86b0b20f3caeda7567300ae66&text="+txtarea+"&page="+i, true); // open connection
		//xhr.open("GET", "proxy.php?symbol="+txtarea+"&page="+i, true); // open connection
        xhr.onreadystatechange = function(){
            handleResponse(xhr);
        }
        xhr.send(null);
    }
    else{
        alert("no can do xhr");
    }
}
//go to next page
function next(){
    i++;
    usual();
}

//return to previous page
function previous(){

	if(i>1){
		i--;
		usual();
	}
}

//delete any of the nodes of an element
function deleter(ele){

    if(ele.childNodes.length > 0){		//remove previous photos 							//remove previous hpotos
        for (var i=ele.childNodes.length-1; i>=0; i--)
        {
            ele.removeChild(ele.childNodes[i]);
        }
    }
}

//show the selected picture
function show(i){

    var farm = msg[i].getAttribute("farm");
    var server = msg[i].getAttribute("server");
    var id = msg[i].getAttribute("id");
    var sec = msg[i].getAttribute("secret");

    ph_id = document.getElementById("photo_id");
    var pic = document.createElement('img');
    var url = 'http://farm'+farm+'.static.flickr.com/'+server+'/'+id+'_'+sec+'_z.jpg';
    pic.src = url;
    deleter(ph_id);
    ph_id.appendChild(pic);

}

// if all OK
function handleResponse(xhr){
    if (xhr.readyState==4 ){
        if(xhr.status==200){

            var  response = xhr.responseXML;
            msg = response.getElementsByTagName("photo");
            div_el = document.getElementById("diva");

            if (ph_id!=null){       // delete previous nodes
                deleter(ph_id);
            }                       // of big and small pictures
            deleter(div_el);

            for (var i=0; i<msg.length; i++)
            {
                var farm_id = msg[i].getAttribute("farm");
                var p_server = msg[i].getAttribute("server");
                var p_id = msg[i].getAttribute("id");
                var p_secret = msg[i].getAttribute("secret");

                var image = document.createElement('input'); // create an image element( input to change the mouse over form)
                image.type="image";//set image source
                var src='http://farm'+farm_id+'.static.flickr.com/'+p_server+'/'+p_id+'_'+p_secret+'_s.jpg';
                image.src = src;
                image.alt=" .  ";
                image.setAttribute("onclick", "show("+i+")");
                //image.setAttribute("onmouseover", "ShowImage("+i+")");
                //image.setAttribute("onmouseout", "HideImage("+i+")");
              
                div_el.appendChild(image);  //
            }
        }
        else{
    //alert("next time status not 200");
    }
    }
    else{
//alert("next time state not 4");
}
}
