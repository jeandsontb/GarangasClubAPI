import PersonaImg from '../models/PersonaImg';

export default {
  render(image: PersonaImg) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },

  renderMany(images: PersonaImg[]) {
    return images.map(image => this.render(image));
  }
}
