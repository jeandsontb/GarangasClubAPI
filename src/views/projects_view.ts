import Project from '../models/Project';
import imagesView from './images_view';

export default {
  render(project: Project) {
    return {
      id: project.id,
      name: project.name,
      title: project.title,
      description: project.description,
      future_projects: project.future_projects,
      images: imagesView.renderMany(project.images),
    };
  },

  renderMany(projects: Project[]) {
    return projects.map(project => this.render(project));
  }
}
