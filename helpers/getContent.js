import fs from 'fs';
import path from 'path';
import { createClient } from 'contentful';

const SPACE = process.env.SPACE_ID;
const TOKEN = process.env.TOKEN_ID;

const client = createClient({
  space: SPACE,
  accessToken: TOKEN
});

const types = [
  'home'
];

export const getContent = async () => {
  console.log('> Starting import...');
  for (const type of types) {
    console.log('> Getting content:', type);
    const entries = await client.getEntries({
      content_type: type,
      include: 3
    });

    if (entries.total === 1) {
      const { fields } = entries.items[0];
      fs.writeFileSync(
        path.join(__dirname, '..', 'data', `${type}.json`),
        JSON.stringify(fields)
      );

      console.log('> Content has been written for:', type);
    }
  }

  return true;
}

if (process.argv[2] === 'install') {
  getContent();
}