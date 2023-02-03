let size = 16;
const canvas = 360;
if (localStorage.getItem("size")) {
    size = localStorage.getItem("size");
}

const button = document.querySelector('button');
button.addEventListener('click', () => {
    let tempSize = parseInt(prompt("Please enter the size of the grid in one number"));
    if (tempSize < 100 && tempSize > 0) {
        localStorage.setItem("size", tempSize);
        window.location.reload();
    } else {
        alert("Size must be between 0 and 100");
    }
});

const container = document.querySelector("#container");
container.setAttribute('style', `width: ${canvas}px; height: ${canvas}px;`);

for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.classList.add('blank');
        square.style.cssText = `height: ${canvas/size}px; width: ${canvas/size}px; background-color: gray;`;
        container.appendChild(square);
    }
}

const squares = document.querySelectorAll('.square');

squares.forEach((sq) => {
    sq.addEventListener('mouseover', () => {
        sq.style.cssText = `height: ${canvas/size}px; width: ${canvas/size}px; background-color: white;`;
        /* Can't use "Array.includes()" directly because classList is an 
        "arraylike object" (in this case a DOMTokenList) that doesn't have the 
        same methods as a regular array.
        In this case I use the "spread operator" between [] to make an array.
        I could use the DOMTokenList method .contains() but as I'm still learning
        I think it would be best to remember the [...] method to create arrays*/
        if ([...sq.classList].includes('blank')) {
            console.log('It was blank');
            sq.classList.remove('blank');
        }
    })
});

