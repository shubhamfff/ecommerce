import React, { useEffect, useState } from "react";
import AdBanner from "../assets/Ad-banners/ad-banner1.png";

const AdvertiseBanner = ({ media }) => {
  return (
    <div>
      <img
        src={`${import.meta.env.VITE_STRAPI_API}${media.url}`}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default AdvertiseBanner;
