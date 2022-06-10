import React from "react";
import { MeshDistortMaterial, meshBasicMaterial, Text, OrbitControls } from "@react-three/drei";
import { Physics, usePlane, useBox, useSphere } from '@react-three/cannon'
import { Canvas, useFrame } from "@react-three/fiber"
// https://github.com/pmndrs/gltfjsx


/*
 *
 */



export default function Ball(props) {

    const Plane = () => {
        const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
        return (
            <>
            <mesh ref={ref} receiveShadow>
                <planeGeometry args={[1000, 1000]} />
                <shadowMaterial color="#171717" transparent opacity={0.4} />
            </mesh>
            </>
        )
    }


    const Box = (props) => {
        const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], rotation: [0.4, 0.2, 0.5], ...props }))
        return (
            <>
            <mesh receiveShadow castShadow ref={ref}>
                { /*<boxGeometry /> */}
                <boxGeometry/>
                <meshLambertMaterial color="green" />
            </mesh>
            </>
        )
    }

    const ProfileText = () => {
        const [ref] = useBox(() => ({mass: 1}))
        useFrame(({ camera }) => {
            ref.current.quaternion.copy(camera.quaternion)

        })

        return(<>
            <mesh ref={ref} receiveShadow castShadow >
            <Text size={10} lineHeight={10} >
                Portfolio
                <meshBasicMaterial/>
            </Text>
            <Text hAlign="right" position={[0, 6.5, 0]} children="THREE" />
            </mesh>
            

        </>);
    }

    return (
        <>
            <Canvas shadows dpr={[1, 2]} gl={{ alpha: false }} camera={{ position: [-1, 5, 5], fov: 75 }}>
                <color args={['blue']} attach="background" />
                {<OrbitControls />}
                <ambientLight />
                <directionalLight position={[10, 10, 10]} castShadow shadow-mapSize={[2048, 2048]} />
                <Physics>
                    <ProfileText />
                    <Plane position={[0, 0, 0]} />
                    <Box position={[0, 5, 0]} />
                    <Box position={[0, 10, 0]} />
                    <Box position={[0, 20, 0]} />
                </Physics>
            </Canvas>
        </>   
    )
}
