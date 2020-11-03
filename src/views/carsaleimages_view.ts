import CarSaleImg from '../models/CarSaleImg';


export default {
  render(image: CarSaleImg) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    }
  },

  renderMany(images: CarSaleImg[]) {
    return images.map( img => this.render(img));
  }
}
