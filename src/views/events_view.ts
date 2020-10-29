import Event from '../models/Event';

export default {
  render(event: Event) {
    return {
      id: event.id,
      url: `http://localhost:3333/uploads/${event.img}`,
      title: event.title,
      description: event.description,
      date: event.date,
    };
  },

  renderMany(event: Event[]) {
    return event.map(e => this.render(e));
  }
}
