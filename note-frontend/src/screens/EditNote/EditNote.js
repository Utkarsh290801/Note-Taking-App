import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Form } from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import "./EditNote.css";
import { toast } from 'react-toastify';
import './../../toastifyCustomStyles.css';

const EditNote = () => {

    const navigation = useNavigate();

    const params = useParams();
    
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Firstly get the original note
    const getNote = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/notes/getnote/${params.noteid}`);
            if (response.ok) {
                const data = await response.json();
                setTitle(data.title);
                setContent(data.content);
                setLoading(false);
            } else {
                const data = await response.json();
                setError(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError('An error occurred while fetching the note.');
        }
    } 
    
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            }

            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/notes/update/${params.noteid}`, config);
            if (response.ok) {
                setLoading(false);
                toast.success("Note Edited", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                navigation('/mynotes');
            } else {
                const data = await response.json();
                setError(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError('An error occurred while editing the note.');
        }
    }



    useEffect(() =>{
        getNote();
    },[params.noteid])

    return(
        <MainScreen title='Edit Note'>
            <div className='editContainer'>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loading></Loading>}
            <Form onSubmit={formSubmitHandler} className='formStyles'>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required 
                        type="text"
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}} />
                </Form.Group>

        

                <Form.Group className="mb-3" controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea" 
                        rows={7}
                        type="text"
                        value={content}
                        onChange={(e) => {setContent(e.target.value)}} />
                </Form.Group>

                <div className='btnSection'>
                    <button className='goBackButton' onClick={() => {navigation('/mynotes')}}>
                        Cancel
                    </button>
                    
                    <button type="submit" className='submitButton'>
                        Done
                    </button>
                </div>
            </Form>
            </div>
        </MainScreen>
    )
}

export default EditNote;