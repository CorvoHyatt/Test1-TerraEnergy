import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Container,
    Typography,
    IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { userService } from '../services/api';
import { User } from '../types/user';
import { UserForm } from './UserForm';

export const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const loadUsers = async () => {
        try {
            const data = await userService.getUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setOpenForm(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Está seguro de eliminar este usuario?')) {
            try {
                await userService.deleteUser(id);
                await loadUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleFormClose = () => {
        setOpenForm(false);
        setSelectedUser(null);
    };

    const handleFormSubmit = async () => {
        await loadUsers();
        handleFormClose();
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
                Gestión de Usuarios
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenForm(true)}
                sx={{ mb: 2 }}
            >
                Nuevo Usuario
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(user)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UserForm
                open={openForm}
                user={selectedUser}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
            />
        </Container>
    );
};