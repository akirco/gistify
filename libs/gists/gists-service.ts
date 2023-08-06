import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';

class GistsService {
  public static getInstance = (): GistsService =>
    GistsService.instance ? GistsService.instance : new GistsService();

  private static readonly instance?: GistsService;

  private octokit: Octokit;

  private constructor() {
    this.octokit = new Octokit({
      auth: process.env['GITHUB_ACCESS_TOKEN'],
      baseUrl: process.env['GITHUB_API_BASEURL'],
    });
  }

  // public login(params:RestEndpointMethodTypes)

  public create(
    params: RestEndpointMethodTypes['gists']['create']['parameters']
  ) {
    return this.octokit.gists.create(params);
  }

  public delete(
    params: RestEndpointMethodTypes['gists']['delete']['parameters']
  ) {
    return this.octokit.gists.delete(params);
  }

  public get(params: RestEndpointMethodTypes['gists']['get']['parameters']) {
    return this.octokit.gists.get(params);
  }

  public list(params?: RestEndpointMethodTypes['gists']['list']['parameters']) {
    return this.octokit.gists.list(params);
  }

  public listStarred(
    params?: RestEndpointMethodTypes['gists']['listStarred']['parameters']
  ) {
    return this.octokit.gists.listStarred(params);
  }

  public update(
    params: RestEndpointMethodTypes['gists']['update']['parameters']
  ) {
    return this.octokit.gists.update(params);
  }
  public getComments(
    params: RestEndpointMethodTypes['gists']['listComments']['parameters']
  ) {
    return this.octokit.gists.listComments(params);
  }
  public createComments(
    params: RestEndpointMethodTypes['gists']['createComment']['parameters']
  ) {
    return this.octokit.gists.createComment(params);
  }
  public updateComments(
    params: RestEndpointMethodTypes['gists']['updateComment']['parameters']
  ) {
    return this.octokit.gists.updateComment(params);
  }
  public deleteComments(
    params: RestEndpointMethodTypes['gists']['deleteComment']['parameters']
  ) {
    return this.octokit.gists.deleteComment(params);
  }
}

export const gists = GistsService.getInstance();
