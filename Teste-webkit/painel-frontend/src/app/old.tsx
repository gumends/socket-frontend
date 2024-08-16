'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, Chip, Typography } from '@mui/joy';
import io from 'socket.io-client';
import * as uuid from 'uuid';
import { randomUUID } from 'crypto';
import Header from '@/components/Header';

const socket = io('http://smulatic037:3000');

export default function Home() {

  function sendMessage() {
    socket.emit('chamados');
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Header />
      <Button onClick={() => sendMessage()}>
        Teste
      </Button>
    </Box>
  );
}