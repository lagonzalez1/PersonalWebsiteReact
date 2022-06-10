import React, { Suspense, useRef } from "react";
import { Stars, ContactShadows, Text, OrbitControls, RenderTexture, PerspectiveCamera, Text3D } from "@react-three/drei";
import { Physics, usePlane, useBox, useSphere } from '@react-three/cannon'
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshStandardMaterial } from "three";
import Mod from "../Models/Soccer_ball";
import World from "../Models/World";

// https://github.com/pmndrs/gltfjsx

export default function Header() {


    const Model = (props) => {
        const [ref] = useSphere(() => ({ mass: 0.5, ...props}) )
        return(
            <>
                <mesh ref={ref} receiveShadow castShadow>
                    
                    <ambientLight intensity={0.5}/>
                    <Mod/>
                    <ambientLight intensity={0.5}/>
                    
                    
                </mesh>
            </>
        )
    }



    const Cube = (props) => {
        const textRef = useRef()
        const [ref ] = useBox(() => ({mass: 1, rotation: [0.4, 0.2, 0.5], ...props}))
        useFrame((state) => (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2) )
        return (
            <>
            <mesh receiveShadow castShadow ref={ref}>
                <boxGeometry/>
                <meshStandardMaterial>
                <RenderTexture attach="map" anisotropy={16}>
                    <PerspectiveCamera makeDefault manual aspect={ 1 / 1 } position={[0,0,5]}/>
                    <color attach="background" args={['orange']}/>
                    <ambientLight intensity={0.5}/>
                    <directionalLight position={[10,10,5]}/>
                    <Text ref={textRef} fontSize={4} color="#171717">Portfolio</Text>
                </RenderTexture>    
                </meshStandardMaterial>
            </mesh>  
            </>
        )
    }

    const Plane = (props) => {
        const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
        return (
            <>
                <mesh ref={ref} receiveShadow>
                    <planeBufferGeometry args={[50, 50]} />
                    <shadowMaterial color="#171717" transparent opacity={0.4} />
                </mesh>
            </>
        )
    }

  

    const HeaderText = () => {
        return (
            <>
            <mesh position={[10,-1,0]} receiveShadow castShadow>
                <meshStandardMaterial attach="background" color="red"/>
                <Text fontSize={5}>
                    Portfolio
                </Text>
            </mesh>
            </>
        );
    } 

    return (
        <>
            <Canvas camera = {{ position: [0, 10, 5], pov: 45 }}>
                <color attach="background" args={['black']} />
                    <OrbitControls enableZoom={true} enableRotate={true} />
                    <ambientLight/>
                    <Stars/>
                    <directionalLight position={[10,10,10]} />
                    <World/>
            </Canvas>
        </>   
    )
}
