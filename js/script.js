const container = document.querySelector("#container");


for (i = 0; i < 16; i++) {
    const square = document.createElement('div');
    square.style.cssText = "height: 8px; width: 8px; background-color: gray;";
    container.appendChild(square);
}