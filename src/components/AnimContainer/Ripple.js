import React, { useRef, useMemo, useCallback, Suspense} from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import circleImage from "../css/circle.png";
import { OrbitControls } from "@react-three/drei";


export default function Ripple() {

    const Points = () => {
        const imgLoader = useLoader(THREE.TextureLoader, circleImage);
        const bufferRef = useRef();
        var t = 0;
        var f = 0.002;
        var a = 3;

        // Do this on changes found in t,f,a
        const graph = useCallback((x,z)=> {
            return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
        },[t,f,a])

        const count = 100;
        const sep = 3;
        // Calculate all points x,y,z and append to array/map
        // Regular positions
        
        let positions = useMemo(() => {
            let positions = []
            for(var xi = 0; xi < count; xi++){
                for(var zi = 0; zi < count; zi++){
                    var x = sep * (xi - count / 2);
                    var z = sep * (zi - count / 2)
                    var y = graph(x,z);
                    positions.push(x,y,z);
                }
            }
            return new Float32Array(positions);
        }, [count, sep, graph])
        console.log(positions)

        useFrame(()=> {
            // updating points here.
            t += 15;
            const positions = bufferRef.current.array;
            let index = 0;
            for(var xi = 0; xi < count; xi++) {
                for(var zi = 0; zi < count; zi++){
                    var x = sep * ( xi - count / 2);
                    var z = sep * ( zi - count / 2);
                    // Graphing the y cordinate [x + 1] -> (x,y,z)
                    positions[index + 1] = graph(x,z);
                    index += 3;

                }
            }
            bufferRef.current.needsUpdate = true;
        })

        return(
            <>
                <points>
                    <bufferGeometry attach="geometry">
                        <bufferAttribute 
                            ref={bufferRef}
                            attachObject={['attributes', 'position']}
                            array={positions}
                            count={positions.length / 3}
                            itemSize={3}
                            />
                    </bufferGeometry>

                    <pointsMaterial
                        attach="material"
                        map={imgLoader}
                        color={0x00AAFF}
                        size={0.5}
                        sizeAttenuation
                        transparent={false}
                        alphaTest={0.5}
                        opacity={1.0}
                    />
                </points>
            </>
        )
    }

    const CameraView = () => {
        const controlsRef = useRef();
        const {
            camera,
            gl: { domElement }
        } = useThree();
        useFrame(() => controlsRef.current.update() )
        
        return (
            <>
                <OrbitControls 
                ref={controlsRef}
                args={[camera, domElement]}
                autoRotate
                autoRotateSpeed={-0.2}
                
                />
            </>
        )
    }



    return(
        <>
            <Canvas camera={{ position: [100,10,0], fov: 75 }}>
            <color args={['blue']} attach="background" />

            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={<div>Loading...</div>}>
                <Suspense fallback={null}>
                    <Points/>
                </Suspense>
            </Suspense>
                
                <CameraView />
            </Canvas>
        </>
    )
}