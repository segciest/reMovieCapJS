import { Tabs } from "antd";
import HeThongCumRapDetail from "../../components/HeThongCumRapDetail/HeThongCumRapDetail";
const HeThongLichChieuDetail = ({ heThongRapChieuDetail }) => {
  return (
    <div className="heThongLichChieuDetail">
      <div className="container">
        {Array.isArray(heThongRapChieuDetail) ? (
          <Tabs
            tabPosition="left"
            items={heThongRapChieuDetail.map((rap) => {
              return {
                label: <img className="w-16" src={rap.logo} />,
                key: rap.maHeThongRap,
                children: <HeThongCumRapDetail cumRapChieu={rap.cumRapChieu} />,
              };
            })}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default HeThongLichChieuDetail;
