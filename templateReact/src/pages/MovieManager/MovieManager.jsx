import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { useFormik } from "formik";
import { quanLyPhimServ } from "../../services/quanLyPhimServ";
import { useNavigate } from "react-router-dom";
import { path } from "../../common/path";
import { saveLocalStorage } from "../../utils/util";
const MovieManager = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "MaPhim",
      dataIndex: "maPhim",
      key: "maPhim",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hình ảnh",
      key: "hinhAnh",
      render: (record) => {
        return <img src={record.hinhAnh} className="w-16 " alt="" />;
      },
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => {
              console.log(record);
              quanLyPhimServ
                .xoaPhim(record.maPhim)
                .then((res) => {
                  console.log(res);
                  alert("Xoá thành công");
                })
                .catch((err) => {
                  console.log(err);
                  alert("Xoá thất bại");
                });
            }}
          >
            <DeleteOutlined />
          </button>
          {/* Button trigger modal */}

          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              // navigate(path.admin.editMovie);
              navigate(path.admin.editMovie);
              saveLocalStorage("idEdit", record.maPhim);
              window.location.reload();
            }}
          >
            <EditOutlined />
          </button>
          <button
            className="btn btn-success"
            type="button"
            onClick={() => {
              // navigate(path.admin.editMovie);
              navigate(path.admin.timelineset);
              saveLocalStorage("idEdit", record.maPhim);
              saveLocalStorage("nameEdit", record.tenPhim);
              window.location.reload();
            }}
          >
            <EditOutlined />
          </button>
        </Space>
      ),
    },
  ];

  // state chứa dữ liệu
  let [data, setData] = useState([]);

  useEffect(() => {
    quanLyPhimServ
      .layDanhSachPhim()
      .then((res) => {
        console.log(res);
        setData(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default MovieManager;
