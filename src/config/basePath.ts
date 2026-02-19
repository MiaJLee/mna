export const BASE_PATH = "/mna";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
