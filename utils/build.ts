import { commercialAlbum, fashionAlbum, weddingsAlbum } from './albums';
import { clientId } from './client-id';
import { downloadAlbum } from './render';

downloadAlbum(weddingsAlbum, clientId);
downloadAlbum(fashionAlbum, clientId);
downloadAlbum(commercialAlbum, clientId);

// renderAlbum(commercialAlbum, clientId);
// renderAlbum(weddingsAlbum, clientId);
// renderAlbum(fashionAlbum, clientId);
