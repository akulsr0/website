interface GetPullRequestsOptions {
  org: string;
  repo: string;
  author?: string;
}

interface GetPullRequestReviewStatus {
  org: string;
  repo: string;
  prNumber: number;
}

export type { GetPullRequestsOptions, GetPullRequestReviewStatus };
