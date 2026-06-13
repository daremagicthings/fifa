async function test() {
  const url = 'https://gamma-api.polymarket.com/markets?active=true&limit=100';
  const res = await fetch(url);
  const data = await res.json();
  const filtered = data.filter(m => {
    const text = ((m.question || '') + ' ' + (m.description || '') + ' ' + (m.groupItemTitle || '')).toLowerCase();
    return text.includes('world cup') || text.includes('fifa') || text.includes('soccer');
  });
  console.log(`Found ${filtered.length} soccer/world cup markets:`);
  filtered.forEach(m => {
    console.log(`- ID: ${m.id}`);
    console.log(`  Question: ${m.question}`);
    console.log(`  Outcomes: ${m.outcomes}`);
    console.log(`  Prices: ${m.outcomePrices}`);
    console.log(`  Slug: ${m.slug}`);
  });
}
test();
