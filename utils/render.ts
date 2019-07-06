const http = require("https");
const fs = require("fs");
const path = require("path");
import { getImages } from "./imgur";

interface Person {
  type: string;
  url: string;
  name: string;
}

interface Photo {
  name: string;
  persons: Person[];
  orientation: "portrait" | "album";
}

export const render = (photo: Photo) => {
  let titles = "";
  for (let person of photo.persons) titles += person.type + "<br/>";

  let links = "";
  for (let person of photo.persons)
    links += `<a class="person-link" href="${person.url}">${
      person.name
    }</a><br/>`;

  return `<div class="${photo.orientation} slide" data-image-name="${
    photo.name
  }">
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
            </div>\n`;
};

export const renderAlbum = (album: string, clientId: string) => {
  getImages(album, clientId, images => {
    let results = "";
    for (let image of images) {
      let photo: Photo = {
        name: image.fileName,
        orientation: image.aspectRatio > 1 ? "album" : "portrait",
        persons: image.description.persons
      };

      results += render(photo);
    }
  });
};

export const downloadAlbum = async (album: string, clientId: string) => {
  await getImages(album, clientId, async images => {
    for (let image of images) {
      console.log("Downloading:", image.description.title || "<no title>");
      await downloadFile(image.link, `./images/${image.fileName}_original.jpg`);
      await downloadFile(
        getImageProxyLink(image.link, 1960),
        `./images/${image.fileName}l.jpg`
      );
      await downloadFile(
        getImageProxyLink(image.link, 1280),
        `./images/${image.fileName}m.jpg`
      );
      await downloadFile(
        getImageProxyLink(image.link, 800),
        `./images/${image.fileName}s.jpg`
      );
    }
  });
};

const downloadFile = (link, name) => {
  console.log(link, "=>", path.resolve(name));
  return new Promise(resolve => {
    const file = fs.createWriteStream(name);
    const request = http.get(link, response => {
      response.pipe(file);
      resolve();
    });
  });
};

const getImageProxyLink = (link: string, size: number) => {
  return `https://images.weserv.nl/?url=${encodeURIComponent(
    link.replace("https://", "")
  )}&w=${size}&il`;
};
