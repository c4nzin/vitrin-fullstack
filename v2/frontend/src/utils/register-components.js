const fs = require('fs');
const path = require('path');

const regex = /\.vue$/;

export async function registerComponents(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  let vueComponents = [];

  for (const file of files) {
    const filePath = path.join(dir, file.name);

    if (file.isFile() && regex.test(file.name)) {
      vueComponents.push(filePath);
    }
  }

  return vueComponents;
}
