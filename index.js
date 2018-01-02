
let top3Req = new XMLHttpRequest();
document.cookie = "test=test";
alert(document.cookie);

top3Req.open("GET", "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=3");
top3Req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        let data = JSON.parse(this.responseText);
        let boxes = [ document.querySelector(".box-big"), document.querySelector(".box-medium"), document.querySelector(".box-small")];
        for ( let i=0; i<data.length; i++) {
            addDataToBox(data[i], boxes[i])
        };
        console.log(data);
    }
};
top3Req.send();

function addDataToBox (obj, box) {
    
    box.innerHTML =
    `<h3 class="box-title">${obj.name}</h3>
    <ul class="box-data">
        <li>Symbol: ${obj.symbol}</li>
        <li>Rank: ${obj.rank}</li>
        <li>Price $: ${Number(obj.price_usd).toFixed(2)}</li>
        <li>Price €: ${Number(obj.price_eur).toFixed(2)}</li>
        <li>Supply: ${obj.total_supply}</li>
    </ul>
    `
}

function searchCurrency () {
    // cookie functions to limit api requests
    function setCountCookie () {
        // prepare everything for the cookie
        let APICount = getAPICount(),
        d = new Date();
        d.setTime(d.getTime() + (5*60*1000)); // set time to 1min in the future
        let expires = "expires=" + d.toGMTString();
        console.log(APICount);

        if (APICount > 0 ) { //Increase count by 1
            document.cookie = `apiRequests=${APICount++}; ${expires}; path=/`;
        } else { // set new cookie, count = 1
            document.cookie = "apiRequests=1;" + expires + ";path=/";
        }
    }
    function getAPICount () {
        let allCookies = document.cookie.split(";"),
        cookieName = "apiRequests";
        for (let i = 0; i<allCookies.length; i++) {
            let cookiePair = allCookies[i];
            if (cookiePair.indexOf(cookieName) >= 0) {
                alert(cookiePair);
                let eqIndex = cookiePair.indexOf("=");
                console.log(cookiePair.slice(eqIndex +1));
                return Number(cookiePair.slice(eqIndex+1)); 
            }
        }
        return 0;
    }

    if (getAPICount >= 2) {
        document.getElementById("searchresult").innerHTML = 
            "<p id='error-message'>Too many requests. You cannot send more than 2 requests per minute.</p>";
    }
    let searchValue = document.getElementById("currencySearch").value.toLowerCase(),
    currencyReq = new XMLHttpRequest();

    currencyReq.open("GET", `https://api.coinmarketcap.com/v1/ticker/${searchValue}/?convert=EUR`);
    currencyReq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText),
            newDiv = document.createElement("div");
            newDiv.className = "grid-box box-medium box-orange";
            document.getElementById("searchresult").appendChild(newDiv);
            addDataToBox(data[0], newDiv);
            setCountCookie();
        } else if (this.readyState === 4) {
            document.getElementById("searchresult").innerHTML = 
            "<p id='error-message'>Something went wrong. Make sure you spelled the name of the currency correctly.</p>";
        }
    }

    currencyReq.send();
    console.log(searchValue);
}
