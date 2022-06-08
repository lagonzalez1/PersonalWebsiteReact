import React, { Component, useState, useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { BiRocket } from "react-icons/bi";
import '../css/navbar.css'




export default function NavbarLogin() {

    return (
        <>
        <Navbar className="navbar fixed-bottom "bg="dark" variant="dark" collapseOnSelect>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav px-2" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="/" className='font-loader-hover'>Home</Nav.Link>
                        <Nav.Link href="/About" className='font-loader-hover'>About</Nav.Link>
                        <Nav.Link href="/Portfolio" className='font-loader-hover'>Portfolio</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
    
}