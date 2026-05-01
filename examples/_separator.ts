export default function separator(title?: string): void {
  if (title) {
    console.log(`\n--- ${title} ---\n`);
    return;
  }
  console.log('\n---------\n');
}
