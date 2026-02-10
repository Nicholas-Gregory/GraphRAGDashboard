import React, { useEffect, useState } from 'react';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import { User } from '../../../../packages/schemas/user';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Link, Outlet, useLocation } from '@tanstack/react-router';
import { trpc, trpcUtils } from '../utils/trpc';
import { useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => {
    const pathSegment = useLocation({ select: (location: any) => location.pathname.split('/')[1] }) as unknown as string;
    const tabMap: Record<string, number> = { 'home': 0, 'app': 1, 'logout': 2, 'auth': 1 };
    const [selectedTab, setSelectedTab] = useState(tabMap[pathSegment] ?? 0);
    const me = trpc.me.useMutation();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      setSelectedTab(tabMap[pathSegment] ?? 0);
      me.mutate();
    }, [pathSegment]);

    useEffect(() => {
      setUser(me.data?.user ?? null);
    }, [me]);

    const onTabChange = (index: number) => {
      if (index === 0) navigate({ to: '/home' });

      if (user) {
        if (index === 1) navigate({ to: '/app' });
        if (index === 2) navigate({ to: '/logout' });
      } else {
        if (index === 1) navigate({ to: '/auth' });
      }
    }

    return (
      <div className="p-2 flex flex-col gap-5">
        <TabGroup 
          manual
          className="border-b border-b-black"
          onChange={onTabChange}
          selectedIndex={selectedTab} 
        >
          <TabList>
            <div className="flex flex-row gap-2">
              <Link to='/home'>
                <Tab className="data-selected:bg-blue-500">Home</Tab>
              </Link>
              {user ? (
                <>
                  <Tab className="data-selected:bg-blue-500">App</Tab>
                  <Tab className="data-selected:bg-blue-500">Logout</Tab>
                </>
              ) : (
                <Link to='/auth'>
                  <Tab className="data-selected:bg-blue-500">
                    Login/Signup
                  </Tab>
                </Link>
              )}
            </div>
          </TabList>
        </TabGroup>

        <Outlet />
        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    );
  }
});