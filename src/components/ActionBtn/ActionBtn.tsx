"use client";

import React, { memo } from "react";
import { IonIcon } from "../utility/IonIcon";
import styles from "./ActionBtn.module.css";
import { ClassName, IconType } from "@/types";

interface ActionBtnProps extends IconType, ClassName {
    style: React.CSSProperties;
    target?: string;
}

export const ActionBtn = memo(({
    style, ionIconLink, ionIconName, className, target = "_self"
}: ActionBtnProps) => {

    return <a
        href={ionIconLink}
        className={`${styles.backTopBtn} ${className}`}
        style={style}
        target={target}
        aria-label="back to top"
        data-back-top-btn
    >

        <IonIcon
            name={ionIconName}
            aria-hidden="true"
        />

    </a>
});

ActionBtn.displayName = "ActionBtn";