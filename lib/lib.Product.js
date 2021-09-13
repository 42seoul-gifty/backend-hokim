function makeToJson(value) {
  try {
    return value.toJSON();
  } catch (e) {
    return value;
  }
}

const convertImageUrl = async (product) => {
  product = makeToJson(product);
  product["image_url"] = product.ProductImages.map((image) => {
    return image.image_url;
  });
  delete product["ProductImages"];
  return product;
};

module.exports = {
  convertImageUrl,
};
