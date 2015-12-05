
var cookieDomian = "com.darkzero";
var cookieExpires = 10;
//var tempImg = "https://fish123s3-buy123.cdn.hinet.net/images/upload/5b361-DPP_69289.JPG";

//----------
// Account
//----------
var tokenKey = 'isLogin';
var logined = false;

// check login
function checkLoginStates(callback) {
    $.ajax({
        url: '/isLogin',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            logined = response;
            callback(logined);
        },
        error: function () {
            logined = false;
            callback(logined);
        }
    });
}

function isLogin() {
    var ins_token = getInstagramTokenFromCookie();
    if ( ins_token != undefined && ins_token != "" ) {
        return true;
    }
    return logined;
}

// get the token from cookie
function getInstagramTokenFromCookie() {
    var ins_token = readFromCookie(tokenKey);
    return ins_token;
}

// logout
function logoutFromInstagram(callback) {
    jQuery.support.cors = true;
    $.ajax({
        url: '/logout',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log("logout success");
            Cookies.remove(tokenKey);
            logined = false;
            callback(true);
        },
        error: function () {
            console.log("logout failure");
            callback(!logined);
        }
    });
}

// get cookie value by key
function readFromCookie(key) {
    return Cookies.get(key);
}

function setToCookie(key, value) {
    Cookies.set(key, value);
}

// get user info of current token
function getUserInfoFromInstagram(successCallback, failureCallback) {
    var ins_token = readFromCookie(tokenKey);
    jQuery.support.cors = true;
    $.ajax({
        url: '/selfInfo',
        type: 'GET',
        dataType: 'json',            
        success: function (response) {
            //console.log(response);
            successCallback(response['data']);
        },
        error: function () {
            failureCallback();
        }
    });
}

// get the photo list with user id
function getPhotoListFromInstagram(user_id, successCallback, failureCallback) {
    console.log("getPhotoListFromInstagram start");
    jQuery.support.cors = true;
    $.ajax({
        url: '/photoList',
        type: 'GET',
        dataType: 'json',          
        success: function (response) {
            //console.log(response);
            array = response.data;
            //console.log(array);
            successCallback(makePhotoListHtml(array));
        },
        error: function (response) {
            //console.log(response);
            failureCallback();
        }
    });
}

// get photo by id
function GetPhotoById(photoId, standardImg, successCallback, failureCallback) {
    console.log("[DEBUG]GetPhotoById Start : " + photoId);
    if ( photoId == undefined ) {
        failureCallback();
        return;
    }
    jQuery.support.cors = true;
    $.ajax({
        url: '/photo/' + photoId + '/inventory', //'/photo/'+photoId,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            //console.log(response);
            response["imageUrl"] = standardImg;
            response["id"] = photoId;
            successCallback(MakePhotoDetail(response));
        },
        error: function (response) {
        	console.log("error in calling API : /photo/:photoId/inventory");
            failureCallback();
        }
    });
}

// like
function SetLikePhoto(photoId, isLike, successCallback, failureCallback) {
    console.log("set photo [" + photoId + "] " + (isLike?"Like":"Unlike"));
    //TODO: call API here
    jQuery.support.cors = true;
    var requestApi = isLike?'/likes/':'/unlikes/';
    $.ajax({
        url: requestApi + photoId,
        type: 'GET',
        crossDomain: true,
        success: function (response) {
            console.log(response);
            successCallback(isLike);
        },
        error: function (response) {
            console.log(response);
            failureCallback();
        }
    });
}

//----------
// make html string
//----------
// list
function makePhotoListHtml(array) {
    var resultHtml = "";

    jQuery.each(array, function(index, item) {
        if (item["user_has_liked"]) {
            resultHtml += makeInstagramPhotoCell(index, item);
        }
    });
    
    return resultHtml;
}

// cell in list
function makeInstagramPhotoCell(index, photoData) {
    var htmlStr = "";
    
    var likeBtnClass = (photoData["user_has_liked"])?"btnLikeOn":"btnLikeOff";
    
    htmlStr = "<div class='photoCell'><img name='photoBtn' photoId='"
    + photoData["id"]
    + "' standardImg='"
    + photoData["images"]["standard_resolution"]["url"]
    + "' class='photo' src='" 
    + photoData["images"]["standard_resolution"]["url"] 
    + "'/>"
    //+ "<div class='photoName'>"
    //+ "photo_name"//TODO photoData["photo_name"]
    //+ "</div>"
    + "<input value='' photoId='"
    + photoData["id"]
    + "' class='"
    + likeBtnClass
    + "' type='button' name='likeBtn'/>"
    + "<input href='"
    + photoData["link"]
    + "' class='btnGotoIns' type='button' name='gotoInsPageBtn'/></div>"
    
    return htmlStr
}

// detail
function MakePhotoDetail(photoDetail) {
    var htmlStr = "";
    
    var array = photoDetail["buyable"];//photoDetail["items"];
    var firstItem = array[0];
    
    htmlStr += "<img class='insPhoto' src='"
    + photoDetail["imageUrl"]//["standard_resolution"]["url"]
    + "'>";
    
    htmlStr += "<img id='mainPhoto' class='mainPhoto' itemUrl='"
    + firstItem["itemStoreURL"]
    + "' src='"
    + "inventoryImages/"
    + firstItem["itemImageURL"]//photoDetail["imageUrl"]//["standard_resolution"]["url"]
    + "'/><div id='itemsPanel'>";
    
    htmlStr += "<div id='itemDescription'>"
    + firstItem["itemDescription"]
    + "</div>";
    
    htmlStr += "<div id='itemName'>"
    + firstItem["itemName"]
    + "</div>"
    
    //console.log(htmlStr);

    //console.log(photoDetail["buyable"]);
    jQuery.each(array, function(index, item) {
        //console.log(item);
        htmlStr += "<img class='itemImage' name='itemImage' itemUrl='"
        + item["itemStoreURL"]
        + "' itemName='"
        + item["itemName"]
        + "' itemDescription='"
        + item["itemDescription"] 
        + "' src='inventoryImages/"
        + item["itemImageURL"]
        //+ "' alt='"
        //+ item["itemName"]
        + "'>";
    });
    
    //htmlStr += "<input value='' photoId='"
    //+ photoDetail["id"]
    //+ "' class='btnLikeOff' type='button' name='likeBtn'/></div>"
    //+ "</div>"
    
    return htmlStr;
}