import React, {useState, useEffect} from 'react';
import {Modal as BootstrapModal, Form, Button} from 'react-bootstrap';
import {ITask} from "../../UNIT/models/ITask";
import './Modal.css'
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: FormData) => void;
    data?: ITask | null
    onChange: (formData: FormData, _id: string) => void;
    setSelectedTask: (set: ITask | null) => void;
}

export interface FormData {
    id?: number;
    title: string;
    description: string;
    creationDate: string;
    deadline: string;
    category: string;
}

const categoryValues = [
    'Sport',
    'IT',
    'Housework',
    'Shopping',
    'Health',
    'Education',
    'Travel',
    'Entertainment',
    'Other',
];

const Modal: React.FC<ModalProps> = ({
                                         isOpen,
                                         onClose,
                                         onSubmit,
                                         data,
                                         onChange,
                                         setSelectedTask
                                     }) => {
    const [formData, setFormData] = useState<FormData>({
        title: data?.title || '',
        description: data?.description || '',
        creationDate: data?.creationDate || '',
        deadline: data?.deadline || '',
        category: data?.category || '',
    });

    useEffect(() => {
        if (isOpen && data) {
            setFormData({
                title: data.title,
                description: data.description,
                creationDate: data.creationDate,
                deadline: data.deadline,
                category: data.category,
            });
        }
    }, [isOpen, data]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const updatedFormData = {...formData, [name]: value};
        setFormData(updatedFormData);
    };

    const getCurrentDay = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedFormData = {...formData, creationDate: getCurrentDay()};
        data ? onChange(updatedFormData, data._id) : onSubmit(updatedFormData);
    };

    return (
        <BootstrapModal show={isOpen} onHide={onClose}>
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>{data ? "Edit Task" : "Add Task"}</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body className='h-100 d-flex align-items-center justify-content-center'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="deadline">
                        <Form.Label>Deadline:</Form.Label>
                        <Form.Control
                            type="date"
                            name="deadline"
                            value={formatDateToInput(formData.deadline)}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>Category:</Form.Label>
                        <Form.Control
                            as="select"
                            name="category"
                            value={formData.category ? formData.category : 'Not selected'}
                            onChange={handleInputChange}
                        >
                            {categoryValues.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Button className="m-2" variant="primary" type="submit">
                        {data ? "Save Changes" : "Add Task"}
                    </Button>
                </Form>
            </BootstrapModal.Body>
        </BootstrapModal>
    );
};

export default Modal;

function formatDateToInput(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
