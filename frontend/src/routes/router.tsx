// src/routes/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { CreateMedication } from '@/pages/CreateMedication';
import { EditMedication } from '@/pages/EditMedication';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'cadastrar', Component: CreateMedication },
      { path: 'editar/:id', Component: EditMedication },
    ],
  },
]);