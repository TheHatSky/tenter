import { commercialAlbum, fashionAlbum, weddingsAlbum } from './albums';
import { clientId } from './client-id';
import { renderAlbum } from './render';

renderAlbum(commercialAlbum, clientId);
renderAlbum(weddingsAlbum, clientId);
renderAlbum(fashionAlbum, clientId);
