// Default pixel size
let size = 16;
// Default canvas size
const canvas = 360;
// localStorage lets me save data in the browser
// so I won't lose it when reloading
if (localStorage.getItem("size")) {
    size = localStorage.getItem("size");
}

function randomNumber() {
    return Math.floor(Math.random() * 255);
}

const button = document.querySelector('button');
button.addEventListener('click', () => {
    let tempSize = parseInt(prompt("Please enter the size of the grid in one number"));
    if (tempSize < 100 && tempSize > 0) {
        // Save size of grid in localStorage so it will keep after reload
        localStorage.setItem("size", tempSize);
        // Reload page
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
        //sq.style.cssText = `height: ${canvas/size}px; width: ${canvas/size}px;`;
        /* Can't use "Array.includes()" directly because classList is an 
        "arraylike object" (in this case a DOMTokenList) that doesn't have the 
        same methods as a regular array.
        In this case I use the "spread operator" between [] to make an array.
        I could use the DOMTokenList method .contains() but as I'm still learning
        I think it would be best to remember the [...] method to create arrays*/
        if ([...sq.classList].includes('blank')) {
            let red = randomNumber();
            let green = randomNumber();
            let blue = randomNumber();
            sq.style.backgroundColor = `RGB(${red}, ${green}, ${blue})`;
            sq.setAttribute('data-red', red);
            sq.setAttribute('data-green', green);
            sq.setAttribute('data-blue', blue);
            sq.classList.remove('blank');
            sq.classList.add('painted');

        } else if ([...sq.classList].includes('painted')) {
            let red = parseInt(sq.getAttribute('data-red'));
            let green = parseInt(sq.getAttribute('data-green'));
            let blue = parseInt(sq.getAttribute('data-blue'));

            
            red += 25;
            green += 25;
            blue += 25;
            
            (red > 255) ? red = 255: red;
            (green > 255) ? green = 255: green;
            (blue > 255) ? blue = 255: blue;
            

            sq.style.backgroundColor = `RGB(${red}, ${green}, ${blue})`;
            sq.setAttribute('data-red', red);
            sq.setAttribute('data-green', green);
            sq.setAttribute('data-blue', blue);

            if (red === 255 && green === 255 && blue === 255) {
                sq.classList.remove('painted');
            }
        }
    })
});

