const data = require('./data/projects');

module.exports = {
  exportPathMap: async function () {
    const projects = data.allProjects.reduce(
      (projects, project, index) =>
        Object.assign({}, projects, {
          [`/project/${project.fields.title.replace(/\s/g, '-').toLowerCase()}`]: {
            page: '/project',
            query: { id: index }
          }
        }),
      {}
    );

    return Object.assign({}, projects, {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/projects': { page: '/projects' },
    })
  }
}