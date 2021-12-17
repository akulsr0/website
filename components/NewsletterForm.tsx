import { NextPage } from "next";
import * as React from "react";

const NewsLetterForm: NextPage = () => {
  return (
    <form
      className="subscribe-form"
      action="https://tinyletter.com/akulsr0"
      method="post"
      target="popupwindow"
      onSubmit={() => {
        window.open(
          "https://tinyletter.com/akulsr0",
          "popupwindow",
          "scrollbars=yes,width=800,height=600"
        );
        return true;
      }}
    >
      <p>
        <label htmlFor="tlemail">Subscribe to our Newsletter</label>
      </p>
      <div>
        <input type="text" name="email" id="tlemail" placeholder="Email" />
        <input type="hidden" value="1" name="embed" />
        <input type="submit" value="Subscribe" />
      </div>
    </form>
  );
};

export default NewsLetterForm;
