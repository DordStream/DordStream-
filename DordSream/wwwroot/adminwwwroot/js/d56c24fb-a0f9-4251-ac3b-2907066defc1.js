

let paymentGateway = function (getway) {

    let paymentConnection = new signalR.HubConnectionBuilder().withUrl("/paymentgateway").configureLogging(signalR.LogLevel.Information).withAutomaticReconnect().build();

    paymentGateway.prototype.pay = function (email, amount, firstName, lastName, callback = null, reference = null, func) {

        startConnection(paymentConnection, () => {

            paymentConnection.invoke("Pay", getway, email, amount, firstName, lastName, callback, reference).then(func).catch((error) => { alert(error) });

        });


    };
    paymentGateway.prototype.verifyTransaction = function (reference, callback) {

        startConnection(paymentConnection, () => {

            paymentConnection.invoke("VerifyTransaction", getway, reference).then(callback).catch((error) => { alert(error) });
        });
    };
    paymentGateway.prototype.listTransaction = function (callback) {
        startConnection(paymentConnection, () => {
            paymentConnection.invoke("ListTransaction", getway).then(callback).catch((error) => { alert(error)});
        })
    }




}
function startConnection(connection,callbck) {
    if (connection.state != "Connected") {

        connection.start().then(callbck);

    }
    else {
        callbck();
    }


}