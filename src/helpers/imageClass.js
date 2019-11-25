export class ImageClass {
  constructor(src, width, height, valid, id) {
    this.src = src;
    this.width = +this.calculateProportionWidth(width, height);
    this.height = +this.calculateProportionHeight(width, height);
    this.valid = valid;
    this.id = id;
  }

  calculateProportionWidth(width, height) {
    return width > height ? (width / height).toFixed(2) : 1;
  }

  calculateProportionHeight(width, height) {
    return height > width ? (height / width).toFixed(2) : 1;
  }
}
