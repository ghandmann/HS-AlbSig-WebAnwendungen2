$(() => {
    startWebSocket();
    $("#sendBtn").click(sendMessage);
});

function sendMessage() {
    let nickname = $("input[name='nickname']").first().val();
    let message = $("input[name='message']").first().val();

    let data = {
        message: message,
        nickname: nickname
    };

    let dataString = JSON.stringify(data);

    $.ajax({
        type: "POST",
        url: "/message",
        data: dataString,
        contentType: "application/json",
      });
}

function startWebSocket() {
    let ws = new WebSocket("ws://localhost:8080/updates");

    ws.onopen = () => console.log("WebSocket connection opened");
    ws.onclose = () => console.log("WebSocket connection closed");
    ws.onerror = () => console.log("WebSocket connection error");
    ws.onmessage = (eventData) => {
        let message = eventData.data;
        console.log("WebSocket Message: " + message);
    };
}
