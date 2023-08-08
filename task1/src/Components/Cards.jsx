import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase";

const Cards = ({ el }) => {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  const toast = useToast();

  const handleFav = async (el) => {
    fetch("https://glossy-nifty-market.glitch.me/competishunUsers")
      .then((response) => response.json())
      .then((users) => {
        let data = users.find((u) => u.email === user.email);

        if (data) {
          let existsInFavorites = data.favorites.some(
            (fav) => JSON.stringify(fav) === JSON.stringify(el)
          );

          if (!existsInFavorites) {
            data.favorites.push(el);

            fetch(
              `${"https://glossy-nifty-market.glitch.me/competishunUsers"}/${
                data.id
              }`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            )
              .then((response) => response.json())
              .then((updatedUser) => {
                console.log("User updated:", updatedUser);
                toast({
                  title: "Added to your Favorites",
                  status: "success",
                  isClosable: true,
                  position: "top-right",
                });
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } else {
            toast({
              title: "Already Added to the Favorites",
              status: "info",
              isClosable: true,
              position: "top-right",
            });
          }
        }
      })
      .catch((error) => console.error("Error:", error));

  };

  const handleWatch = async (el) => {
    fetch("https://glossy-nifty-market.glitch.me/competishunUsers")
    .then((response) => response.json())
    .then((users) => {
      let data = users.find((u) => u.email === user.email);

      if (data) {
        let existsInWatchList = data.watchList.some(
          (watch) => JSON.stringify(watch) === JSON.stringify(el)
        );

        if (!existsInWatchList) {
          data.watchList.push(el);

          fetch(
            `${"https://glossy-nifty-market.glitch.me/competishunUsers"}/${
              data.id
            }`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          )
            .then((response) => response.json())
            .then((updatedUser) => {
              console.log("User updated:", updatedUser);
              toast({
                title: "Added to your WatchList",
                status: "success",
                isClosable: true,
                position: "top-right",
              });
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else {
          toast({
            title: "Already Added to the WatchList",
            status: "info",
            isClosable: true,
            position: "top-right",
          });
        }
      }
    })
    .catch((error) => console.error("Error:", error));
  };


  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      transition={"transform .2s"}
      _hover={{ transform: "scale(1.05)" }}
    >
      <Card maxW="sm">
        <CardBody>
          <Image
            src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            verticalAlign={"center"}
            onClick={() => navigate(`/singlepage/${el.id}`)}
          />
          <Stack mt="6" spacing="3" textAlign={"center"}>
            <Heading size="md">{el.original_title}</Heading>
            <Text fontSize={"20px"}>Release Date: {el.release_date}</Text>
          </Stack>
        </CardBody>
        <CardFooter
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <ButtonGroup spacing="5">
            <Button
              border={"1px solid grey"}
              bg="none"
              onClick={() => {
                handleFav(el);
              }}
            >
              Favourite
            </Button>
            <Button border={"1px solid grey"} bg="none" onClick={()=>{
                handleWatch(el)
            }}>
              WatchList
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default Cards;
