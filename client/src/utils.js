export function createFormData(values) {
  const data = [];
  for(let prop in values) {
    if (values.hasOwnProperty(prop)) {
      let encKey = encodeURIComponent(prop);
      let encVal = encodeURIComponent(values[prop]);
      data.push(`${encKey}=${encVal}`);
    }
  }
  return data.join("&");
}

export function isNode() {
  return typeof process === 'object' && !!process.versions.node ? global : window;
}