"use client";

import * as React from "react";
import { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import {
  Container,
  Box,
  Stack,
  HStack,
  ButtonGroup,
  Button,
  Icon,
  Heading,
  Text,
  Wrap,
  Tag,
  useClipboard,
  IconButton,
  VStack,
  Flex,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { FallInPlace } from "components/motion/fall-in-place";
import { Hero } from "components/hero";
import { Link, Br } from "@saas-ui/react";
import { Em } from "components/typography";
import {
  FiArrowRight,
  FiCheck,
  FiCopy,
  FiSmile,
  FiSliders,
  FiGrid,
  FiThumbsUp,
  FiCode,
  FiTerminal,
  FiToggleLeft,
  FiTrendingUp,
  FiFlag,
  FiUserPlus,
  FiSearch,
  FiLock,
  FiBox,
} from "react-icons/fi";
import { Features } from "components/features";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { ButtonLink } from "components/button-link/button-link";
import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from "components/highlights";

const Home: NextPage = () => {
  return (
    <Box>
      <SEO
        title="Predicción de Enfermedades a partir de Radiografías de Tórax"
        description="Sube una imagen de radiografía de tórax para obtener predicciones de enfermedades"
      />
      <Box>
        <HeroSection />

        <UploadSection />

        <HighlightsSection />
      </Box>
    </Box>
  );
};

const HeroSection: React.FC = () => {
  return (
    <Box id="home" position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: "column", lg: "row" }} alignItems="center">
          <Hero
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                Radiografía de Tórax
                <Br /> Predicción de Enfermedades
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                Sube una imagen de radiografía de tórax y obtén predicciones de
                enfermedades usando nuestro modelo de IA.
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <HStack pt="4" pb="12" spacing="8"></HStack>

              <ButtonGroup spacing={4} alignItems="center">
                <ButtonLink colorScheme="primary" size="lg" href="#upload_">
                  Upload Image
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  href="https://github.com/imbrahiam/chest-x-ray"
                  variant="outline"
                  target="_blank"
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
                  Source Code
                </ButtonLink>
              </ButtonGroup>
            </FallInPlace>
          </Hero>
        </Stack>
      </Container>
      <Features
        id="upload_"
        columns={[1, 2, 4]}
        iconSize={4}
        innerWidth="container.xl"
        pt="20"
        features={[
          {
            title: "Preciso",
            icon: FiSmile,
            description:
              "Obtén predicciones precisas para varias enfermedades de tórax.",
            iconPosition: "left",
            delay: 0.6,
          },
          {
            title: "Rápido",
            icon: FiSliders,
            description: "Recibe predicciones en segundos.",
            iconPosition: "left",
            delay: 0.8,
          },
          {
            title: "Confiable",
            icon: FiGrid,
            description:
              "Construido sobre un robusto modelo de IA entrenado con un vasto conjunto de datos.",
            iconPosition: "left",
            delay: 1,
          },
          {
            title: "Fácil de Usar",
            icon: FiThumbsUp,
            description:
              "Interfaz simple para subir imágenes y obtener resultados.",
            iconPosition: "left",
            delay: 1.1,
          },
        ]}
        reveal={FallInPlace}
      />
    </Box>
  );
};

const all_labels = [
  "Cardiomegaly",
  "Emphysema",
  "Effusion",
  "Hernia",
  "Infiltration",
  "Mass",
  "Nodule",
  "Atelectasis",
  "Pneumothorax",
  "Pleural_Thickening",
  "Pneumonia",
  "Fibrosis",
  "Edema",
  "Consolidation",
  "No Finding",
];

const spanishLabels = {
  Cardiomegaly: "Cardiomegalia",
  Emphysema: "Enfisema",
  Effusion: "Derrame",
  Hernia: "Hernia",
  Infiltration: "Infiltración",
  Mass: "Masa",
  Nodule: "Nódulo",
  Atelectasis: "Atelectasia",
  Pneumothorax: "Neumotórax",
  Pleural_Thickening: "Engrosamiento Pleural",
  Pneumonia: "Neumonía",
  Fibrosis: "Fibrosis",
  Edema: "Edema",
  Consolidation: "Consolidación",
  "No Finding": "Sin Hallazgos",
};

const formatDiseaseName = (disease: string) => {
  return disease.replace(/_/g, " ");
};

const translateDiseaseName = (disease: string, language: string) => {
  if (language === "es") {
    return spanishLabels[disease] || formatDiseaseName(disease);
  }
  return formatDiseaseName(disease);
};

const UploadSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [predictions, setPredictions] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:5000/predict", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Prediction server response error");
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setPredictions(data.predictions);
      } catch (error: any) {
        setPredictions(null);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const sortedPredictions = predictions
    ? Object.entries(predictions)
        .map(([disease, value]) => ({ disease, value }))
        .sort((a: any, b: any) => parseFloat(b.value) - parseFloat(a.value))
    : [];

  const language = "es"; // Set your language preference here

  return (
    <Container maxW="container.md" py="12" id="upload">
      <Stack spacing="6" textAlign="center">
        <Heading>Upload Chest X-ray Image</Heading>
        <Button
          as="label"
          htmlFor="upload-input"
          colorScheme="primary"
          size="md"
          cursor="pointer"
          borderRadius="md"
          p={4}
          w="200px"
          bgGradient="linear(to-r, purple.400, purple.600)"
          _hover={{ bgGradient: "linear(to-r, purple.500, purple.700)" }}
          mx="auto"
        >
          Select Image
          <Input
            id="upload-input"
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </Button>
        {selectedImage && (
          <Box mt={4} mx="auto">
            <Image
              src={selectedImage}
              alt="Selected Image"
              width={300}
              height={300}
              objectFit="cover"
              style={{ borderRadius: "10px" }}
            />
          </Box>
        )}
        {loading && (
          <Box mx="auto" textAlign="center">
            <Spinner size="xl" mt={4} />
          </Box>
        )}
        {error && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {predictions && (
          <Table variant="simple" mt={4} mx="auto">
            <Thead>
              <Tr>
                <Th>Enfermedad</Th>
                <Th>Predicción</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedPredictions.map((prediction: any, index) => (
                <Tr key={index}>
                  <Td>{translateDiseaseName(prediction.disease, language)}</Td>
                  <Td>{prediction.value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Stack>
    </Container>
  );
};

const HighlightsSection = () => {
  const { value, onCopy, hasCopied } = useClipboard(
    "Believe in the power of AI to transform healthcare!"
  );

  return (
    <Highlights id="highlights">
      <HighlightsItem colSpan={[1, null, 2]} title="Innovative AI Solution">
        <VStack alignItems="flex-start" spacing="8">
          <Text color="muted" fontSize="xl">
            Nuestro proyecto final para el Samsung Innovation Campus es una
            solución de IA de vanguardia que{" "}
            <Em>analiza imágenes de radiografías de tórax</Em> para predecir la
            presencia de varias enfermedades. Este proyecto muestra nuestra
            capacidad para integrar el aprendizaje automático con tecnologías
            modernas de desarrollo web.
          </Text>

          <Flex
            rounded="full"
            borderWidth="1px"
            flexDirection="row"
            alignItems="center"
            py="1"
            ps="8"
            pe="2"
            bg="primary.900"
            _dark={{ bg: "gray.900" }}
          >
            <Box>
              <Text color="yellow.400" display="inline">
                "¡Cree en el poder de la IA
              </Text>{" "}
              <Text color="cyan.300" display="inline">
                para transformar la atención médica!"
              </Text>
            </Box>
            <IconButton
              icon={hasCopied ? <FiCheck /> : <FiCopy />}
              aria-label="Copiar frase motivacional"
              onClick={onCopy}
              variant="ghost"
              ms="4"
              isRound
              color="white"
            />
          </Flex>
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Sólidas Bases en la Atención Médica">
        <Text color="muted" fontSize="lg">
          Nuestro proyecto está construido sobre sólidas bases de imágenes
          médicas y aprendizaje automático. Utilizamos herramientas y
          bibliotecas establecidas para asegurar que nuestra solución sea
          confiable y efectiva en un entorno de atención médica.
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Helix Team"
        description="Founders"
        avatar="/static/images/avatar.jpg"
        gradient={["pink.200", "purple.500"]}
      >
        “Este proyecto ha demostrado el potencial de la IA en el diagnóstico
        médico. Ha sido una experiencia valiosa, permitiéndonos contribuir a los
        avances en tecnología de atención médica.”
      </HighlightsTestimonialItem>
      <HighlightsItem colSpan={[1, null, 2]} title="Características Completas">
        <Text color="muted" fontSize="lg">
          Nuestra solución abarca una amplia gama de características para
          proporcionar una herramienta completa y eficiente para los
          profesionales médicos.
        </Text>
        <Wrap mt="8">
          {[
            "predicción de enfermedades",
            "interfaz fácil de usar",
            "manejo seguro de datos",
            "procesamiento en tiempo real",
            "integración de IA",
          ].map((value) => (
            <Tag
              key={value}
              variant="subtle"
              colorScheme="purple"
              rounded="full"
              px="3"
            >
              {value}
            </Tag>
          ))}
        </Wrap>
      </HighlightsItem>
    </Highlights>
  );
};

export default Home;

export async function getStaticProps() {
  return {
    props: {
      announcement: {
        title: "Samsung Innovation Campus! 👨‍⚕️👩‍⚕️",
        description:
          '<img src="https://img.shields.io/github/stars/saas-js/saas-ui.svg?style=social&label=Helix"/>',
        href: "https://github.com/imbrahiam/chest-x-ray",
        target: "_blank",
        action: false,
      },
    },
  };
}
