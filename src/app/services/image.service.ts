import {Injectable} from '@angular/core';
import {Cinema} from "../models/cinema";
import {FileHandle} from "../models/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private sanitizer: DomSanitizer) { }

  public getImages(cinema: Cinema) {
    const cinemaImages: any[] = cinema.images;

    const cinemaImagesToFileHandle: FileHandle[] = []

    for (let i= 0;i < cinemaImages.length; i++) {
      const imageFileData = cinemaImages[i];

      const imageBlob = this.dataURIToBlob(imageFileData.image, imageFileData.type);

      const file = new File([imageBlob], imageFileData.name, {type: imageFileData.type});

      const finalFileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }

      cinemaImagesToFileHandle.push(finalFileHandle);
    }
    cinema.images = cinemaImagesToFileHandle;
    return cinema;
  }

  public dataURIToBlob(image, imageType) {
    const byteString = window.atob(image);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer)

    for (let i= 0; i< byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], {type: imageType});
  }
}
