import React from "react";

const ErrorPage = ({ status, msg}) => {
  return (
    <section className="ErrorPage">
      <h3>Sorry!</h3>
      <p>
        An error has occurred with status {status}: {msg}
      </p>
    </section>
  );
};

export default ErrorPage;