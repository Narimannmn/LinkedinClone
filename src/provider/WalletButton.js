import React from 'react';
import { Button } from 'antd';
import { useWallet } from './WalletProvider';

const WalletButton = () => {
  const { walletAvail, connected, connect, disconnect } = useWallet();

  const handleConnect = () => {
    connect();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div>
      {walletAvail ? (
        <>
          {connected ? (
            <Button type="primary" onClick={handleDisconnect}>
              Disconnect from Phantom
            </Button>
          ) : (
            <Button type="primary" onClick={handleConnect}>
              Connect to Phantom
            </Button>
          )}
        </>
      ) : (
        <p>Oops!!! Phantom is not available. Go get it <a href="https://phantom.app/">here</a>.</p>
      )}
    </div>
  );
};

export default WalletButton;
