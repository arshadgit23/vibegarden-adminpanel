import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = ({ size = 20, styles }) => {
  return (
    <div>
      <Oval
        height={size}
        width={size}
        color="#1C5C2E"
        wrapperStyle={styles && styles}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </div>
  );
};

export default Loader;
