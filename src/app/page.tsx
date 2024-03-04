"use client";

import { useGetPostsQuery } from "./slices/postsSlice";
import { decrement, increment, incrementByAmount } from "./slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/react";

interface IPost {
  id: string;
  title: string;
  description: string;
}

export default function Home() {
  const { data } = useGetPostsQuery({});
  const value = useSelector((state: any) => state.counter);
  const dispatch = useDispatch();
  const valueInc = 2;

  return (
    <main className="flex flex-col items-center justify-between">
      <Button color="secondary">Hello world</Button>
      <div>
        {data?.map((post: IPost) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
      <div className="flex flex-col items-center border p-3">
        <div>
          <p>Value of counter: {value.counter}</p>
        </div>
        <div className="flex gap-3 p-3">
          <Button color="secondary" onClick={() => dispatch(incrementByAmount(valueInc))}>
            Increment by {valueInc}
          </Button>
          <Button color="secondary" onClick={() => dispatch(increment())}>
            Increment
          </Button>
          <Button color="secondary" onClick={() => dispatch(decrement())}>
            Decrement
          </Button>
        </div>
      </div>
    </main>
  );
}
