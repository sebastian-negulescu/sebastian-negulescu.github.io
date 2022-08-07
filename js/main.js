// for loading background image

load = (src) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', resolve);
        image.addEventListener('error', reject);
        image.src = src;
    });
};

const image = './images/background-image-min.jpg';
load(image).then(() => {
    const body = document.querySelector('body');
    body.style.backgroundImage = 'url(' + image + ')';
    body.style.display = 'flex';
    document.querySelector('#loading').style.display = 'none';
});

// for terminal height

const resetHeight = () => {
    document.body.style.height = window.innerHeight + 'px';
    const container = document.querySelector('#container');
    const main = document.querySelector('#main');

    let mq1 = window.matchMedia('(max-width: 600px)');
    if (mq1.matches) { // mobile portrait
        container.style.height = '100%';
        main.style.height = 'calc(100% - 7em)';
    } else {
        let mq2 = window.matchMedia( "(min-height: 798px)" );
        if (mq2.matches) { // desktop
            container.style.height = 'calc(7em + 600px)';
            main.style.height = '600px';
        } else { // mobile landscape
            container.style.height = '100%';
            main.style.height = 'calc(100% - 7em)';
        }
    }
}
window.addEventListener('resize', resetHeight); // add height options
resetHeight();

// for typed effect

const fileUrl = '../welcome.file';

const options = {
    strings: ['display ^750welcome.file'],
    autoInsertCss: false,
    startDelay: 2000,
    typeSpeed: 100,
    onComplete: (self) => {
        const cursor = document.querySelector('.typed-cursor');
        cursor.style.animation = 'blink 1.2s infinite steps(1, start)';
        const tag = document.createElement('span');
        tag.innerHTML = '<em class="green">user@device</em>:<em class="blue">~</em>$ ';
        document.querySelector('#main').appendChild(tag);
        document.querySelector('#main').appendChild(cursor);
        fetch(fileUrl)
            .then( r => r.text() )
            .then( t => document.querySelector('#message').innerHTML = t );
    }
};

const typed = new Typed('#typed', options);