import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function run(page, ui) {
  const snapshot = await ui.snapshot({ full: true });
  const title = await page.title();
  const url = page.url();
  return { title, url, bodyLength: snapshot.length, snapshot: snapshot.substring(0, 5000) };
}
