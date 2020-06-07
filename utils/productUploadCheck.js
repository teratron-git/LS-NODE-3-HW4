module.exports = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Изображение не загружено', err: true };
  }
  if (!fields.name) {
    return { status: 'Название товара не указано', err: true };
  }
  if (!fields.price) {
    return { status: 'Цена товара не указана', err: true };
  }
  return { status: 'OK', err: false };
};
