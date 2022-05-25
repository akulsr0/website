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
