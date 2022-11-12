function getRandomName() {
  return new Date().getTime() + "_" + ("" + Math.random()).substring(2, 8);
}

function changeFileName(fileName) {
  const arrName = fileName.split('.');
  const fileType = arrName[arrName.length -1];
  return 'file_' + getRandomName() + '.' + fileType;
}

export {
  changeFileName,
}