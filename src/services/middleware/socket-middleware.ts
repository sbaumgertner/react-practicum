import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getAccessToken, updateTokens } from '../../utils/tokens';

type WsActions<R, S> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
  sendMessage?: ActionCreatorWithPayload<S>;
}

export const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R, S>(
  wsActions: WsActions<R, S>,
  withTokenRefresh: boolean = false,
): Middleware<Record<string, never>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      onConnecting,
      onOpen,
      onClose,
      onError,
      onMessage,
      sendMessage
    } = wsActions;
    const { dispatch } = store;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return (next) => (action) => {
      if (connect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
        onConnecting && dispatch(onConnecting());
        isConnected = true;

        socket.onopen = () => {
          onOpen && dispatch(onOpen());
        }

        socket.onerror = () => {
          dispatch(onError('Error'));
        }

        socket.onclose = () => {
          onClose && dispatch(onClose());

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        }

        socket.onmessage = (event) => {
          const { data } = event;

          try {
            const parsedData = JSON.parse(data);

            if (withTokenRefresh && parsedData.message === 'Invalid or missing token') {
              updateTokens()
                .then(() => {
                  const newToken = getAccessToken();
                  if (newToken) {
                    const wssUrl = new URL(url);
                    wssUrl.searchParams.set('token', newToken.replace('Bearer ', ''));
                    dispatch(connect(wssUrl.toString()));
                  }
                  else {
                    dispatch(onError('Error with access token'));
                  }
                })
                .catch((err) => {
                  dispatch(onError((err as Error).message));
                });

              dispatch(disconnect());

              return;
            }
            dispatch(onMessage(parsedData));
          } catch (error) {
            dispatch(onError((error as Error).message));
          }
        }
      }

      if (socket && sendMessage?.match(action)) {
        try {
          const data = JSON.stringify(action.payload);
          socket.send(data);
        } catch (error) {
          dispatch(onError((error as Error).message));
        }
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close();
        socket = null;
      }

      next(action);
    }
  }
}