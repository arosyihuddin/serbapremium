import { Section } from 'components/section';
import { BackgroundGradient } from 'components/gradients/background-gradient';

const Dashboard = () => {
  return (
    <Section height="calc(100vh - 200px)" innerWidth="container.sm">
      <BackgroundGradient height="100%" zIndex="-1" />
    </Section>
    
  );
};

export default Dashboard;
