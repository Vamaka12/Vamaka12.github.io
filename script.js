jQuery('document').ready(function () {
    jQuery("#WaxLogin").on('click', function () {
        login();
    })

    jQuery("#Donate-Button").on('click', function () {
        sign(jQuery('#Amount').val(), jQuery('#select-token').val());
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
    
    var sending = amount +  ' ' + token;
    console.log("'" + sending + "'")
    try {
        const result = await wax.api.transact({
            actions: [{
              account: 'eosio.token',
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
    if (jQuery('#select-token').val() == "WAX")
    {
        let a = jQuery('#Amount').val().split(".")[1];
        if (a == undefined)
        {
            jQuery('#Amount').val(jQuery('#Amount').val() + ".00000000");
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
        console.log(a.length)
    }
    if (jQuery('#select-token').val() == "MARTIA") // 0.0100 MARTIA
    {
        let a = jQuery('#Amount').val().split(".")[1];
        if (a == undefined)
        {
            jQuery('#Amount').val(jQuery('#Amount').val() + ".0000");
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
        console.log(a.length) 
    } 
}

