import { HeartOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Divider, Row } from "antd";
import { useNavigate } from "react-router-dom";
import "./productCard.css";

const { Meta } = Card;

const ProductCards = ({ prodArr, categoryName }) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <>
      <div className="container">
        {categoryName ? (
          <Divider orientation="left">{categoryName}</Divider>
        ) : (
          ""
        )}

        <div className="row">
          {prodArr.slice(0, 4).map((product) => {
            return (
              <>
                <div className="col-3">
                  <Card
                    style={{
                      width: "100%",
                      margin: 20,
                    }}
                    title={product.name}
                    extra={<HeartOutlined style={{ fontSize: "150%" }} />}
                    cover={
                      <img
                        alt="example"
                        className="card-img-style"
                        src={`${
                          import.meta.env.VITE_APP_API
                        }/api/v1/product/product-photo/${product._id}`}
                      />
                    }
                    actions={[
                      <div
                        className="font-color"
                        onClick={() => handleProductClick(product)}
                      >
                        View Product
                      </div>,
                      <div
                        className="font-color"
                        onClick={() => handleProductClick(product)}
                      >
                        Share
                      </div>,
                    ]}
                  >
                    <Meta
                      title={product.description}
                      description={`₹${product.price}`}
                    />
                  </Card>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default ProductCards;
