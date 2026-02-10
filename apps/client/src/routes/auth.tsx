import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react';
import { Fieldset, Field, Input, Button, Switch, Transition } from '@headlessui/react';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const usernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const confirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  const formSubmitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signup) {
      // Handle signup
    } else {
      if (password && (email || username)) {
        
      } else {

      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <span className="cursor-pointer" onClick={() => setSignup(false)}>Login</span>
        <Switch
          checked={signup}
          onChange={setSignup}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition"
        >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
      </Switch>
      <span className="cursor-pointer" onClick={() => setSignup(true)}>Signup</span>
      </div>

      <form onSubmit={formSubmitHandler}>
        <Fieldset className="flex flex-col gap-2 w-[40%]">
          <Field className="flex gap-2 justify-between">
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" className="border" value={email} onChange={emailChange} />
          </Field>
          <Field className="flex gap-2 justify-between">
            <label htmlFor="username">Username</label>
            <Input id="username" type="text" className="border" value={username} onChange={usernameChange} />
          </Field>
          <Field className="flex gap-2 justify-between">
            <label htmlFor="password">Password</label>
            <Input id="password" type="password" className="border" value={password} onChange={passwordChange} />
          </Field>

          <Transition
            show={signup}
            unmount={false}
            as="div"
            className="overflow-hidden"
            enter="transition-all duration-200"
            enterFrom="opacity-0 max-h-0"
            enterTo="opacity-100 max-h-40"
            leave="transition-all duration-200"
            leaveFrom="opacity-100 max-h-40"
            leaveTo="opacity-0 max-h-0"
          >
            <Field className="flex gap-2 justify-between py-1">
              <label htmlFor="confirm-password">Confirm Password</label>
              <Input id="confirm-password" type="password" className="border" value={confirmPassword} onChange={confirmPasswordChange} />
            </Field>
          </Transition>
          <Button type="submit">{signup ? 'Signup' : 'Login'}</Button>
        </Fieldset>
      </form>
    </div>
  )
}
