export async function getInput(name: string): Promise<string> {
  const file = Bun.file(name);
  const content = await file.text();
  return content.trim();
}
