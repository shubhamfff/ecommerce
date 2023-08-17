import React from "react";
import { Button, Form, Input, Switch } from "antd";
import { Radio } from "antd";

const CategoryForm = ({
  handleSubmit,
  homeValue,
  value,
  setValue,
  showOnHome,
}) => {
  return (
    <>
      <Form
        name="categoryForm"
        size="large"
        layout="vertical"
        onFinish={handleSubmit}
        style={{ width: "90%", marginLeft: 15 }}
      >
        <Form.Item
          name="Username"
          label="Category Name"
          rules={[
            {
              required: true,
              message: "Username is required.",
            },
          ]}
        >
          <Input onChange={(e) => setValue(e.target.value)} value={value} />
        </Form.Item>
        <Form.Item
          name="onHomepage"
          label="Show on homepage"
          rules={[
            {
              required: true,
              message: "Show on Homepage is required.",
            },
          ]}
        >
          <Radio.Group
            onChange={(e) => showOnHome(e.target.value)}
            value={homeValue}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Button htmlType="submit">Submit</Button>
      </Form>
    </>
  );
};

export default CategoryForm;
