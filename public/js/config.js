//https://instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=token
//http://your-redirect-uri#access_token=ACCESS-TOKEN

String.format = function() {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];
    
    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    
    return theString;
}

var tempImg = "https://fish123s3-buy123.cdn.hinet.net/images/upload/5b361-DPP_69289.JPG";

var instagramEndPoint = {
    GetSelfInfo     : 'https://api.instagram.com/v1/users/self/?access_token={0}',
    GetPhotoList    : 'https://api.instagram.com/v1/users/{0}/media/recent/?access_token={1}',
    LikePhoto       : 'https://api.instagram.com/v1/media/{0}/likes?access_token={1}', // POST
    UnlikePhoto     : 'https://api.instagram.com/v1/media/{0}/likes?access_token={1}', // DEL
    PhotoById       : 'https://api.instagram.com/v1/media/{0}?access_token={1}'
}

var instagramConfig = {
    client_id       : '7e269f2a24df4378b1584412fc3f543f',
    client_secret   : '629420512d2f4dd99798522ff9966747',
    website_url     : 'http://topeko.net/',
    redirect_uri    : 'http://topeko.net/dora/index.html',
}

function instagramAuthUrl() {
    var urlStr = 'https://instagram.com/oauth/authorize/?client_id='
    + instagramConfig.client_id
    + '&redirect_uri='
    + instagramConfig.redirect_uri
    +'&response_type=token'
    return urlStr;
}