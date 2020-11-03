import CarSale from '../models/CarSale';

import carSaleViews from './carsaleimages_view';

export default {
  render(carsale: CarSale) {
    return {
      id: carsale.id,
      name: carsale.name,
      title: carsale.title,
      description: carsale.description,
      phone: carsale.phone,
      price: carsale.price,
      cover: `http://localhost:3333/uploads/${carsale.cover}`,
      images: carSaleViews.renderMany(carsale.carSaleImages),
    }
  },

  renderMany(carsales: CarSale[]) {
    return carsales.map(e => this.render(e));
  }
}
