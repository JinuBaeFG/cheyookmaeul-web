import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

type PageTitleProps = {
  title: string;
};

function PageTitle({ title }: PageTitleProps) {
  return (
    <Helmet>
      <title>{title} | 플레이인어스 PlayInUs</title>
    </Helmet>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
