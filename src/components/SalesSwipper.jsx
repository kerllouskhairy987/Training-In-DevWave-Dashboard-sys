"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { salesData } from "../data/data";

const SalesSwiper = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full sales-swiper max-w-[850px] bg-white rounded-xl shadow-md p-4">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={40}
          slidesPerView={1}
          loop
          className="w-full"
        >
          {salesData.map((chart) => (
            <SwiperSlide key={chart.id}>
              <h2 className="text-lg font-semibold mb-4">
                {chart.title}
              </h2>

              <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chart.timeline}>
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill="url(#colorGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F97316" stopOpacity={0.9} />
                        <stop offset="95%" stopColor="#FED7AA" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SalesSwiper;
