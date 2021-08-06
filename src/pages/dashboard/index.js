import { DashboardCardContainer } from '../../containers';
import { Table } from '../../components';
import { BarChart } from '../../helper';
import './style.css';

export default function Dashboard() {
  // here the const should be replaced by stae & hooks , as we get the data from backend.
  const dashboard_table_columns = [
    { name: 'Name', key: 'name' },
    { name: 'Shipping Company', key: 'shipping_Company' },
    {
      name: 'Status',
      key: 'status',
      tag: true,
      pending: { bgColor: '#FE5461', color: '#FFFFFF' },
      'out of delivery': { bgColor: '#FEC400', color: '#FFFFFF' },
      delivered: { bgColor: '#29CC97', color: '#FFFFFF' },
    },
    { name: 'EDD', key: 'edd' }];
  const data = [{
    name: 'abc', shipping_Company: 'fInfo', status: 'Pending', edd: '12-06-2020',
  }, {
    name: 'abc', shipping_Company: 'ckInfo', status: 'Out of delivery', edd: '12-06-2020',
  }, {
    name: 'abc', shipping_Company: 'ackInfo', status: 'Pending', edd: '12-06-2020',
  }, {
    name: 'abc', shipping_Company: 'fInfo', status: 'dElivered', edd: '12-06-2020',
  }, {
    name: 'abc', shipping_Company: 'fInfo', status: 'Pending', edd: '12-06-2020',
  }];
  return (
    <main className="container-fluid mt-5 pt-5 dashboard">
      <DashboardCardContainer />
      <div className="row gx-3 gy-3 justify-content-center mt-5 pb-4 p-2">
        <div className="col-md-7 col-lg-7 col-12 dashboard_table_container shadow">
          {/* <h2
            className="h2 fs-4 d-block mt-3 ms-2 dashboard-card-title mb-0"
          >
            Sales Tracker
          </h2> */}
          <Table columns={dashboard_table_columns} data={data} caption="Sales Tracker" />
        </div>
        <div className="col-md-4 col-lg-4 col-12 chart_container ms-md-5 ms-lg-5 shadow p-2">
          <h2
            className="h2 fs-4 d-block my-3 ms-2 dashboard-card-title"
          >
            Product Tracker
          </h2>
          <div className="pt-3" style={{ height: '82%' }}>
            <BarChart color="#fec400" />
          </div>
        </div>
      </div>
    </main>
  );
}
