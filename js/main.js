function resetHeight(){
    document.body.style.height = window.innerHeight + 'px';
    document.querySelector('#main').style.height = '100%';
}
window.addEventListener('resize', resetHeight);
resetHeight();

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
            .then( t => document.querySelector('#message').innerHTML = t);
    }
};

const getImages = async () => {
    await fetch('../images/background-image-landscape.jpg')
        .then( res => {
            document.querySelector('body').style.backgroundImage = 'url("../images/background-image-landscape.jpg")';
        })
        .then( err => console.log(err) );
};

const typed = new Typed('#typed', options);