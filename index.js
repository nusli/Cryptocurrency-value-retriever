const coinbinUrl = "https://coinbin.org/";
// API request objects
let btcReq = new XMLHttpRequest() /*,
ethReq = new XMLHttpRequest(),
xrpReq = new XMLHttpRequest()*/;

btcReq.open("GET", coinbinUrl + "btc");
btcReq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
    }
};
btcReq.send();
