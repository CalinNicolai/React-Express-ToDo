import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './HomeStyle.css';
import Modal from "../Modal/Modal";
import TaskService from "../../UNIT/Services/TaskService";
import Tasks from "./Tasks/Tasks";
import {toast} from "react-toastify";
import {ITask} from "../../UNIT/models/ITask";
import {Container} from "react-bootstrap";
import MusicPlayer from "./MusicPlayer/MusicPlayer";

const HomePage: React.FC = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [isOpenModal, setModalOpen] = useState(false);
    const [addTaskVisible, setAddTaskVisible] = useState(true);
    const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
    const [changeVisible, setChangeVisible] = useState(false);
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const openModal = (change: boolean) => {
        setModalOpen(true);
        change ? setChangeVisible(true) : setChangeVisible(false)
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedTask(null);
        setChangeVisible(false)
        handleBtn(true)
    };

    const handleBtn = (state: boolean) => {
        setAddTaskVisible(state);
    };

    const userId = store.user.id;

    const submitForm = async (formData: any) => {
        if (parseInt(formData.deadline.substring(0, formData.deadline.indexOf('-'))) > 2100) {
            console.log("Too big time");
            toast.warning("Too big time")
            return null
        }
        console.log()
        try {
            const newTask = {...formData, userId};
            const response = await TaskService.addTask(newTask);
            const createdTask = response.data;
            setTasks((prevTasks) => [...prevTasks, createdTask]);
            toast.success(`Task ${formData.title} was created`);
            closeModal();
        } catch (e: any) {
            console.log(e);
            toast.error(e.response?.data?.message || "Something went wrong");
        }
    };

    const onChange = async (formData: any, _id: string) => {
        if (parseInt(formData.deadline.substring(0, formData.deadline.indexOf('-'))) > 2100) {
            console.log("Too big time");
            toast.warning("Too big time")
            return null
        }
        const updatedTask = {...formData, userId, _id};
        try {
            const updatedTask = {...formData, userId, _id};
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
            <Navbar/>
            <Container>
                <MusicPlayer/>
                {addTaskVisible && <button className="AddTask" onClick={() => openModal(false)}>+</button>}
                {changeVisible ?
                    <Modal isOpen={isOpenModal} onSubmit={submitForm} onClose={closeModal}
                           onChange={onChange} data={selectedTask} setSelectedTask={setSelectedTask}/>
                    :
                    <Modal isOpen={isOpenModal} onSubmit={submitForm} onClose={closeModal}
                           onChange={onChange} setSelectedTask={setSelectedTask}/>
                }
                <Tasks tasks={tasks} setTasks={setTasks} handleBtn={handleBtn} openModal={openModal}
                       selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
            </Container>
            {/*<Footer />*/}
        </>
    );
};

export default observer(HomePage);
