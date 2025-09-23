"use client";

import { useEffect } from "react";
import Header from "../subviews/header";
import ScanbotSDKService from "../services/scanbot-sdk-service";
import { useRouter } from "next/navigation";

export default function BarcodeScanner() {
  const router = useRouter();
    useEffect(() => {
        ScanbotSDKService.instance.createBarcodeScanner("barcode-scanner", async (barcode) => {
            router.push(`/open-foods/${barcode.text}`);
        });

        return () => {
            ScanbotSDKService.instance.disposeBarcodeScanner();
        };
    }, [])

    return (
        <div>
            <Header backPath={"/"} />
            <div id="barcode-scanner" style={{ width: "100%", height: "calc(100vh - 50px)" }} />
        </div>
    )
}