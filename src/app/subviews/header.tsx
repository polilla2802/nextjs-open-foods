"use client";

import { useEffect } from 'react';

export default function Header(props: any) {


    useEffect(() => { }, [props, props.backPath]);

    return (
        <div style={{
            width: "100%",
            backgroundColor: "#c8193c",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "200",
        }}>
            <div style={{ marginLeft: "-10px", fontWeight: 700 }}>Open</div>
            <div style={{ padding: "0 6px 0 6px", fontWeight: 300 }}> </div>
            <div style={{ fontWeight: 700 }}>Foods</div>
        </div>
    )
}