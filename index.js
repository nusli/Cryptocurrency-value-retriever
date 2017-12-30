const coinbinUrl = "https://coinbin.org/";
// API request objects
let top3Req = new XMLHttpRequest();

top3Req.open("GET", "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=3");
top3Req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
    }
};
top3Req.send();
