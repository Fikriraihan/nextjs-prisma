import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  id?: number;
  title: string;
  price?: string;
  img: string;
  overlay?: boolean;
  description?: string;
  isAvailable?: boolean;
  url?: string;
  linkURL?: string;
}

const ProductCard = (props: ProductCardProps) => {
  const { linkURL, overlay, id, img, price, title, description, isAvailable } = props;

  if (isAvailable === false) {
    return (
      <Card isFooterBlurred className="w-full h-[500px] col-span-12 sm:col-span-5">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">New</p>
          <h4 className="text-white font-medium text-2xl">{title}</h4>
        </CardHeader>
        <Image removeWrapper alt="Card example background" className="z-0 w-full h-full scale-125 -translate-y-6 object-cover" src={img} />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-tiny">Available soon.</p>
            <p className="text-black text-tiny">Get notified.</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Notify Me
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (overlay) {
    return (
      <Card className="col-span-12 sm:col-span-5 h-[500px] border shadow dark:border-primary">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">{title}</p>
          <h4 className="text-white font-medium text-large">{description}</h4>
        </CardHeader>
        <Image removeWrapper alt="Card background" className="z-0 w-full h-full object-cover" src={img} />
      </Card>
    );
  }

  return (
    <Card className="bg-[#18181B] min-w-60 dark:border border-[#6D36FE] !h-[320px] overflow-hidden" shadow="sm" key={id} isPressable onPress={() => console.log("item pressed")}>
      <CardBody className="overflow-visible p-0 !h-[300px]">
        <Image radius="md" width="100%" alt={title} className="w-full object-cover h-[240px]" src={img} />
      </CardBody>
      <CardFooter className="mt-6 text-small justify-between">
        <div className="flex flex-col gap-2 text-left">
          <b className="">{title}</b>
          <p className="">{`Price: $${price}`}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Button as={Link} href={linkURL} color="primary" className="w-30 h-8">
            Click for detail
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
