jQuery('document').ready(function () {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
        var releasepower = this.response.text;
    }
    });

    xhr.open("GET", "https://api.mars.cards/api/strength/martia-release-power");
    xhr.setRequestHeader("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzeW1ib2wiOiJmNDcwNjIxNi05OGYwLTQzZGUtOTI3MC1jN2RkYzIzYzk2YjAiLCJ1c2VybmFtZSI6InZhbWFrYTEyIiwiaWF0IjoxNjU2NTY1OTcyLCJleHAiOjE2NTY1ODM5NzJ9.4LGtulrmBJ2KYZPbetFv-YXFiRmMPJjWt5edjjcmurw");

    xhr.send();

    jQuery('#donate-menu-button').on('click', function (){
        document.location.href = '../index.html';
    })
})



function calculate(){
    var a = jQuery('#strength').val();
    var calc = a * releasepower;
    c = calc.toString().split(".")[1].slice(0, 4);
    calc = calc.toString().split(".")[0] + "." + c;
    jQuery("#label").text("You will earn about " + calc + " martia per hour");
}