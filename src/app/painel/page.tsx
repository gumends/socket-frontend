'use client'
import { Box, Typography } from "@mui/joy";
import io from 'socket.io-client';
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';

import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

import Layout from '@/components/Layout';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { useEffect, useState } from "react";

const socket = io('http://smulatic037:3000');

interface Payload {
    data: number
}

export default function painel() {

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const [dados, seDados] = useState(0);

    useEffect(() => {
        socket.on('chamados', (message: any) => {
            seDados(message);
        });
    }, [dados]);

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            {drawerOpen && (
                <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
                    <Navigation />
                </Layout.SideDrawer>
            )}
            <Stack
                id="tab-bar"
                direction="row"
                justifyContent="space-around"
                spacing={1}
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                    zIndex: '999',
                    bottom: 0,
                    position: 'fixed',
                    width: '100dvw',
                    py: 2,
                    backgroundColor: 'background.body',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Button
                    variant="plain"
                    color="neutral"
                    component="a"
                    href="/joy-ui/getting-started/templates/email/"
                    size="sm"
                    startDecorator={<EmailRoundedIcon />}
                    sx={{ flexDirection: 'column', '--Button-gap': 0 }}
                >
                    Painel
                </Button>
                <Button
                    variant="plain"
                    color="neutral"
                    aria-pressed="true"
                    component="a"
                    href="/joy-ui/getting-started/templates/files/"
                    size="sm"
                    startDecorator={<FolderRoundedIcon />}
                    sx={{ flexDirection: 'column', '--Button-gap': 0 }}
                >
                    Chamados
                </Button>
            </Stack>
            <Layout.Root
                sx={{
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
                        md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
                    },
                    ...(drawerOpen && {
                        height: '100vh',
                        overflow: 'hidden',
                    }),
                }}
            >
                <Layout.Header>
                    <Header />
                </Layout.Header>
                <Layout.Main sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
                    <Card
                        sx={{ 
                            width: 600, 
                            height: 200, 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                        }}
                    >
                        <Typography>Chamados Abertos:</Typography>
                        <Typography level="h1">{dados}</Typography>
                    </Card>
                </Layout.Main>
            </Layout.Root>
        </CssVarsProvider>
    )
}