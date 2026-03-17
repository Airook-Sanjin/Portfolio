import PropTypes from "prop-types";

export default function ProfileGreetings({
  useDate,
  ...props
}) {
  
  const { date, time, wish } = useDate();

  return (
    <div className="greetings-container">
      <h1>
        {wish}
      </h1>

      <div>
        <h3>
          {date}
          <br />
          {time}
        </h3>
      </div>
    </div>
  );
};
