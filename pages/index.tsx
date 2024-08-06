import * as React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import {
  Container,
  Box,
  Stack,
  HStack,
  ButtonGroup,
  Icon,
  Heading,
  Text,
  Wrap,
  VStack,
} from "@chakra-ui/react";
import { SEO } from "components/seo/seo";

import { FallInPlace } from "components/motion/fall-in-place";
import { Hero } from "components/hero";
import { Br } from "@saas-ui/react";
import { Em } from "components/typography";
import {
  FiArrowRight,
  FiFlag,
  FiMousePointer,
  FiRefreshCcw
} from "react-icons/fi";
import { Features } from "components/features";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { Faq } from "components/faq";
import { Pricing } from "components/pricing/pricing";

import { ButtonLink } from "components/button-link/button-link";
import { Testimonial, Testimonials } from "components/testimonials";

import faq from "data/faq";
import testimonials from "data/testimonials";
import pricing from "data/pricing";
import { plasticEffectStyle } from "styles/serviceStyles";

import {
  Highlights,
  HighlightsItem,
} from "components/highlights";
import iconMap from "data/service";

const Home: NextPage = () => {
  return (
    <Box>
      <SEO
        title="Serba Premium"
        description="Siap Melayani Kebutuhan Anda"
      />
      <Box>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <ServiceSection />
      </Box>
    </Box>
  );
};

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: "column", lg: "row" }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                Segalanya Bisa Premium dengan
                <Br />Sharing Account
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                Serba Premium adalah layanan penyedia akun premium dengan sistem <Em>Berbagi Akun. </Em>
                Agar semua orang dapat merasakan aplikasi premium yang berbeda-beda.<Br />
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <HStack pt="4" pb="12" spacing="8">
              </HStack>

              <ButtonGroup spacing={4} alignItems="center">
                <ButtonLink colorScheme="primary" size="lg" href="/signup">
                  Sign Up
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  href="#pricing"
                  variant="outline"
                  rightIcon={
                    <Icon
                      as={FiArrowRight}
                      sx={{
                        transitionProperty: "common",
                        transitionDuration: "normal",
                        ".chakra-button:hover &": {
                          transform: "translate(5px)",
                        },
                      }}
                    />
                  }
                >
                  Pilih Paket
                </ButtonLink>
              </ButtonGroup>
            </FallInPlace>
          </Hero>
          <Box
            height="600px"
            position="absolute"
            display={{ base: "none", lg: "block" }}
            left={{ lg: "60%", xl: "55%" }}
            width="80vw"
            maxW="1100px"
            margin="0 auto"
          >
            <FallInPlace delay={1}>
              <Box overflow="hidden" height="100%">
                <Image
                  src="/static/screenshots/2.png"
                  layout="fixed"
                  width={1200}
                  height={762}
                  alt="Screenshot of a ListPage in Saas UI Pro"
                  quality="75"
                  priority
                />
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

const ServiceSection = () => {
  return (
    <Highlights>
      <HighlightsItem colSpan={[1, 3]}>
        <Box textAlign="center" mb={10} width="100%" display="flex" justifyContent="center">
          <Heading fontSize="35px">Supported Applications</Heading>
        </Box>
        <Wrap spacing="30px" justify="center">
          {Object.keys(iconMap).map((key) => (
            <VStack key={key} align="center">
              <Box sx={plasticEffectStyle}>
                <Image
                  src={iconMap[key]}
                  alt={key}
                  width={120}
                  height={120}
                />
              </Box>
              <Text mt={2} fontSize="sm">
                {key}
              </Text>
            </VStack>
          ))}
        </Wrap>
      </HighlightsItem>
    </Highlights>
  );
};

const FeaturesSection = () => {
  return (
    <Features
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={["2xl", null, "4xl"]}
          textAlign="center"
          as="p"
        >
          Explore Our Feature
        </Heading>
      }
      description={
        <>Ayo bergabung dengan kami untuk menciptakan pengalaman yang baru.</>
      }
      align="center"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: "One Click Extentions",
          icon: FiMousePointer,
          description:
            ": Anda dapat mengakses aplikasi premium dengan 1 kali klik.",
          variant: "inline",
        },
        {
          title: "99% Uptime",
          icon: FiRefreshCcw,
          description:
            ": Kami akan memperbarui setiap aplikasi yang sudah gagal login ke akun premium.",
          variant: "inline",
        },
        {
          title: "Report",
          icon: FiFlag,
          description:
            ": Anda dapat melaporkan kepada kami jika ada aplikasi yang tidak bekerja.",
          variant: "inline",
        },
      ]}
    />
  );
};

const TestimonialsSection = () => {
  const columns = React.useMemo(() => {
    return testimonials.items.reduce<Array<typeof testimonials.items>>(
      (columns, t, i) => {
        columns[i % 3].push(t);

        return columns;
      },
      [[], [], []]
    );
  }, []);

  return (
    <Testimonials
      title={testimonials.title}
      columns={[1, 2, 3]}
      innerWidth="container.xl"
    >
      <>
        {columns.map((column, i) => (
          <Stack key={i} spacing="8">
            {column.map((t, i) => (
              <Testimonial key={i} {...t} />
            ))}
          </Stack>
        ))}
      </>
    </Testimonials>
  );
};

const PricingSection = () => {
  return <Pricing {...pricing}/>;
};

const FaqSection = () => {
  return <Faq {...faq} />;
};

export default Home;

export async function getStaticProps() {
  return {
    props: {
      announcement: {
        title: "Dapatkan Potongan 5%",
        description:
          '<div></div>',
          // '<img src="https://img.shields.io/github/stars/saas-js/saas-ui.svg?style=social&label=Star" />',
        href: "#",
        action: false,
      },
    },
  };
}
