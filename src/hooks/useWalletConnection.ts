import { useState, useEffect } from "react";
import { useAccount, useDisconnect, useWallets } from "@particle-network/connectkit";

export function useWalletConnection() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const wallets = useWallets();
  const [signature, setSignature] = useState<string | null>(null);
  const [challengeMessage, setChallengeMessage] = useState<string | null>(null);
  const [walletLoading, setWalletLoading] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setSignature(null);
      setChallengeMessage(null);
    }
  }, [isConnected]);

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (err) {
      console.warn("Disconnect failed (maybe already disconnected)", err);
    }
  };

  return {
    address,
    isConnected,
    signature,
    challengeMessage,
    walletLoading,
    setSignature,
    setChallengeMessage,
    setWalletLoading,
    wallets,
    handleDisconnect,
  };
}