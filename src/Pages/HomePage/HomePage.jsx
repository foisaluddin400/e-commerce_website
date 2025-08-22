import React from "react";
import Hero from "../../components/home/Hero";
import Apparel from "../../components/home/Apparel";
import AccessoryGift from "../../components/home/AccessoryGift";
import Testomonial from "../../components/home/Testomonial";
import Banner from "../../components/home/Banner";

export const HomePage = () => {
  return (
    <div>
      <div className="container mx-auto px-4 lg:px-0">
        <Hero></Hero>
        <Apparel></Apparel>
        <AccessoryGift></AccessoryGift>
        <Apparel></Apparel>
        <Apparel></Apparel>
        <Banner></Banner>
        <Testomonial></Testomonial>
      </div>
    </div>
  );
};
