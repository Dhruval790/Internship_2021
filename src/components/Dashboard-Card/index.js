// ts-check
import DownTrend from '../DownTrend/DownTrend';
import UpTrend from '../UpTrend/UpTrend';
import LineChart from '../../helper/charts/LineChart';
import './style.css';
/**
 * DashboardCard,is being used by the dashboard-card-container. some of it's content depends on the last two values (values of last two purchase/sale/etc)
 * @param {object} value
 * @example
 * ```jsx
 * <DashboardCard  value={{value=[],title="something"}}/>
 * ```
 */
export default function DashboardCard(value) {
  const { data } = value.value;
  const isDown = data[data.length - 1] < data[data.length - 2];
  return (
    <div className="col-md-4 col-lg-4 col-12 my-sm-3 my-3">
      <div className="Main__Top__card shadow ">
        <div className="DashboardCard__TitleChart_Container">
          <div className="DashboardCard__Title d-flex">
            <h3 className="dashboard-card-title">{value.value.title}</h3>
            <h4
              className="d-lg-none d-md-none d-unset d-flex justify-content-between align-items-center"
              style={{ color: isDown ? '#fe5461' : '#29cc97', fontFamily: 'PoppinsMedium, sans-serif' }}
            >
              {isDown
                ? <DownTrend style={{ color: '#fe5461', fontSize: '24px' }} className="DashboardCard_graph_icon me-2" />
                : <UpTrend style={{ color: '#29cc97', fontSize: '24px' }} className="DashboardCard_graph_icon me-2" />}
              {value.value.value}
            </h4>
          </div>
          <div><LineChart data={data} labels={['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7']} axesDisplay={false} tension={0.3} /></div>
        </div>
        <div className="DashboardCard__Number_Container d-lg-flex d-md-flex d-sm-none d-none ">
          <div className="DashboardCard__Number_Container_inside">
            {isDown
              ? <DownTrend style={{ color: '#fe5461', fontSize: '24px' }} className="DashboardCard_graph_icon" />
              : <UpTrend style={{ color: '#29cc97', fontSize: '24px' }} className="DashboardCard_graph_icon" />}
            <h4 style={{ color: isDown ? '#fe5461' : '#29cc97', fontFamily: 'PoppinsMedium, sans-serif' }}>{value.value.value}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
