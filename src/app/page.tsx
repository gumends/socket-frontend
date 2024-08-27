'use client';
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Layout from '@/components/Layout';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import ModalForm from '@/components/ModalForm'
import { useState, useEffect } from "react";
import * as cadastroChamados from '@/services/chamados.services'
import { ICadastro } from '@/services/chamados.services'
import { Chip } from '@mui/joy';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function FilesExample() {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [chamados, setChamados] = useState<ICadastro[]>([]);
    const busca = () => {
        cadastroChamados.BuscarChamados().
            then((response) => {
                setChamados(response)
            })
    }
    useEffect(() => {
        busca()
    }, []);

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
                <Layout.Main sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', width: '100vw' }}>
                    <Sheet variant="soft" sx={{ pt: 1, borderRadius: 'sm', maxWidth: 1300 }}>
                        <Table
                            stripe="odd"
                            hoverRow
                            sx={{ captionSide: 'top', '& tbody': { bgcolor: 'background.surface' } }}
                        >
                            <caption>Nutrition of your favorite menus.</caption>
                            <thead>
                                <tr>
                                    <th style={{ width: '40%' }}>Titulo</th>
                                    <th>Descrição</th>
                                    <th>Prioridade</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chamados.map((chamados) => (
                                    <tr key={chamados.status}>
                                        <td>{chamados.titulo}</td>
                                        <td>{chamados.descricao}</td>
                                        <td>
                                            <Chip
                                                color='success'
                                                variant='soft'
                                            >
                                                {chamados.prioridade}
                                            </Chip>
                                        </td>
                                        <td>{
                                        chamados.status === 0 ? 'Aberto' : 'Fechado'
                                        }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Sheet>
                    <ModalForm
                        busca={busca}
                    />
                </Layout.Main>
            </Layout.Root>
        </CssVarsProvider>
    );
}