import React from 'react';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import { User } from '../../../../packages/schemas/user';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';
import { trpc, trpcUtils } from '../utils/trpc';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(
      trpcUtils.getLoggedInUser.queryOptions()
    )
  },
  component: () => {
    const { data: user } = trpc.getLoggedInUser.useQuery();

    return (
      <TabGroup className="p-2">
        <TabList>
          <div className="flex flex-row gap-2">
            <Tab>Home</Tab>
            {user ? (
              <>
                <Tab>App</Tab>
                <Tab>Logout</Tab>
              </>
            ) : (
              <Tab>Login/Signup</Tab>
            )}
          </div>
        </TabList>
      </TabGroup>
    );
  }
});