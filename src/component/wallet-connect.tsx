"use client";

import { ConnectButton, useAccount } from "@particle-network/connectkit";
import { useDisconnect } from "@particle-network/connectkit";

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    if (isConnected) disconnect();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 text-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-purple-700">Wallet Connect</h1>
          <p className="text-lg text-gray-600">Connect your wallet with Particle ConnectKit</p>
        </div>

        {!isConnected ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Get Started</h2>
              <p className="text-gray-600 mt-2">Connect your wallet</p>
            </div>
            <div className="flex justify-center">
              <ConnectButton
                customText={{ connect: "Connect Wallet" }}
                theme="auto"
                showBalance={false}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6 space-y-2">
              <div className="text-sm font-medium">Connected Address:</div>
              <div className="text-xs font-mono break-all text-purple-700">
                {address}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDisconnect}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}