jQuery('document').ready(function () {
    jQuery("#WaxLogin").on('click', function () {
        login();
    })

    jQuery("#Donate-Button").on('click', function () {
        sign(jQuery('#Amount').val(), jQuery('.buttonSelected').val());
    })
})
        



const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.greymass.com'
});

//checks if autologin is available and calls the normal login function if it is 
async function autoLogin() { 
    var isAutoLoginAvailable = await wax.isAutoLoginAvailable(); 
    if (isAutoLoginAvailable) { 
        login(); 
    } 
} 

//normal login. Triggers a popup for non-whitelisted dapps
async function login() { 
    try { 
        const userAccount = await wax.login();
        jQuery('#WaxLogin').hide();
        jQuery('.donating-buttons').show();

    } catch(e) { 
        jQuery('.donating-buttons').hide();
    } 
}

async function sign(amount, token) {

    var a = amount.split(".")[1]
    var h = ""

    if (token == "WAX")
    {
        h = "eosio.token"
    }
    if (token == "MARTIA")
    {
        h = "martia"
    }
    var sending = amount +  ' ' + token;
    try {
        const result = await wax.api.transact({
            actions: [{
              account: h,
              name: 'transfer',
              authorization: [{
                actor: wax.userAccount,
                permission: 'active',
              }],
              data: {
                from: wax.userAccount,
                to: 'px5yk.wam',
                quantity: sending,
                memo: 'Waxjs test',
              },
            }]
          }, {
            blocksBehind: 3,
            expireSeconds: 1200,
          });
    } catch(e) {
        console.log(e.message);
    }
}

function amount_check()
{
    

    if (jQuery('.buttonSelected').val() == "WAX")
    {
        let a = jQuery('#Amount').val().split(".")[1];
        if (a == undefined)
        {
            jQuery('#Amount').val(jQuery('#Amount').val() + ".00000000");
        }
        if (jQuery('#Amount').val().split(".")[0] == "")
        {
            jQuery('#Amount').val("1." + jQuery('#Amount').val().split(".")[1])
        }
        else {
            if (a.length < 8)
            {
                var b = a
                for (i = 0;i != 8 - a.length; i++)
                {
                    b = b + "0"
                }
                jQuery('#Amount').val(jQuery('#Amount').val().split(".")[0] + "." + b)
            }
            if (a.length > 8)
            {
                b = a.slice(0, 8 - a.length)
    
                jQuery('#Amount').val(jQuery('#Amount').val().split(".")[0] + "." + b)
            }
        }
    }
    if (jQuery('.buttonSelected').val() == "MARTIA")
    {
        let a = jQuery('#Amount').val().split(".")[1];
        if (a == undefined)
        {
            jQuery('#Amount').val(jQuery('#Amount').val() + ".0000");
        }
        if (jQuery('#Amount').val().split(".")[0] == "")
        {
            jQuery('#Amount').val("1." + jQuery('#Amount').val().split(".")[1])
        }
        else {
            if (a.length < 4)
            {
                var b = a
                for (i = 0;i != 4 - a.length; i++)
                {
                    b = b + "0"
                }
                jQuery('#Amount').val(jQuery('#Amount').val().split(".")[0] + "." + b)
            }
            if (a.length > 4)
            {
                b = a.slice(0, 4 - a.length)
    
                jQuery('#Amount').val(jQuery('#Amount').val().split(".")[0] + "." + b)
            }
        }
    } 
}

function changeClass(id)
{
    if (id == "wax-button")
    {
        $('#martia-button').removeClass('buttonSelected');
        $('#wax-button').addClass('buttonSelected');
    }
    else
    {
        $('#wax-button').removeClass('buttonSelected');
        $('#martia-button').addClass('buttonSelected');
    }
}