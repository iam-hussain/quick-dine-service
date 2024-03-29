const inputTransform = ({ body, params }: any) => {
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
};
export default inputTransform;
