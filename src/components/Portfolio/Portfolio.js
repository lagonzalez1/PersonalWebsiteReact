import React, { useState, useEffect, Suspense } from "react";
import { Container, Button, Fade , Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import "../css/portfolio.css";
import Spinner from "../Loader/Loader.js";
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import Ball from "../AnimContainer/Ball"
import Header from "../Container/Header";
import Ripple from "../AnimContainer/Ripple";
import World from "../Models/World";
import { OrbitControls } from "@react-three/drei";
import { Physics, usePlane } from '@react-three/cannon'

export default function Portfolio() {


    const [loaded, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(false);


    const link = "https://api.github.com/users/lagonzalez1/repos";
    const [data, setData] = useState([]);

    useEffect(() => {

        const getData = async () => {
            const { data: response } = await axios.get(link);
            try {
                if(response) {
                    setLoading(false)
                    console.log(response);
                    setData(response);
                }
            } catch( error) {
                console.log(error)
            } 
        }  
        getData()

    }, [])


    const fetchData = () => {
        setLoadingData(true);
    }
    // JS and react might be casing problems.
    // npm install three @react-three/fiber
    // Will need ^ npm to run THREE and React together.
    // https://docs.pmnd.rs/react-three-fiber/getting-started/introduction#is-it-slower-than-plain-three.js?


    // GLB image can be used to animate




    return ( 
        <>

            <div className="container-fluid p-0">
                <Header/>
                
            </div>


            <div className="container-fluid padding main">

                <Row>
                    <Col>
                        
                    </Col>
                </Row>

            
                <Row>
                    <Col sm={2}>
                    <div className="container-fluid head">

                    <Fade timeout={500} in={!loaded}>
                        <div id="example-fade-text">
                        
                        <p className="font-loader">
                            Lists of project i have completed over the course of my computer science degree
                            at California State University Los Angles.
                        </p>
                        </div>
                    </Fade>
                </div>
                    
                    
                    </Col>

                        <Col sm={10}>
                        <div className="container-fluid padding">
                            <Table striped hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th style={{width: "5%"}}>#</th>
                                        <th style={{ width: "15%" }}>Name</th>
                                        <th style={{ width: "20%" }}>Full Name</th>
                                        <th>Url</th>
                                        <th style={{ width: "7%" }}>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loaded ? null : (data.map((item, index) => {
                                        var count = index + 1;
                                        return (
                                            <tr key={count}>
                                                <td> {count} </td>
                                                <td> {item.name} </td>
                                                <td> {item.full_name}</td>
                                                <td> {item.url}</td>
                                                <td><Button variant="primary" size="sm" onClick={fetchData} >View</Button></td>
                                            </tr>
                                            );

                                    }))}
                                </tbody>
                            </Table>
                        </div>                       
                        </Col>
                </Row>


                <Row>
                    <Col>
                        { loadingData ? <Spinner/> : <p className="font-loader"> Completed </p>}
                    </Col>

                    <Col>
                    </Col>

                </Row>


                <div className="container-fluid padding">
                    
                </div>
           
            </div>
        </>
    )
}



/*
    Diplay title: Basic information about project.
    1. Dropdown menu or anything facny can be a dropdown that will make an API call to show
    README.md
*/


/*
  Data variable: contains 'name'
  Use 'name' to load all README.md  
*/


/*
To get README.md:
    GET: https://api.github.com/repos/lagonzalez1/Sentiment/contents/README.md

    1. Need to convert response to JSON
    (Depending the response, might need to access the data using a react method)
    2. responce will contain 'content' in dic. 
    3. Get value in ccontent
    4. contents will be encoded base64 
    5. Decode and this will represent HTML code.
*/