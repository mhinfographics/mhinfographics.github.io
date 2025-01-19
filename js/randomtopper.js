// topper random selector 
/*
var randomTopper = Math.floor(Math.random() * 45);
document.querySelector('#topper').style.backgroundImage = 'url(./img/topper/topper_' + randomTopper + '.jpg)';
*/


// random topper image loader with animation

function loadRandomTopper() {
    const topperElement = document.querySelector('#topper');
    let previousImageIndex = -1;

    function getRandomImageIndex() {
        let index;
        do {
            index = Math.floor(Math.random() * 47);
        } while (index === previousImageIndex);
        previousImageIndex = index;
        return index;
    }

    function loadImage() {
        const imageIndex = getRandomImageIndex();
        topperElement.style.backgroundImage = `url('/img/topper/topper_${imageIndex}.jpg')`;
    }

    function createTimeoutCircle() {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "110");
        svg.setAttribute("height", "260");

        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", "56");
        circle.setAttribute("cy", "240");
        circle.setAttribute("r", "5");
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", "3");
        circle.setAttribute("fill", "none");
        circle.setAttribute("opacity", "0.1");

        svg.appendChild(circle);
        topperElement.appendChild(svg);

        let angle = 0;
        const interval = setInterval(() => {
            angle += 1;
            circle.setAttribute("stroke-dasharray", `${angle}, 283`);
            if (angle >= 360) {
                clearInterval(interval);
                topperElement.removeChild(svg);
                loadImage();
                createTimeoutCircle();
            }
        }, 20);
    }

    loadImage();
    createTimeoutCircle();
}

document.addEventListener('DOMContentLoaded', loadRandomTopper);
