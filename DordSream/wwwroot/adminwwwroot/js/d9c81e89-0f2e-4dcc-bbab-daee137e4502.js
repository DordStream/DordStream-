
let hubConnection = new signalR.HubConnectionBuilder().withUrl("/database").configureLogging(signalR.LogLevel.Information).withAutomaticReconnect().build();



let DbConnection = function () {
    DbConnection.prototype.open = function (func) {
        if (hubConnection.state != "Connected") { hubConnection.start().then(func) }
        else {
            func();

        }
    }
    DbConnection.prototype.close = function () { hubConnection.stop()}

    DbConnection.prototype.state = hubConnection.state;

    DbConnection.prototype.context = new DbContext();


};


let DbContext = function () {

    DbContext.prototype.executeQuery = function () {
        
        let values = [];
        let query = arguments[0];
        let secondArgument = arguments[1];
        if (Array.isArray(secondArgument)) {

            values = secondArgument.slice(0);
           
        }
        else {
            for (let i = 1; i < arguments.length - 1; i++) {
                values.push(arguments[i]);
            };
        }
        let _callback = arguments[arguments.length - 1];

        hubConnection.invoke("ExecuteQuery", query, values).then(function (result) {

            _callback(result.done, result.error);

        }).catch((error) => alert(error));

    };
    DbContext.prototype.executeQueryReader = function () {
        let values = [];
        let query = arguments[0];
        let _callback = arguments[1];
        
        if (arguments.length > 2) {

            if (Array.isArray(_callback)) {
                values = _callback.slice(0);
               
            } else {
                for (let i = 1; i < arguments.length - 1; i++) {
                    values.push(arguments[i]);
                };
            }



            _callback = arguments[arguments.length - 1];
        }

        hubConnection.invoke("ExecuteQueryReader", query, values).then(function (reader) {
            _callback(reader.result, reader.error);
        }


        ).catch((error) => alert(error));
       
    }

}