import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Option, Select, Textarea } from '@mui/joy';
import * as cadastroChamados from '@/services/chamados.services'
import { ICadastro } from '@/services/chamados.services'
import { useState } from "react";
import * as uuid from 'uuid';
import io from 'socket.io-client';

interface Props {
  busca: any;
}

const socket = io('http://smulatic037:3000');


export default function BasicModalDialog(props: Props) {

  function sendMessage() {
    socket.emit('chamados');
  }

  const [open, setOpen] = React.useState<boolean>(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [status, setStatus] = useState(0);
  const criar = (dados: ICadastro) => {
    cadastroChamados.cadastrarChamado(dados)
      .then((response) => {
        if (response) {
          sendMessage()
        }
      })
  }

  return (
    <React.Fragment
    >
      <IconButton
        variant="soft"
        color="primary"
        size='lg'
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 50,
          right: 50
        }}
      >
        <AddIcon />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Cadastrar Chamado</DialogTitle>
          <DialogContent>Preencha todos os campos continuar.</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              criar({
                titulo,
                descricao,
                prioridade,
                status
              })
              props.busca();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>titulo</FormLabel>
                <Input name='titulo' autoFocus required value={titulo} onChange={(v) => setTitulo(v.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Prioridade</FormLabel>
                <Select name='prioridade' value={prioridade} onChange={(_, v) => setPrioridade(v ? v : '')} required>
                  <Option value="Baixa">Baixa</Option>
                  <Option value="Media">Media</Option>
                  <Option value="Alta">Alta</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select name='status' value={status} onChange={(_, v) => setStatus(v ? v : 0)} required>
                  <Option value={0}>Ativo</Option>
                  <Option value={1}>Inativo</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Textarea minRows={5} maxRows={3} name='descricao' required value={descricao} onChange={(v) => setDescricao(v.target.value)} />
              </FormControl>
              <Button type="submit" onClick={() => props.busca}>Enviar</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}