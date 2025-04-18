// useful constants
const loading = document.querySelector('#loading');
const directory = document.querySelector('#directory');
const galleryHeader = document.querySelector('#galleryHeader');
const galleryName = document.querySelector('#galleryName');
const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');

var gallery_map;

// for loading images
const load = (src) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', resolve);
        image.addEventListener('error', reject);
        image.src = src;
    });
};

// open loading screen
const openLoading = () => {
    loading.style.display = 'block';
};

// close loading screen
const closeLoading = () => {
    loading.style.display = 'none';
};

// open directory display
const openDirectory = () => {
    directory.style.display = 'block';
};

// close directory display
const closeDirectory = () => {
    directory.style.display = 'none';
};

// for creating the gallery folders
const initializeDirectory = () => {
    const list = document.createElement('ul');
    gallery_map.forEach((_, key) => {
        const item = document.createElement('li');
        item.onclick = () => { 
            openGallery(key); 
        }
        item.innerHTML = key.replaceAll('-', ' ');
        list.appendChild(item);
    });
    directory.appendChild(list);
};


// for creating the gallery pictures
const openGallery = (dir) => {
    openLoading();
    closeDirectory();

    const names = gallery_map.get(dir);
    names["thumbnails"].forEach((name, i) => {
        const imagePath = `./gallery/${dir}/thumbnails/${name}`;
        const picture = document.createElement('div');

        load(imagePath).then(() => {
            picture.style.backgroundImage = `url('${imagePath}')`;
            picture.onclick = (event) => {
                const fullPath = event.target.style.backgroundImage
                    .split('"')[1].replace('thumbnails', 'images');
                openFullscreen(fullPath);
            };
            gallery.appendChild(picture);
         });

    });

    galleryName.innerHTML = dir;
    galleryHeader.style.display = 'block';
    gallery.style.display = 'grid';
    closeLoading();
};

const closeGallery = () => {
    galleryHeader.style.display = 'none';
    let child = gallery.lastElementChild;
    while (child) {
        gallery.removeChild(child);
        child = gallery.lastElementChild;
    }
    gallery.style.display = 'none';
    openDirectory();
};

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

// open fullscreen image
const openFullscreen = (path) => {
    openLoading();
    document.querySelector('#fullscreen').style.display = 'flex';
    document.querySelector('body').style.overflow = 'hidden';
    load(path).then(() => {
        document.querySelector('#fullPicture').src = path;
        document.querySelector('#fullPicture').style.display = 'block';
        closeLoading();
    });
};

// close fullscreen image
const closeFullscreen = () => {
    document.querySelector('#fullscreen').style.display = 'none';
    document.querySelector('#fullPicture').style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
};

const main = async () => {
    const gallery = await fetch("./manifest.json")
        .then(res => res.json())
        .catch(err => console.log("error"));
    gallery_map = new Map(Object.entries(gallery));
    initializeDirectory();
    modifyGallery();
};

main();
