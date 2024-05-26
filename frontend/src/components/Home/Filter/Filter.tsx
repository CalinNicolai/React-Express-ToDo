import React, {useEffect, useState} from 'react';
import {FilterParams} from './IFilterParams';
import {Form, Button, Container, Row, Col, FormLabel} from 'react-bootstrap';
import {ITask} from "../../../UNIT/models/ITask";

interface FilterPromps {
    handleFilterParams: (set: FilterParams) => void;
    categoryValues: string[];
    handleSortMethod:(set: string) => void
}

const FilterTable: React.FC<FilterPromps> = ({handleFilterParams, categoryValues,handleSortMethod}) => {
    const [sortMethod, setSortMethod] = useState<string>("default");
    const [timeExpired, setTimeExpired] = useState(false);
    const [timeNotExpired, setTimeNotExpired] = useState(false);
    const [category, setCategory] = useState('');

    const saveFilterParams = () => {
        let Params: FilterParams = {
            timeExpired: timeExpired,
            timeNotExpired: timeNotExpired,
            category: category,
        };
        handleFilterParams(Params);
    };
    useEffect(() => {
        saveFilterParams();
    }, [timeExpired, timeNotExpired, category]);
    useEffect(() => {
        handleSortMethod(sortMethod)
    }, [sortMethod]);
    return (
        <Container>
            <Row className='FilterBox'>
                <Col>
                    <Form.Group controlId='category'>
                        <Form.Label>Sort:</Form.Label>
                        <Form.Control
                            as='select'
                            value={sortMethod}
                            onChange={(e) => setSortMethod(e.target.value)}
                        >
                            <option value="default">Default</option>
                            <option value="createdAsc">Creation Date (Oldest First)</option>
                            <option value="createdDesc">Creation Date (Newest First)</option>
                            <option value="deadlineAsc">Deadline (Earliest First)</option>
                            <option value="deadlineDesc">Deadline (Latest First)</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='timeExpired'>
                        <Form.Label>Expired</Form.Label>
                        <Form.Check
                            type='checkbox'
                            checked={timeExpired}
                            onChange={(e) => {
                                setTimeExpired(e.target.checked);
                                setTimeNotExpired(false)
                            }}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='timeLeft'>
                        <Form.Label>Not Expired</Form.Label>
                        <Form.Check
                            type='checkbox'
                            checked={timeNotExpired}
                            onChange={(e) => {
                                setTimeNotExpired(e.target.checked);
                                setTimeExpired(false)
                            }}
                        />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId='category'>
                        <Form.Label>Categories:</Form.Label>
                        <Form.Control
                            as='select'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value=''>Все категории</option>
                            {categoryValues.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
};

export default FilterTable;
