import { GetPullRequestsOptions } from "../interfaces/API";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

class APIService {
  constructor() {}

  private requestSync(
    url: string,
    options: Record<string, any>,
    cb: CallableFunction
  ) {
    fetch(url, options)
      .then((r) => r.json())
      .then((res) => cb(null, res))
      .catch((err) => cb(err, null));
  }

  getPullRequests(options: GetPullRequestsOptions, cb: CallableFunction) {
    const { org, repo, author = "akulsr0" } = options;
    const url = `https://api.github.com/search/issues?q=is:pr+repo:${org}/${repo}+author:${author}`;
    const _options = { method: "GET" };
    this.requestSync(url, _options, cb);
  }

  sendContactMessage(message: string, cb: CallableFunction) {
    this.requestSync(
      "/api/contact/",
      {
        method: "POST",
        headers: { ...DEFAULT_HEADERS },
        body: JSON.stringify({
          message,
          from: process.env.NEXT_PUBLIC_TWILIO_FROM,
          to: process.env.NEXT_PUBLIC_TWILIO_TO,
        }),
      },
      cb
    );
  }
}

export const api = new APIService();
