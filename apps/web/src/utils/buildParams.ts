export function buildParams<T extends Record<string, unknown>>(
  filters: T,
): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });
  console.log(params.toString());
  return params.toString();
}
