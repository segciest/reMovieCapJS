import { Tabs } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const HeThongCumRapDetail = ({ cumRapChieu }) => {
  const navigate = useNavigate();
  return (
    <div className="heThongCumRapDetail">
      <div className="container">
        <Tabs
          tabPosition="left"
          style={{ height: "600px" }}
          items={cumRapChieu.map((cumRap, index) => {
            return {
              label: (
                <div key={index} className="text-left w-[250px]">
                  {/* hình ảnh */}
                  {/* <div className="w-16">
                    <img className="w-16" src={cumRap.hinhAnh} alt="" />
                  </div> */}
                  <div>
                    <h3 className="uppercase text-green-600 font-medium truncate">
                      {cumRap.tenCumRap}
                    </h3>
                    <p className="truncate text-xs text gray-400">
                      {cumRap.diaChi}
                    </p>
                  </div>
                </div>
              ),
              key: index,
              children: (
                <div className="overflow-y-scrol h-full">
                  {cumRap.lichChieuPhim.map((phim, index) => {
                    return (
                      <div key={index} className=" my-5 ml-5 w-20 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            navigate(`/detailBooking/${phim.maLichChieu}`);
                          }}
                        >
                          <div className="bg-red-500 text-white">
                            {phim.tenRap}
                          </div>
                          <div className="bg-yellow-200 text-blue-400">
                            {phim.thoiLuong}p
                          </div>
                          <div className="bg-orange-300">
                            {moment(phim.ngayChieuGioChieu).format("DD-MM-YY")}
                          </div>
                          <div className="bg-orange-300">
                            {moment(phim.ngayChieuGioChieu).format("h:mm")}
                          </div>
                          <div className="bg-violet-400 text-white">
                            {phim.giaVe}vnđ
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              ),
            };
          })}
        />
      </div>
    </div>
  );
};

export default HeThongCumRapDetail;
