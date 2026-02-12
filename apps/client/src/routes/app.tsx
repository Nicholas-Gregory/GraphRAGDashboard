import { createFileRoute } from '@tanstack/react-router'
import React from 'react';
import { trpc } from '../utils/trpc';

export const Route = createFileRoute('/app')({
  component: RouteComponent,
})

function RouteComponent() {
  const [text, setText] = React.useState('');
  const write = trpc.writeFullText.useMutation();

  React.useEffect(() => {
    if (write.isSuccess) {
      console.log(write.data);
    }
  }, [write.isSuccess]);

  const handleSubmit = () => {
    console.log(text)
    write.mutate({ content: text });
  };

  return (
    <>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}
