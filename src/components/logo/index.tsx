
import { Link } from "react-router-dom";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link to={url}>
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <img src="/images/short-logo.png" alt="logo" width={48} height={48} />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
