import React, { HTMLProps } from "react";
import classnames from "classnames";


type TClasser<TagType> = (className: string) => (props: HTMLProps<TagType>) => any;


function makeClasser<TagType>(Tag: string): TClasser<TagType> {
    return (className: string) => (
        (props: HTMLProps<TagType>) => (
            <Tag 
                {...{
                    ...props,
                    className: classnames(props.className, className)
                }} 
            />
        )
    );
}


const containerClassers = {
    div: makeClasser<HTMLDivElement>("div"),
    article: makeClasser<HTMLDivElement>("article"),
    section: makeClasser<HTMLDivElement>("section"),
    span: makeClasser<HTMLSpanElement>("span"),
}

const miscClassers = {
    img: makeClasser<HTMLImageElement>("img"),
    em: makeClasser<HTMLSpanElement>("em")
};

const headingClassers = {
    h1: makeClasser<HTMLHeadingElement>("h1"),
    h2: makeClasser<HTMLHeadingElement>("h2"),
    h3: makeClasser<HTMLHeadingElement>("h3"),
    h4: makeClasser<HTMLHeadingElement>("h4"),
    h5: makeClasser<HTMLHeadingElement>("h5"),
}

const classer = {
    ...containerClassers,
    miscClassers,
    headingClassers,
}


export default classer;