import React, { HTMLProps } from "react";
import classnames from "classnames";


type TClasserElProps<TagType, Additional> = HTMLProps<TagType> & Additional; 

type TClasserResolver<TagType, Additional> = (
    TemplateStringsArray |
    string | 
    ((elProps: TClasserElProps<TagType, Additional>) => Parameters<typeof classnames>[0])
)

function makeClasser<TagType>(Tag: string) {

    return function classer<Additional>(resolver: TClasserResolver<TagType, Additional>) {

        return React.forwardRef<TagType, TClasserElProps<TagType, Additional>>((passedProps, ref) => {

            let resolvedClassname: string;

            if(typeof resolver === "function")
                resolvedClassname = classnames(resolver(passedProps));
            else if(typeof resolver === "string")
                resolvedClassname = resolver;
            else if(Array.isArray(resolver)) 
                resolvedClassname = classnames(...resolver);
            else 
                //this should ~~theoretically~~ never happen with proper typescript usage
                resolvedClassname = "";
            
            return (
                <Tag 
                    {...{
                        ...passedProps,
                        className: classnames(passedProps.className, resolvedClassname)
                    }} 
                    ref={ref}
                />
            )
        })
    }
}


const containerClassers = {
    div: makeClasser<HTMLDivElement>("div"),
    article: makeClasser<HTMLDivElement>("article"),
    section: makeClasser<HTMLDivElement>("section"),
    span: makeClasser<HTMLSpanElement>("span"),
    blockquote: makeClasser<HTMLQuoteElement>("blockquote"),
    summary: makeClasser<HTMLSpanElement>("summary"),
    pre: makeClasser<HTMLPreElement>("pre"),

    table: makeClasser<HTMLTableElement>("table"),
    tbody: makeClasser<HTMLTableSectionElement>("tbody"),
    td: makeClasser<HTMLTableDataCellElement>("td"),
    th: makeClasser<HTMLHeadElement>("th"),
    tfoot: makeClasser<HTMLTableSectionElement>("tfoot"),

}

const miscClassers = {
    image: makeClasser<HTMLImageElement>("image"),
    img: makeClasser<HTMLImageElement>("img"),
    video: makeClasser<HTMLVideoElement>("video"),    

    a: makeClasser<HTMLLinkElement>("a"),

    b: makeClasser<HTMLSpanElement>("b"),
    i: makeClasser<HTMLSpanElement>("i"),

    svg: makeClasser<SVGElement>("svg"),

    strong: makeClasser<HTMLSpanElement>("strong"),
    li: makeClasser<HTMLLIElement>("li"),
    ul: makeClasser<HTMLUListElement>("ul"),
    ol: makeClasser<HTMLOListElement>("ol"),
    em: makeClasser<HTMLSpanElement>("em"),
    
    form: makeClasser<HTMLFormElement>("form"),
    textarea: makeClasser<HTMLTextAreaElement>("textarea"),
    input: makeClasser<HTMLInputElement>("input"),
    button: makeClasser<HTMLButtonElement>("button"),

    progress: makeClasser<HTMLProgressElement>("progress"),
    noscript: makeClasser<HTMLElement>("noscript"),
};

const headingClassers = {
    h1: makeClasser<HTMLHeadingElement>("h1"),
    h2: makeClasser<HTMLHeadingElement>("h2"),
    h3: makeClasser<HTMLHeadingElement>("h3"),
    h4: makeClasser<HTMLHeadingElement>("h4"),
    h5: makeClasser<HTMLHeadingElement>("h5"),
}

const classed = {
    ...containerClassers,
    ...miscClassers,
    ...headingClassers,
}


export default classed;
