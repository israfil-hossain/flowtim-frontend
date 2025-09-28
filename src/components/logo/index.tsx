
import { Link } from "react-router-dom";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link to={url}>
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <img src="/images/short-logo.png" alt="logo" width={40} height={40} />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
