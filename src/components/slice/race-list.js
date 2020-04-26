import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const Race = ({
  race_title,
  race_location,
  race_link,
  race_date,
  distance
}) => (
  <a href={race_link.url} target={race_link.target}>
    <div className="py-4 flex items-center">
      <div className="pr-3">
        <p className="chunkyLabel text-2xl">{moment(race_date).format("DD")}</p>
        <p className="chunkyLabel">{moment(race_date).format("MMM")}</p>
      </div>
      <div>
        <h4 className="chunkyLabel text-2xl">
          {race_title} / <span className="text-gray-500">{distance}</span>
        </h4>
        <p>{race_location}</p>
      </div>
    </div>
  </a>
);

Race.propTypes = {
  race_title: PropTypes.string.isRequired,
  race_location: PropTypes.string.isRequired,
  race_link: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired,
  race_date: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired
};

const RaceListSlice = ({ items }) => (
  <ul className="max-w-3xl mx-auto">
    {items.map((item, index) => (
      <li key={index}>
        <Race {...item} />
      </li>
    ))}
  </ul>
);

export default RaceListSlice;

RaceListSlice.propTypes = {
  items: PropTypes.object.isRequired
};
