import { Image } from "@prisma/client";
import sorts from "../libs/sorts";
import _ from "lodash";

const imagePick = (image: Image) => {
  const picked = _.pick(image, [
    "id",
    "shortId",
    "caption",
    "altText",
    "content",
    "type",
    "position",
    "productId",
    "storeId",
  ]);

  return picked;
};

const images = (images: Image[]) => {
  const data = images.map(imagePick).sort(sorts.zeroLastSortPosition);

  return {
    primary: data.length ? data[0] : null,
    items: data,
  };
};

export default {
  images,
};
