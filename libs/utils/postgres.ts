import { sql } from '@vercel/postgres';
import { validateDate } from '@/libs/utils/validateDate';
import { getPosts } from './gist-processor';

export async function createArticlesTable() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS articles (
      id VARCHAR(255) PRIMARY KEY,
      title VARCHAR(255),
      cover TEXT,
      public BOOLEAN,
      filecount INTEGER,
      categories TEXT,
      tags TEXT,
      created TEXT,
      updated TEXT
    );`;
    console.log(`Created "articles" table`);
  } catch (error) {
    console.log('CREATED:', error);
  }
}

export async function insertArticlesData() {
  try {
    const posts = await getPosts();
    if (posts) {
      const inserts = posts.map((post) => {
        return sql`
        INSERT INTO articles (id,title,cover,public,filecount,categories,tags,created,updated)
      VALUES (${post.id},${post.title},${JSON.stringify(post.cover)},${
          post.public
        },${post.filecount},${JSON.stringify(post.categories)},${JSON.stringify(
          post.tags
        )},${post.created},${post.updated}) ON CONFLICT (id) DO NOTHING;
      `;
      });
      const articles = await Promise.all(inserts);
      console.log(`Seeded ${articles.length} articles`);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function dropArticlesTable() {
  try {
    await sql`DROP TABLE IF EXISTS articles;
  `;
    console.log(`DROPED "articles" table`);
  } catch (error) {
    console.log(error);
  }
}

export async function getArticlesData(pageCount: number) {
  // SELECT * FROM articles ORDER BY updatedat LIMIT 10;
  // SELECT * FROM articles ORDER BY updatedat LIMIT 10 OFFSET 10;

  try {
    const articles = await sql`
    SELECT id,title,cover,public,filecount,categories,tags,created,updated
    FROM articles
    ORDER BY to_timestamp(created, 'YYYY/MM/DD HH24:MI:SS') DESC LIMIT 10 OFFSET ${
      pageCount * 10
    };
  `;
    const { rows } = articles;
    return rows as unknown as Blog.Posts;
  } catch (error: any) {
    if (
      (error.message as string).includes('relation "articles" does not exist')
    ) {
      await createArticlesTable();
      await insertArticlesData();
    }
  } finally {
    const articles = await sql`
    SELECT id,title,cover,public,filecount,categories,tags,created,updated
    FROM articles
    ORDER BY to_timestamp(created, 'YYYY/MM/DD HH24:MI:SS') DESC LIMIT 10 OFFSET ${
      pageCount * 10
    };
  `;
    const { rows } = articles;
    return rows as unknown as Blog.Posts;
  }
}

export async function getLastArticleDate() {
  try {
    const date = await sql`
    SELECT to_timestamp(created, 'YYYY/MM/DD HH24:MI:SS')
    FROM articles
    ORDER BY created
    LIMIT 1;
    `;
    const { rows } = date;
    const dateString = rows[0] as { to_char: string };
    if (validateDate(dateString.to_char)) {
      return dateString.to_char;
    } else {
      return '';
    }
  } catch (error) {
    return '';
  }
}

export async function getArticlesCount() {
  try {
    const result = await sql`SELECT COUNT(*) FROM articles;`;
    const { rows } = result;
    return rows[0].count as string;
  } catch (error) {}
}

export async function getPre(id: string) {
  // 获取该日期之前的一条数据
  try {
    const result = await sql`
    SELECT id,title,created FROM articles
    WHERE to_timestamp(created, 'YYYY/MM/DD HH24:MI:SS') < (SELECT to_timestamp(created, 'YYYY/MM/DD HH24:MI:SS') FROM articles WHERE id=${id})
    ORDER BY to_timestamp(created, 'YYYY/MM/DD HH24:MI:SS') DESC
    LIMIT 1;`;
    const { rows } = result;

    return rows[0] as {
      id: string;
      title: string;
      created: string;
    };
  } catch (error) {}
}
export async function getPost(id: string) {
  // 获取该日期之后的一条数据
  try {
    const result = await sql`
    SELECT id,title,created FROM articles
    WHERE to_timestamp(created, 'YYYY/MM/DD HH24:MI:SS') > (SELECT to_timestamp(created, 'YYYY/MM/DD HH24:MI:SS') FROM articles WHERE id=${id})
    ORDER BY to_timestamp(created, 'YYYY/MM/DD HH24:MI:SS') ASC
    LIMIT 1;`;
    const { rows } = result;
    return rows[0] as {
      id: string;
      title: string;
      created: string;
    };
  } catch (error) {}
}

export async function getPostsByTag(name: string) {
  try {
    const result = await sql`
  SELECT * FROM articles WHERE tags::text LIKE ${'%' + name + '%'};
  `;
    const { rows } = result;
    return rows as Blog.Posts;
  } catch (error) {}
}

export async function getPostsByCategory(name: string) {
  try {
    const result = await sql`
  SELECT * FROM articles WHERE categories::text LIKE ${'%' + name + '%'};
  `;
    const { rows } = result;
    return rows as Blog.Posts;
  } catch (error) {}
}

export async function getCategories() {
  try {
    const result = await sql`
    SELECT CATEGORIES FROM articles
    ;
  `;
    const { rows } = result;
    return rows as [{ categories: string }];
  } catch (error) {}
}

export async function getTags() {
  try {
    const result = await sql`
    SELECT TAGS FROM articles
    ;
  `;
    const { rows } = result;
    return rows as [{ tags: string }];
  } catch (error) {}
}

export async function getArchives() {
  const result = await sql`
  SELECT id,title,cover,public,filecount,categories,tags,to_timestamp(created, 'YYYY/MM/DD HH24:MI:SS') as created,updated
    FROM articles
    ORDER BY to_timestamp(created, 'YYYY/MM/DD HH24:MI:SS') DESC;
  `;
  const { rows } = result;
  return rows as Blog.Posts;
}
