import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import _ from "lodash";
import { auth } from "./firebase";

import { useDrag, useDrop } from "react-dnd";

import DataImages from "./DataImages";

const ImageCard = ({ src, title, id, tags, index, moveImage }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "image",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} className="card">
      <img src={src} alt={title} />
    </div>
  );
};

const Home = () => {
  const [ authUser, setAuthUser ] = useState(null);
  const [images, setImages] = React.useState(DataImages);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    })
    return () => {
      listen();
    }
  }, [])

  const moveImage = React.useCallback((dragIndex, hoverIndex) => {
    setIsLoading(true);
    setImages((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];

      clonedCards.splice(hoverIndex, 0, removedItem);
      return clonedCards;
    });
    setIsLoading(false);
  }, []);

  return (
    <main>
      { authUser && 
      <>
      <main>
        {
          isLoading ? (
            "Loading..."
          ) : 
          (React.Children.toArray(
            images.map((image, index) => (
              <ImageCard
                src={image.src}
                title={image.title}
                id={image.id}
                index={index}
                moveImage={moveImage}
              />
            ))
          ))
        }
    </main>
      </>
      }
    </main>
  );
};

export default Home;