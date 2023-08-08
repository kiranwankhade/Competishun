import {
    Box,
    Button,
    Heading,
    Image,
    Stack,
    Text,
    useToast,
    Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton, useBreakpointValue 
  } from "@chakra-ui/react";
  import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
  import Slider from 'react-slick'
  import React, { useEffect, useState } from "react";
  import { useAuthState } from "react-firebase-hooks/auth";
  import { useNavigate } from "react-router-dom";
  import { auth } from "../Firebase/firebase";
import StarRatings from "../Pages/StarRatings";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import hotel1 from "../Assets/hotel1.jpg"
import hotel2 from "../Assets/hotel2.jpg"
import hotel3 from "../Assets/hotel3.jpg"
import hotel4 from "../Assets/hotel4.jpg"
  
  const Cards = ({ el }) => {
    const [user, loading, error] = useAuthState(auth);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [slider, setSlider] = useState('');
    const top = useBreakpointValue({ base: '90%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '10px' })
  const cards = [
   el.image,hotel4,hotel1,hotel2,hotel3
  ]
    const toast = useToast();
  
    const handleBooking = async () => {
        toast({
            title: "Booking",
            description: "Your booking has been confirmed.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
    };

    // Settings for the slider
    const settings = {
        dots: true,
        arrows: false,
        fade: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
  
  
    return (
        <>
    <Box maxH={'sm'} key={el.id} maxW="sm" p={2} borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={onOpen}>
        <Heading fontSize={'lg'} mt="1" fontWeight="semibold"  lineHeight="tight">{el.name}</Heading>
        {/* <Image w={'100%'} h={'50%'} src={el.image} alt={el.name} /> */}
        <Box position={'relative'} height={'600px'} width={'full'} overflow={'hidden'}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}>
        <BiLeftArrowAlt />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}>
        <BiRightArrowAlt />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((url, index) => (
          <Box
            key={index}
            height={'xs'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${url})`}
          />
        ))}
      </Slider>
    </Box>
        <Box p="6">
            <Box d="flex" alignItems="baseline">
                <Text mt="2" color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">{el.city} &bull; {el.star} Star &bull; </Text>
            </Box>
            
            <Text><StarRatings value={el.ratings} /></Text>
            <Button mt={4} colorScheme="teal" variant="solid" onClick={handleBooking}>
                Book Now
            </Button>
        </Box>

    </Box>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hotel <span>{`${el.name}`}</span> Reviews</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {el.reviews.map((review, i) => (
                  <Box
                    key={i}
                    p={4}
                    color="white"
                    mt="4"
                    bg="teal.500"
                    rounded="md"
                    shadow="md"
                  >
                    {review}
                  </Box>
                ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    );
  };
  
  export default Cards;
  