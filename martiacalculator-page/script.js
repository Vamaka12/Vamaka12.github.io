jQuery('document').ready(function () {


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        releasepower = JSON.parse(this.responseText).power
        console.log(releasepower);

    }
    });

    xhr.open("GET", "https://api.mars.cards/api/strength/martia-release-power");
    xhr.setRequestHeader("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzeW1ib2wiOiJmNDcwNjIxNi05OGYwLTQzZGUtOTI3MC1jN2RkYzIzYzk2YjAiLCJ1c2VybmFtZSI6InZhbWFrYTEyIiwiaWF0IjoxNjU2NTY1OTcyLCJleHAiOjE2NTY1ODM5NzJ9.4LGtulrmBJ2KYZPbetFv-YXFiRmMPJjWt5edjjcmurw");

    xhr.send();

    jQuery('#donate-menu-button').on('click', function (){
        document.location.href = '../index.html';
    })
})

var releasepower = 0;

function calculate(){
    var a = jQuery('#strength').val();
    var calc = (85 * releasepower) / 100;
    // var calc = (85 * v) / 100;

    console.log(calc);
    calc = calc * a;
    try {
        c = calc.toString().split(".")[1].slice(0, 4);
        calc = calc.toString().split(".")[0] + "." + c;
        jQuery("#label").text("You will earn more than " + calc + " martia per hour");
    }
    catch(e){

    }

    
}