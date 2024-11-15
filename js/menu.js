
const mainElement = document.querySelector('main');

const htmlContent = `
        <ul id="menu">
            <a class="btn_home" href="index.html"><li class="item btn_home"></li></a>
            <a class="btn_arca"  href="arcade.html"><li class="item btn_arca"></li></a>
            <a class="btn_maps" href="maps.html"><li class="item btn_maps"></li></a>
        </ul>
`;
mainElement.innerHTML += htmlContent;