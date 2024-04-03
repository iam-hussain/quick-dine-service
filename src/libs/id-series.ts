import flatCache from "flat-cache";
import dateTime from "./date-time";

const cache = flatCache.load("orderId");

const getPadded = (value: number) => {
  return value.toString().padStart(4, "0");
};

const generateOrderId = async (storeSlug: string) => {
  const cached = cache.getKey(storeSlug);
  const current = dateTime.getIDFormatDate();
  if (!cached) {
    const { count, date } = cached;
    if (current === date) {
      cache.setKey(storeSlug, { count: count + 1, date });
      return `${date}-${getPadded(count + 1)}`;
    } else {
      cache.setKey(storeSlug, { count: 1, date: current });
      return `${date}-${getPadded(count + 1)}`;
    }
  } else {
    console.log("I am fetching");
    const count = await database.order.count({
      where: {
        createdAt: {
          gte: dateTime.getTodayStart(),
          lte: dateTime.getTodayEnd(),
        },
        store: {
          slug: storeSlug,
        },
      },
    });

    cache.setKey(storeSlug, { count: count + 1, date: current });
    return `${current}-${getPadded(count + 1)}`;
  }
};

export default {
  generateOrderId,
};
