import React, { useState } from 'react';
import '../css/homepage.css'
import Image from "../Images/center2.jpg";
import { Stack } from "react-bootstrap";
import { AiFillGithub } from 'react-icons/ai';
import { AiOutlineLinkedin } from 'react-icons/ai';

export default function Homepage() {

/*
List public repositories
in: https://docs.github.com/en/rest/repos/repos#list-public-repositories
*/
    return (
        <>
            <div className='container-image'>
                <img src={Image} className='w-100 d-block'/>
                <Stack gap={1} className="center-stack" >
                    <h3 className='font-loader'>My name is</h3>
                    <h1 className='font-loader'> Luis Gonzalez </h1>
                    <hr/>
                    <h3 className='font-loader'> Web Developer / IOS Developer  </h3>
                </Stack>
                <Stack gap={1} direction="horizontal" className="lower-stack">
                    <p className='text-loader'>Reach with me:</p>
                    <p className='text-loader'><a href='https://www.linkedin.com/in/luis-gonzalez-54a035220/'><AiOutlineLinkedin className='icon-e' size={26}/></a></p>
                    <p className='text-loader'> <a href='https://github.com/lagonzalez1?tab=repositories'> <AiFillGithub className='icon-e' size={26}/> </a> </p>
                </Stack>


            </div>
        </>
    )

}