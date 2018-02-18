let q = require('q');
var cv = require('opencv');

export class ImageService {
  constructor() {
  }

  detectFace(imageStream): Q.IPromise<any> {
    console.log('detect face');
    let defer = q.defer();

    cv.readImage(imageStream, (err, image) => {
      console.log('open image');
      if (err) {
        defer.reject(err);
      }

      image.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
        if (err) {
          defer.reject(err);
        }

        for (var i = 0; i < faces.length; i++) {
          var x = faces[i];
          image.ellipse(x.x + x.width / 2, x.y + x.height / 2, x.width / 2, x.height / 2);
        }

        defer.resolve(image.toBuffer().toString('base64'));
      });
    });

    return defer.promise;
  }

  //detectSize

  //resizeImage


}