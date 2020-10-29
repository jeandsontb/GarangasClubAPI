import Historic from '../models/Historic';

export default {
  render(historic: Historic) {
    return {
      id: historic.id,
      title: historic.title,
      description: historic.description,
      url: historic.image,
    }
  },

  renderMany(historic: Historic[]) {
    return historic.map(e => this.render(e));
  }
}
