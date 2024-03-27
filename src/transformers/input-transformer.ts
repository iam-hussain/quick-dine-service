const inputTransform = ({ body, params }: any) => {
  if (body?.price) {
    body.price = Number(body.price);
  }

  if (body?.position) {
    body.position = Number(body.position);
  }

  if (body?.packing?.value) {
    body.packing.value = Number(body.packing?.value);
  }

  if (body?.delivery?.value) {
    body.delivery.value = Number(body.delivery?.value);
  }
  console.log({ body });
  if (body?.table && Array.isArray(body?.table) && body?.table.length) {
    body.table = body.table.map((e: { position: any }) => ({
      ...e,
      position: Number(e.position),
    }));
  }

  if (body?.tax && Array.isArray(body?.tax) && body?.tax.length) {
    body.tax = body.tax.map((e: { value: any; position: any }) => ({
      ...e,
      value: Number(e.value),
      position: Number(e.position),
    }));
  }

  if (
    body?.discounts &&
    Array.isArray(body?.discounts) &&
    body?.discounts.length
  ) {
    body.discounts = body.discounts.map((e: { value: any }) => ({
      ...e,
      value: Number(e.value),
    }));
  }
};
export default inputTransform;
