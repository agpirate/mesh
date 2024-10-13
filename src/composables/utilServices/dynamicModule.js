async function dynamicModular(path, filename) {
  try {
    var module = await import("../../schemas/" + path + ".js");
    console.error(" loading module:",path);

    return module[filename];
  } catch (error) {
    console.error("Error loading module:",path, error);
    return null;
  }
}
export default dynamicModular;
