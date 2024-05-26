import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { PublicKey, Connection, SystemProgram, Keypair } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { useWallet } from '../provider/WalletProvider';
import idl from './../idl.json';

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const { connected, connect, wallet } = useWallet();
  const [provider, setProvider] = useState(null);

  // Function to initialize the provider
  const getProvider = async () => {
    if (!connected) {
      console.log('No wallet connected');
      return null;
    }

    const network = 'https://api.devnet.solana.com';
    const connection = new Connection(network, 'processed');
    return new Provider(connection, window.solana, { preflightCommitment: 'processed' });
  };

  // Initialize provider when wallet is connected
  useEffect(() => {
    const initializeProvider = async () => {
      if (connected) {
        const provider = await getProvider();
        setProvider(provider);
      }
    };

    initializeProvider();
  }, [connected]);

  // Handle form submission
  const onFinish = async (values) => {
    const { name, bio, profilePicUrl } = values;

    if (!provider) {
      message.error('No provider available');
      return;
    }

    const programID = new PublicKey('9CozAbxyFy7igrRhmpmo6smmwBZ8CxHHtHLT5wrzDDy4');
    const program = new Program(idl, programID, provider);
    const userAccount = Keypair.generate();

    try {щ
      setLoading(true);

      await program.rpc.createUser(name, bio, profilePicUrl, {
        accounts: {
          user: userAccount.publicKey,
          userSigner: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [userAccount, provider.wallet.payer], // Ensure both signers are included
      });

      message.success('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
      message.error('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Error connecting wallet:', error);
      message.error('Failed to connect wallet');
    }
  };

  return (
    <div>
      <Form name="signup" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bio"
          label="Bio"
          rules={[{ required: true, message: 'Please input your bio!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="profilePicUrl"
          label="Profile Picture URL"
          rules={[{ required: true, message: 'Please input your profile picture URL!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          {connected ? (
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign Up
            </Button>
          ) : (
            <Button type="primary" onClick={handleConnectWallet}>
              Connect Wallet
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupPage;
