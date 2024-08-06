import * as React from "react";
import type { NextPage } from "next";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { Section } from 'components/section';

const Dashboard: NextPage = () => {
    
    return (
        <Section height="72vh" innerWidth="container.xl">
            <BackgroundGradient zIndex="-1" />

      </Section>
  );
};

export default Dashboard;