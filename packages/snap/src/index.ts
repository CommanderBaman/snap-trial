import { OnRpcRequestHandler } from '@metamask/snap-types';

/**
 * Get a message from the origin. For demonstration purposes only.
 *
 * @param originString - The origin string.
 * @returns A message based on the origin.
 */
export const getMessage = (originString: string): string =>
  `Hello, ${originString}!`;

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns `null` if the request succeeded.
 * @throws If the request method is not valid for this snap.
 * @throws If the `snap_confirm` call failed.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  console.log('com');
  switch (request.method) {
    case 'hello':
      console.log('hey');
      await wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'prompt',
            description: 'Description.',
            textAreaContent: 'Do we need to reload!',
          },
        ],
      });
      return 1;
    case 'privatekey44':
      console.log('here');
      return wallet.request({
        method: 'snap_getBip44Entropy',
        params: {
          coinType: 60,
        },
      });
    case 'privatekey32':
      console.log('here');
      return wallet.request({
        method: 'snap_getBip32Entropy',
        params: {
          path: ['m', "44'", "60'", "2'", '0', '0'],
          curve: 'secp256k1',
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
