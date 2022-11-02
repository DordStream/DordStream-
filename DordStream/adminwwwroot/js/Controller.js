let ControllerConnection = function (controllerName) {
    let hubConnection = new signalR.HubConnectionBuilder().withUrl("/" + controllerName).configureLogging(signalR.LogLevel.Information).withAutomaticReconnect().build();
    return hubConnection;

}