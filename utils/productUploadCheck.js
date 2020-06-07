module.exports = (productName, productPrice, fileName, fileSize) => {
  let response;

  if (productName === '') {
    response = {
      mes: 'Укажите ниаменование продукта',
      status: 'Error',
    };
  }

  if (+productPrice < 0) {
    response = {
      mes: 'Укажите положительную цену',
      status: 'Error',
    };
  }

  if (fileName === '' || fileSize === 0) {
    response = {
      mes: 'Не загружена картинка',
      status: 'Error',
    };
  }

  return response;
};
