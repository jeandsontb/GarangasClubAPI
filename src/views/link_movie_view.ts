import LinkMovie from '../models/LinkMovie';

export default {
  render(linkmovie: LinkMovie) {
    return {
      id:linkmovie.id,
      title: linkmovie.title,
      url: linkmovie.url,
    };
  },

  renderMany( linkmovie: LinkMovie[] ) {
    return linkmovie.map(e => this.render(e));
  }
}
