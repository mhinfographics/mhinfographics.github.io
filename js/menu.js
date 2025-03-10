
const mainElement = document.querySelector('main');

const htmlContent = `
        <ul id="menu">
            <a class="btn_home" href="https://mhinfographics.github.io/"><li class="item btn_home"></li></a>
            <a class="btn_arca"  href="https://mhinfographics.github.io/arcade"><li class="item btn_arca"></li></a>
            <a class="btn_maps" href="https://mhinfographics.github.io/maps"><li class="item btn_maps"></li></a>
        </ul>
`;
mainElement.innerHTML += htmlContent;