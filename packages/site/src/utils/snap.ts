import { GetSnapsResponse, Snap } from '../types';

import { defaultSnapOrigin } from '../config';

/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (): Promise<GetSnapsResponse> => {
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
};

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  console.log({
    msg: 'in connect snap',
    value: {
      method: 'wallet_enable',
      params: [
        {
          wallet_snap: {
            [snapId]: {
              ...params,
            },
          },
        },
      ],
    },
  });

  const result = await window.ethereum.request({
    method: 'wallet_enable',
    params: [
      {
        wallet_snap: {
          [snapId]: {
            ...params,
          },
        },
      },
    ],
  });
  console.log({ msg: 'out of connect snap', result });
};

/**
 * Install a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to install.
 */
export const installSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  console.log({
    msg: 'in install snap',
    value: {
      method: 'wallet_installSnaps',
      params: [
        {
          wallet_snap: {
            [snapId]: {
              ...params,
            },
          },
        },
      ],
    },
  });

  const result = await window.ethereum.request({
    method: 'wallet_enable',
    params: [
      {
        wallet_snap: {
          [snapId]: {
            ...params,
          },
        },
      },
    ],
  });
  console.log({ msg: 'out of connect snap', result });
};
// const result = await ethereum.request({
//   method: 'wallet_installSnaps',
//   params: [
//     {
//       'npm:@metamask/example-snap': {},
//       'npm:fooSnap': {
//         // The optional version argument allows requesting a SemVer version
//         // range, with the same semantics as npm package.json ranges.
//         version: '^1.0.2',
//       },
//     },
//   ],
// });

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();
    console.log({ msg: 'in get snap', snaps });
    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

/**
 * Invoke the "hello" method from the example snap.
 */

export const sendHello = async () => {
  console.log({
    processOrigin: process.env.REACT_APP_SNAP_ORIGIN,
    defaultOrigin: defaultSnapOrigin,
  });
  console.log({ var: process.env });
  const resp32 = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
      defaultSnapOrigin,
      {
        method: 'privatekey32',
      },
    ],
  });
  console.log({ resp32 });
  const resp44 = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
      defaultSnapOrigin,
      {
        method: 'privatekey44',
      },
    ],
  });
  console.log({ resp44 });
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
