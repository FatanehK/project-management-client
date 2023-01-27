import { Link } from "react-router-dom";

export const About: React.FC = () => {
  return (
    <div>
      <nav>
        <Link style={{ margin: 10 }} to="/">
          Home
        </Link>
        <Link style={{ margin: 10 }} to="/about">
          About
        </Link>
      </nav>
    </div>
  );
};
