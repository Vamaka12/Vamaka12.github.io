jQuery('document').ready(function () {
    jQuery("#WaxLogin").on('click', function () {
        login();
    })

    jQuery("#Donate-Button").on('click', function () {
        sign(jQuery('#Amount').val());
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
        jQuery('#donating-buttons').show();

    } catch(e) { 
        jQuery('#donating-buttons').hide();
    } 
}

async function sign(amount) {
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
                to: 'zq2wc.wam',
                quantity: amount +  ' WAX',
                memo: 'Test',
              },
            }]
          }, {
            blocksBehind: 3,
            expireSeconds: 1200,
          });
    } catch(e) {
    }
}