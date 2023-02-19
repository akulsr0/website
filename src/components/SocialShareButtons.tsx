import {
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareButtons = (props: { url: string }) => {
  const { url } = props;

  return (
    <div className="socialShareButtonsWrapper">
      <TwitterShareButton url={url}>
        <TwitterIcon size={28} borderRadius={8} />
      </TwitterShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={28} borderRadius={8} />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtons;
