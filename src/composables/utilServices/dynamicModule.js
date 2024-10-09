async function dynamicModular(path, filename) {
  try {
    // const module = await import("../../schemas/" + path + ".js");
    // const schema = module[filename];

    import("../../schemas/" + path + ".js")
      .then((module) => {
        const mod = module[filename];
        if (mod) {
          return mod;
        } else {
          throw new Error(
            `Export "${filename}" not found in module "${path}".` +
              "../../schemas/" +
              path +
              ".js"
          );
        }
      })
      .catch((error) => {
        console.error("Error loading module:", error);
        return null;
      });

    // // Dynamically resolve the path relative to the current file
    // const modulePath = new URL(`../../schemas/${path}.js`, import.meta.url);

    // // Dynamically import the module
    // const module = await import(modulePath);

    // Return the specific export from the module
  } catch (error) {
    console.error("Error loading module:", error);
    return null;
  }
}
export default dynamicModular;
