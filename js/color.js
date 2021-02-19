
function nextColor() {
    fetch(getHttpRequestString)
        .then(response => response.json())
        .then(data => console.log(data));
}

function getHttpRequestString() {
    return 'https://api.color.pizza/v1/' + randomColorHex()
}

function randomColorHex() {
    return Math.random().toString(16).substr(-6)
}