import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './HomeStyle.css';
import Modal from "../Modal/Modal";
import TaskService from "../../UNIT/Services/TaskService";
import Tasks from "./Tasks/Tasks";
import { toast } from "react-toastify";
import { ITask } from "../../UNIT/models/ITask";
import { Container } from "react-bootstrap";

const HomePage: React.FC = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [isOpenModal, setModalOpen] = useState(false);
    const [addTaskVisible, setAddTaskVisible] = useState(true);
    const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
    const { store } = useContext(Context);
    const navigate = useNavigate();

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleBtn = (state: boolean) => {
        setAddTaskVisible(state);
    };

    const userId = store.user.id;

    const submitForm = async (formData: any) => {
        try {
            const newTask = { ...formData, userId };
            await TaskService.addTask(newTask);
            setTasks((prevTasks) => [...prevTasks, newTask]);
            toast.success(`Task ${formData.title} was created`);
            closeModal();
        } catch (e: any) {
            console.log(e);
            toast.error(e.response?.data?.message || "Something went wrong");
        }
    };

    const onChange = async (formData: any) => {
        if (parseInt(formData.deadline.substring(0, 4)) > 2100) {
                console.log("Too big time");
                toast.warning("Too big time")
                return null
        }
        try {
            const updatedTask = { ...formData, userId };
            await TaskService.changeTask(updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === updatedTask._id ? updatedTask : task
                )
            );
            toast.success(`Task ${formData.title} was updated`);
            closeModal();
        } catch (e: any) {
            console.log(e);
            toast.error(e.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        if (!store.isAuth) {
            navigate('/auth');
        } else {
            const fetchTasks = async () => {
                try {
                    const response = await TaskService.getTasks(store.user.id);
                    setTasks(response.data);
                    navigate('/');
                } catch (e: any) {
                    console.log(e);
                    toast.error(e.response?.data?.message || "Something went wrong");
                }
            };
            fetchTasks();
        }
    }, [store.user.id, store.isAuth, userId, navigate]);

    if (!store.isAuth) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <Container>
                {addTaskVisible && <button className="AddTask" onClick={openModal}>+</button>}
                <Modal isOpen={isOpenModal} onSubmit={submitForm} onClose={closeModal} data={selectedTask}
                       onChange={onChange} setSelectedTask={setSelectedTask} />
                <Tasks tasks={tasks} setTasks={setTasks} handleBtn={handleBtn} openModal={openModal}
                       selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
            </Container>
            {/*<Footer />*/}
        </>
    );
};

export default observer(HomePage);
