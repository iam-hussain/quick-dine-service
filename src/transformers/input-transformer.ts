const inputTransform = ({ body, params, query }: any) => {
  if (body?.price) {
    body.price = Number(body.price);
  }

  if (body?.position) {
    body.position = Number(body.position);
  }

  if (body?.tables && Array.isArray(body?.tables) && body?.tables.length) {
    body.tables = body.tables.map((e: { position: any }) => ({
      ...e,
      position: Number(e.position),
    }));
  }

  if (body?.taxes && Array.isArray(body?.taxes) && body?.taxes.length) {
    body.taxes = body.taxes.map((e: { value: any; position: any }) => ({
      ...e,
      value: Number(e.value),
      position: Number(e.position),
    }));
  }

  if (body?.fees && Array.isArray(body?.fees) && body?.fees.length) {
    body.fees = body.fees.map((e: { value: any; position: any }) => ({
      ...e,
      value: Number(e.value),
      position: Number(e.position),
    }));
  }

  if (query.today) {
    query.today = query.today === "true";
  }

  if (query.skip) {
    query.skip = Number(query.skip);
  }

  if (query.take) {
    query.take = Number(query.take);
  }
};
export default inputTransform;
