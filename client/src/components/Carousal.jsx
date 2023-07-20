import { Carousel } from "antd";

const Carousal = ({ media }) => (
  <>
    <Carousel autoplay>
      {media.map((img) => {
        return (
          <div>
            <img
              src={`${import.meta.env.VITE_STRAPI_API}${img.attributes.url}`}
              style={{ width: "100%", height: "90vh" }}
            />
          </div>
        );
      })}
    </Carousel>
  </>
);
export default Carousal;
