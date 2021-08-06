import { Features, Pricing } from '../../containers';
import { Carousels } from '../../components';

const LandingPage = () => (
  <>
    <Carousels />
    <main className="main-container">
      {/* <Navbar /> */}
      <Features />
      <Pricing />
      {/* <Footer /> */}
    </main>
  </>
);

export default LandingPage;
