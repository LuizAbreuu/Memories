import axios from "../axios-config";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import './Home.css';

const Home = () => {

    const [memories, setMemories] = useState([]);

    useEffect(() => {
        const getMemories = async () => {
            const res = await axios.get("/memories");

            setMemories(res.data);
        };

        getMemories();

    }, []);

    const handleDelete = async (memoryId) => {
        try {
            const res = await axios.delete(`/memories/${memoryId}`);
            setMemories(memories.filter(memory => memory._id !== memoryId));
            toast.success(res.data.msg);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);
        }
    };


    return (
        <div className="home">
            <h2>Confira as Últimas Memórias</h2>
            <div className="memories-container">
                {memories.length > 0 && memories.map((memory) => (
                    <div className="memory" key={memory._id}>
                        <img src={`${axios.defaults.baseURL}${memory.src}`} alt={memory.title} />
                        <p>{memory.title}</p>
                        <Link className="btn" to={`/memories/${memory._id}`}>Comentar</Link>
                        <button className="btn2" onClick={() => handleDelete(memory._id)}>Excluir</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;