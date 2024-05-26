import React, {useState} from "react";
import {Button, Modal, Row, Col} from "react-bootstrap";
import {ITask} from "../../../UNIT/models/ITask";
import TaskService from "../../../UNIT/Services/TaskService";
import FilterTable from "../Filter/Filter";
import {FilterParams} from '../Filter/IFilterParams';
import {toast} from "react-toastify";

interface TasksPromps {
    handleBtn: (set: boolean) => void;
    tasks: ITask[];
    setTasks: (set: ITask[]) => void;
    openModal: () => void;
    selectedTask: ITask | null;
    setSelectedTask: (set: ITask) => void;
}

const Tasks: React.FC<TasksPromps> = ({handleBtn, tasks, setTasks, openModal, selectedTask, setSelectedTask}) => {
    const [filterParams, setFilterParams] = useState<FilterParams>();

    function handleFilterParams(Params: FilterParams) {
        setFilterParams(() => {
            return Params;
        });
    }

    function handleSortMethod(method: string) {
        let sortedTasks = [...tasks];
        switch (method) {
            case "createdAsc":
                sortedTasks.sort((a, b) => {
                    const dateA = new Date(a.creationDate);
                    const dateB = new Date(b.creationDate);
                    return dateA.getTime() - dateB.getTime();
                });

                break;
            case "createdDesc":
                sortedTasks.sort((a, b) => {
                    const dateA = new Date(a.creationDate);
                    const dateB = new Date(b.creationDate);
                    return dateB.getTime() - dateA.getTime();
                });

                break;
            case "deadlineAsc":
                sortedTasks.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
                break;
            case "deadlineDesc":
                sortedTasks.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
                break;
            default:
                break;
        }
        setTasks(sortedTasks);
    }

    const handleDeleteTask = async (taskId: string) => {
        try {
            await TaskService.deleteTask(taskId);
            let tasksDeleted = tasks.filter(task => task._id !== taskId);
            setTasks(tasksDeleted);
            toast.success("Task deleted successfully");
        } catch (e: any) {
            console.log(e);
            toast.error(e.response?.data?.message || "Something went wrong");
        }
    };

    const openTaskDetails = (task: ITask) => {
        setSelectedTask(task);
        handleBtn(false)
    };

    const emptyTask: ITask = {
        _id: "",
        title: "",
        description: "",
        creationDate: "",
        deadline: "",
        category: "",
        userId: ""
    };

    const closeTaskDetails = () => {
        setSelectedTask(emptyTask);
        handleBtn(true)
    };

    const filteredTasks = tasks.filter(task => {
        let include = true;
        if (filterParams) {
            if (filterParams.timeExpired && !isDeadlineExpired(task)) {
                include = false;
            }
            if (filterParams.timeNotExpired && isDeadlineExpired(task)) {
                include = false;
            }
            if (filterParams.category && task.category !== filterParams.category) {
                include = false;
            }
        }
        return include;
    });


    return (
        <>
            <FilterTable handleFilterParams={handleFilterParams} categoryValues={getExistingCategoryValues(tasks)}
                         handleSortMethod={handleSortMethod}/>
            <div
                className="tasks-container m-2">
                <Row xs={1} md={2} className="g-4">
                    {filteredTasks.map((task: ITask, index) => (
                        <Col key={index}
                             onClick={() => openTaskDetails(task)}>
                            <div
                                className={`border-2 rounded-2 text-center ${isDeadlineExpired(task) ? 'bg-secondary' : (getTimeLeft(task.deadline) === "1 Day" ? 'bg-warning' : 'bg-primary')}`}>
                                <div className="task-card col-6 mb-3">
                                    <h3>{task.title}</h3>
                                    <p>{task.description.slice(0, 50)}...</p>
                                    <button className='btn btn-danger' onClick={(e) => {
                                        handleDeleteTask(task._id);
                                    }}>Delete
                                    </button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

            </div>

            {selectedTask?._id && (
                <Modal show={true} onHide={closeTaskDetails}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedTask.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{selectedTask.description}</p>
                        <p><strong>Start:</strong> {FormatData(new Date(selectedTask.creationDate))}</p>
                        <p><strong>Deadline:</strong> {FormatData(new Date(selectedTask.deadline)).slice(0, -5)}</p>
                        <p><strong>Time left:</strong> {getTimeLeft(selectedTask.deadline)}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeTaskDetails}>Close</Button>
                        <Button variant="secondary" onClick={openModal}>Change</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

function getTimeLeft(deadline: string): string {
    const currentTime = new Date().getTime();
    const deadlineTime = new Date(deadline).getTime();
    const timeDiff = deadlineTime - currentTime;

    if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        return `${days} Day `;
    } else {
        return "Time is up!";
    }
}

function isDeadlineExpired(task: ITask): boolean {
    const currentTime = new Date().getTime();
    const deadlineTime = new Date(task.deadline).getTime();

    return currentTime > deadlineTime;
}

function FormatData(Date: Date) {
    const day = String(Date.getDate()).padStart(2, '0');
    const month = String(Date.getMonth() + 1).padStart(2, '0');
    const year = Date.getFullYear();
    const hour: number = Date.getHours()
    const minute: number = Date.getMinutes()

    return `${day}.${month}.${year}  ${hour}:${minute}`;
}

function getExistingCategoryValues(Tasks: ITask[]): string[] {
    let existingCategories: string[] = [];
    Tasks.forEach((Task) => {
        if (!existingCategories.includes(Task.category)) {
            existingCategories.push(Task.category);
        }
    })
    return existingCategories;
}

export default Tasks;