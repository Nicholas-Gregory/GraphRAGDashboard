import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react';
import { Fieldset, Field, Input, Button, Switch } from '@headlessui/react';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <span>Login</span>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition"
        >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
      </Switch>
      <span>Signup</span>
      </div>

      <Fieldset className="flex flex-col gap-2 w-fit">
        <Field className="flex gap-2 justify-between">
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" className="border"/>
        </Field>
        <Field className="flex gap-2 justify-between">
          <label htmlFor="username">Username</label>
          <Input id="username" type="text" className="border" />
        </Field>
        <Field className="flex gap-2 justify-between">
          <label htmlFor="password">Password</label>
          <Input id="password" type="password" className="border" />
        </Field>

        {enabled && (
          <Field className="flex gap-2 justify-between">
            <label htmlFor="confirm-password">Confirm Password</label>
            <Input id="confirm-password" type="password" className="border" />
          </Field>
        )}

        <Button type="submit">{enabled ? 'Signup' : 'Login'}</Button>
      </Fieldset>
    </div>
  )
}
