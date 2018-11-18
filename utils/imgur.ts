import * as request from 'request';

interface PersonInfo {
    type: string;
    name: string;
    url: string;
    icon: string;
}

export const parsePerson = (person): PersonInfo => {
    // console.log(person);

    var parts = person.split(': ');
    var type = parts[0];

    var nameAndUrl = parts[1].replace(')', '').split('(');
    var name = nameAndUrl[0].trim();
    var url = (nameAndUrl[1] || "#")
        .replace('vk . com', 'vk.com')
        .replace('facebook . com', 'facebook.com');

    var icon = url.indexOf('vk.com') >= 0 ?
        'vk' :
        url.indexOf('facebook.com') >= 0 ?
        'facebook' :
        url.indexOf('#') >= 0 ?
        'mask' :
        'vcard';

    return {
        type: type,
        name: name,
        url: url,
        icon: icon
    }
};

export const getAltText = (persons) => {
    var result = '';

    for (var i = persons.length - 1; i >= 0; i--) {
        var person = persons[i];
        result += person.type + ": " + person.name + ". ";
    }

    return result.replace('..', '.').trim();
}

interface PhotoInfo {
    link: string;
    fileName: string;
    aspectRatio: number;
    description: {
        persons: PersonInfo[];
        title: string;
    };
    altText: string;
}

export const parseDescription = (photo): PhotoInfo => {
    let linkParts = photo.link.split('/');
    let fileName = linkParts[linkParts.length - 1].replace(".jpg", "");
    if (!photo.description)
        return {
            link: photo.link,
            fileName: fileName,
            aspectRatio: photo.width / photo.height,
            description: {
                persons: [],
                title: photo.title
            },
            altText: photo.title
        };

    let persons: PersonInfo[] = photo.description.split('\n').map(parsePerson);

    let title;

    if (photo.title) {
        let titleParts = photo.title.split(' ');

        if (titleParts[0] === 'HQ') {
            title = photo.title.substr(3).trim();
        } else {
            title = photo.title;
        }
    }

    return {
        link: photo.link,
        fileName: fileName,
        aspectRatio: photo.width / photo.height,
        description: {
            persons: persons,
            title: title
        },
        altText: getAltText(persons)
    };
};

export const getImages = (album: string, clientId: string, callback: (info: PhotoInfo[]) => void) => {
    var options = {
        url: 'https://api.imgur.com/3/account/ArtemSakhatskiy/album/' + album,
        headers: {
            'Authorization': 'Client-ID ' + clientId
        }
    };
    request.get(options, (err, req, body) => {
        if (err != null) {
            console.log(err);
            return;
        }
        var photos = JSON.parse(body).data.images;

        var galleryArray: PhotoInfo[] = [];

        photos.forEach((photo) => {
            galleryArray.push(parseDescription(photo));
        });

        callback(galleryArray);
    });
}
