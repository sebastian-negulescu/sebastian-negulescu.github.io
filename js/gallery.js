// for loading images

load = (src) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', resolve);
        image.addEventListener('error', reject);
        image.src = src;
    });
};

// for creating the gallery pictures

const createPictures = () => {
    const amount = 18;
    let sum = 0;
    const desiredSum = amount * (amount + 1) / 2;
    const body = document.querySelector('body');
    for (let i = 1; i <= amount; ++i) {
        const picture = document.createElement('div');
        const image = `./gallery-images/compressed/gallery-${i}.JPG`;
        load(image).then(() => {
            const ind = parseInt(image.replace('./gallery-images/compressed/gallery-', '').replace('.JPG', ''));

            picture.style.backgroundImage = 'url(' + image + ')';
            picture.onclick = (event) => {
                const attr = event.target.style.backgroundImage;
                const i = parseInt(attr.slice(attr.lastIndexOf('gallery-') + 8, -6));
                openFullscreen(i);
            };
            document.querySelector('#gallery').appendChild(picture);

            sum += ind;
            if (sum == desiredSum) {
                body.style.display = 'block';
                document.querySelector('#loading').style.display = 'none';
            }
        });
    }
};

createPictures();

// for changing the row sizes in the gallery

const modifyGallery = () => {
    const gallery = document.querySelector('#gallery');
    if (window.innerWidth < 1500) {
        if (window.innerWidth < 600) {
            gallery.style.gridTemplateColumns = 'repeat(1, 1fr)';
            gallery.style.gridAutoRows = `calc(((${window.innerWidth}px - 4em) - (2em * (1 - 1))) / 1)`;
        } else if (window.innerWidth < 1000) {
            gallery.style.gridTemplateColumns = 'repeat(2, 1fr)';
            gallery.style.gridAutoRows = `calc(((${window.innerWidth}px - 4em) - (2em * (2 - 1))) / 2)`;
        } else {
            gallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
            gallery.style.gridAutoRows = `calc(((${window.innerWidth}px - 4em) - (2em * (3 - 1))) / 3)`;
        }
    } else {
        gallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
        gallery.style.gridAutoRows = `calc((1500px - (2em * (3 - 1))) / 3)`;
    }
};

window.addEventListener('resize', modifyGallery);
modifyGallery();

// open fullscreen image

const openFullscreen = (ind) => {
    document.querySelector('#loading').style.display = 'block';
    document.querySelector('#fullscreen').style.display = 'flex';
    document.querySelector('body').style.overflow = 'hidden';
    const image = `./gallery-images/full/full-${ind}.JPG`;
    load(image).then(() => {
        document.querySelector('#fullPicture').src = image;
        document.querySelector('#fullPicture').style.display = 'block';
        document.querySelector('#loading').style.display = 'none';
    });
};

// close fullscreen image

const closeFullscreen = () => {
    document.querySelector('#fullscreen').style.display = 'none';
    document.querySelector('#fullPicture').style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
};
