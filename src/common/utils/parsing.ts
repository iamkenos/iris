export function isJSON(str: string): boolean {
  if (typeof str !== "string") return false;
  try {
    const result = JSON.parse(str);
    return result instanceof Object || result instanceof Array;
  } catch (e) {
    return false;
  }
}

export function parseJSON(object: any) {
  try {
    return JSON.parse(object);
  } catch (e) {
    return object;
  }
}
