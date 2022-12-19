import imageCompression from 'browser-image-compression';

function getRandomName() {
  return new Date().getTime() + "_" + ("" + Math.random()).substring(2, 8);
}

function changeFileName(fileName) {
  const arrName = fileName.split('.');
  const fileType = arrName[arrName.length -1];
  return 'file_' + getRandomName() + '.' + fileType;
}

function getFileNameFromUrl(url) {
  const splitUrl = url.split('/');
  return splitUrl[splitUrl.length-1];
}

async function handleCompressImage(imageFile) {

  const options = {
    maxSizeMB: 5,
    maxWidthOrHeight: 1280,
    useWebWorker: true
  }
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.log(error);
  }
}

export {
  changeFileName,
  getFileNameFromUrl,
  handleCompressImage
}