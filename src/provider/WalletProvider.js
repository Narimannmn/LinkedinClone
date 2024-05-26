import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext(null);

export const useWallet = () => {
  return useContext(WalletContext);
};

const WalletProvider = ({ children }) => {
  const [walletAvail, setWalletAvail] = useState(false);
  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);
  const [pubKey, setPubKey] = useState(null);

  useEffect(() => {
    if ("solana" in window) {
      const solWindow = window;
      if (solWindow?.solana?.isPhantom) {
        setProvider(solWindow.solana);
        setWalletAvail(true);
        solWindow.solana.connect({ onlyIfTrusted: true });
      }
    }
  }, []);

  useEffect(() => {
    if (provider) {
      provider.on("connect", (publicKey) => {
        console.log(`connect event: ${publicKey}`);
        setConnected(true);
        setPubKey(publicKey);
      });
      provider.on("disconnect", () => {
        console.log("disconnect event");
        setConnected(false);
        setPubKey(null);
      });
    }
  }, [provider]);

  const connect = () => {
    provider?.connect().catch((err) => {
      console.error("connect ERROR:", err);
    });
  };

  const disconnect = () => {
    provider?.disconnect().catch((err) => {
      console.error("disconnect ERROR:", err);
    });
  };

  const signTransaction = async (transaction) => {
    if (!provider) throw new Error("Provider not connected");
    return await provider.signTransaction(transaction);
  };

  const signAllTransactions = async (transactions) => {
    if (!provider) throw new Error("Provider not connected");
    return await provider.signAllTransactions(transactions);
  };

  const value = {
    walletAvail,
    connected,
    pubKey,
    connect,
    disconnect,
    signTransaction,
    signAllTransactions
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
