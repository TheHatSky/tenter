import { getImages } from "./imgur";

interface Person {
    type: string;
    url: string;
    name: string;
}

interface Photo {
    name: string;
    persons: Person[];
    orientation: "portrait" | "album"
}

export const render = (photo: Photo) => {
    let titles = "";
    for (let person of photo.persons)
        titles += person.type + "<br/>";

    let links = "";
    for (let person of photo.persons)
        links += `<a class="person-link" href="${person.url}">${person.name}</a><br/>`;

    return `<div class="${photo.orientation} slide" data-image-name="${photo.name}">
                <div class="description none container">
                    <div class="row">
                        <div class="four columns">
                            ${titles}
                        </div>
                        <div class="eight columns">
                            ${links}
                        </div>
                    </div>
                </div>
            </div>`;
};

export const renderAlbum = (album: string, clientId: string) => {
    getImages(album, clientId, (images) => {
        let results = "";
        for (let image of images) {
            let photo: Photo = {
                name: image.fileName,
                orientation: image.aspectRatio > 1 ? "album" : "portrait",
                persons: image.description.persons
            }

            results += render(photo);
        }
        console.log(results);
    });
};
