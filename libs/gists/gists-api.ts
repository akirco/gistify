import { gists } from './gists-service';

const prepareError = (err: Error): Error => {
  try {
    return new Error(
      (JSON.parse(err && err.message) || { message: 'unkown' }).message
    );
  } catch (_) {
    return err;
  }
};

const formatGist = (gist: unknown): Gists.Gist => {
  if (typeof gist != 'object') {
    return <Gists.Gist>{};
  }
  const g = <Gists.GistResponse>gist;
  return {
    createdAt: new Intl.DateTimeFormat('zh-CN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(g.created_at)),
    description: g.description,
    fileCount: Object.keys(g.files).length,
    files: g.files,
    id: g.id,
    name: g.description || Object.keys(g.files)[0],
    public: g.public,
    updatedAt: new Intl.DateTimeFormat('zh-CN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(g.updated_at)),
    url: g.html_url,
  };
};

const formatGists = (gistList: Gists.GistsResponse): Gists.Gist[] =>
  gistList.map(formatGist);

const getGist = async (id: string): Promise<Gists.Gist> => {
  try {
    const results = await gists.get({ gist_id: id });

    return formatGist(results.data);
  } catch (err) {
    throw prepareError(err as Error);
  }
};

/**
 * Get a list of gists
 */
const getGists = async (
  starred = false,
  sinceDate?: string
): Promise<Gists.Gist[]> => {
  try {
    const results = await gists[starred ? 'listStarred' : 'list']({
      since: sinceDate,
    });

    // TODO: Octokit type definitions need updating.
    return formatGists(results.data as any);
  } catch (err) {
    throw prepareError(err as Error);
  }
};

const updateGist = async (
  id: string,
  filename: string,
  content: string | null
): Promise<Gists.Gist> => {
  try {
    if (!content) {
      content = ' ';
    }
    const results = await gists.update({
      files: { [filename]: { content } },
      gist_id: id,
    });

    return formatGist(results.data);
  } catch (err) {
    throw prepareError(err as Error);
  }
};

const createGist = async (
  files: { [x: string]: { content: string } },
  description?: string,
  isPublic = true
): Promise<Gists.Gist> => {
  try {
    const results = await gists.create({
      description,
      files,
      public: isPublic,
    });

    return formatGist(results.data);
  } catch (err) {
    throw prepareError(err as Error);
  }
};

const deleteGist = async (id: string): Promise<void> => {
  try {
    await gists.delete({ gist_id: id });
  } catch (err) {
    throw prepareError(err as Error);
  }
};

const deleteFile = async (id: string, filename: string): Promise<void> => {
  try {
    await gists.update({
      files: { [filename]: { content: '' } },
      gist_id: id,
    });
  } catch (err) {
    throw prepareError(err as Error);
  }
};

const getComments = async (id: string) => {
  try {
    const { data } = await gists.getComments({
      gist_id: id,
    });
    return data;
  } catch (err) {
    throw prepareError(err as Error);
  }
};

const createComments = async (id: string, content: string) => {
  try {
    const { data } = await gists.createComments({
      gist_id: id,
      body: content,
    });
    return data;
  } catch (err) {
    throw prepareError(err as Error);
  }
};

export {
  createGist,
  deleteFile,
  deleteGist,
  getGist,
  getGists,
  updateGist,
  getComments,
  createComments,
};
