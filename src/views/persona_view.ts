import Persona from '../models/Persona';

import personaImagesView from './personaimages_view';

export default {
  render(persona: Persona) {
    return {
      id: persona.id,
      name: persona.title,
      description: persona.description,
      avatar: `http://localhost:3333/uploads/${persona.avatar}`,
      images: personaImagesView.renderMany(persona.personaImages),
    }
  },

  renderMany( persona: Persona[]) {
    return persona.map(e => this.render(e));
  }
}
