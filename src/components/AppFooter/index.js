import { Typography } from "antd";
import React from "react";

const AppFooter = () => {
  return (
    <div className="AppFooter">
      <Typography.Link href="tel:00967738151341">Phone</Typography.Link>
      <Typography.Link href="https://google.com " target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://google.com " target={"_blank"}>
        Terms of Used
      </Typography.Link>
    </div>
  );
};

export default AppFooter;
