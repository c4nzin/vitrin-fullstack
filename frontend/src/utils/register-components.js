export function registerComponents(app) {
  const requireComponent = require.context('../components', true, /\.vue$/);

  requireComponent.keys().forEach((fileName) => {
    const componentName = fileName
      .split('/')
      .pop()
      .replace(/\.\w+$/, ''); //removing file extension eg : blabla.vue => "blabla"

    console.log(typeof componentName);

    app.component(componentName, componentName);
  });
}
